let totalSubjects = 0;
let currentSubjectIndex = 0;
let subjects = [];

function generateSubjectInputs() {
    const subjectCount = parseInt(document.getElementById('subject-count').value);
    const subjectInputsContainer = document.getElementById('subject-inputs');
    const checkResultBtn = document.getElementById('check-result-btn');

    const nameRegex = /^[A-Za-z\s]+$/;
    const numberRegex = /^\d+$/;

    document.querySelector('.subject-invalid-count').style.display = 'none';
    subjectInputsContainer.innerHTML = '';
    checkResultBtn.style.display = 'none';

    if (!subjectCount || subjectCount <= 0) {
        document.querySelector('.subject-invalid-count').innerText = 'Please enter a valid number of subjects.';
        document.querySelector('.subject-invalid-count').style.display = 'block';
        return;
    }

    if (subjectCount > 10) {
        document.querySelector('.subject-invalid-count').innerText = 'Maximum allowed subjects is 10.';
        document.querySelector('.subject-invalid-count').style.display = 'block';
        return;
    }

 

    totalSubjects = subjectCount;
    currentSubjectIndex = 0;
    subjects = [];

    showSubjectForm(currentSubjectIndex);

    // Disable subject input and button 


    document.getElementById('subject-count-section').style.display = 'none';
    document.getElementById('generate-subjects-btn').style.display = 'none';
}

function showSubjectForm(index) {
    const subjectInputsContainer = document.getElementById('subject-inputs');
    subjectInputsContainer.innerHTML = '';

    const div = document.createElement('div');
    div.classList.add('col-md-6');
    div.innerHTML = `
        <label>Subject ${index + 1} Name:</label>
        <input type="text" class="form-control" id="subject-name" placeholder="Enter subject name">
        <div class="text-danger small" id="name-error"></div>

        <label>Total Marks:</label>
        <input type="text" class="form-control" id="subject-total" placeholder="Enter total marks">
        <div class="text-danger small" id="total-error"></div>

        <label>Obtained Marks:</label>
        <input type="text" class="form-control" id="subject-obtained" placeholder="Enter obtained marks">
        <div class="text-danger small" id="obtained-error"></div>

        <button class="btn btn-primary mt-3" onclick="submitCurrentSubject()">Submit Subject ${index + 1}</button>
    `;

    subjectInputsContainer.appendChild(div);

    setTimeout(() => {
        document.getElementById('subject-name').addEventListener('input', () => {
            document.getElementById('name-error').innerText = '';
        });

        document.getElementById('subject-total').addEventListener('input', () => {
            document.getElementById('total-error').innerText = '';
        });

        document.getElementById('subject-obtained').addEventListener('input', () => {
            document.getElementById('obtained-error').innerText = '';
        });

    }, 0);
}

function submitCurrentSubject() {
    const nameInput = document.getElementById('subject-name');
    const totalInput = document.getElementById('subject-total');
    const obtainedInput = document.getElementById('subject-obtained');

    const name = nameInput.value.trim();
    const totalRaw = totalInput.value.trim();
    const obtainedRaw = obtainedInput.value.trim();

    const nameRegex = /^[A-Za-z\s]+$/;
    const numberRegex = /^\d+$/;

    let isValid = true;


    document.getElementById('name-error').innerText = '';
    document.getElementById('total-error').innerText = '';
    document.getElementById('obtained-error').innerText = '';


    if (!name) {
        document.getElementById('name-error').innerText = 'Subject name is required';
        isValid = false;
    } else if (!nameRegex.test(name)) {
        document.getElementById('name-error').innerText = 'Name must only contain alphabets';
        isValid = false;
    } else if (name.length < 3 || name.length > 15) {
        document.getElementById('name-error').innerText = 'Too long or too short name';
        isValid = false;
    }



    if (!totalRaw) {
        document.getElementById('total-error').innerText = 'Total marks are required';
        isValid = false;
    } else if (!numberRegex.test(totalRaw)) {
        document.getElementById('total-error').innerText = 'Only digits allowed for total marks';
        isValid = false;
    }



    if (!obtainedRaw) {
        document.getElementById('obtained-error').innerText = 'Obtained marks are required';
        isValid = false;
    } else if (!numberRegex.test(obtainedRaw)) {
        document.getElementById('obtained-error').innerText = 'Only digits allowed for obtained marks';
        isValid = false;
    }


    const total = parseInt(totalRaw);
    const obtained = parseInt(obtainedRaw);

    if (isValid && obtained > total) {
        document.getElementById('obtained-error').innerText = 'Obtained marks cannot be greater than total marks';
        isValid = false;
    }

    if (!isValid) return;


    subjects.push({ name, total, obtained });


    currentSubjectIndex++;
    if (currentSubjectIndex < totalSubjects) {
        showSubjectForm(currentSubjectIndex);
    } else {
        document.getElementById('subject-inputs').innerHTML = `<div class="alert alert-success">All subjects entered.</div>`;
        document.getElementById('check-result-btn').style.display = 'inline-block';
    }
}

function checkResult() {
    // Save subjects to localStorage
    localStorage.setItem('subjects', JSON.stringify(subjects));

    // Navigate to result page
    window.location.href = 'result.html';
}



    const subjectCountInput = document.getElementById('subject-count');
    const errorBox = document.querySelector('.subject-invalid-count');

    if (subjectCountInput) {
        subjectCountInput.addEventListener('input', () => {
            errorBox.innerText = '';
            errorBox.style.display = 'none';
        });
    }

