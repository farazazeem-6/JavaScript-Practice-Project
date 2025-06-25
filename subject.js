let totalSubjects = 0;
let currentSubjectIndex = 0;
let subjects = [];

function generateSubjectInputs() {
    const subjectCountValue = document.getElementById('subject-count').value;
    const subjectInputsContainer = document.getElementById('subject-inputs');
    const checkResultBtn = document.getElementById('check-result-btn');
    const errorBox = document.querySelector('.subject-invalid-count');

    errorBox.style.display = 'none';
    subjectInputsContainer.innerHTML = '';
    checkResultBtn.style.display = 'none';

    const subjectCount = Number(subjectCountValue);

    if (isNaN(subjectCount) || subjectCount <= 0) {
        errorBox.innerText = 'Please enter a valid number of subjects.';
        errorBox.style.display = 'block';
        return;
    }

    if (subjectCount > 10) {
        errorBox.innerText = 'Maximum allowed subjects is 10.';
        errorBox.style.display = 'block';
        return;
    }

    totalSubjects = subjectCount;
    currentSubjectIndex = 0;
    subjects = new Array(totalSubjects).fill({ name: '', total: '', obtained: '' });

    showSubjectForm(currentSubjectIndex);

    document.getElementById('subject-count-section').style.display = 'none';
    document.getElementById('generate-subjects-btn').style.display = 'none';
}

function showSubjectForm(index) {
    const subjectInputsContainer = document.getElementById('subject-inputs');
    subjectInputsContainer.innerHTML = '';

    const data = subjects[index] || { name: '', total: '', obtained: '' };
    const isLast = index === totalSubjects - 1;

    const div = document.createElement('div');
    div.classList.add('col-md-6');
    div.innerHTML = `
        <label>Subject ${index + 1} Name:</label>
        <input type="text" class="form-control" id="subject-name" placeholder="Enter subject name" value="${data.name}">
        <div class="text-danger small" id="name-error"></div>

        <label>Total Marks:</label>
        <input type="text" class="form-control" id="subject-total" placeholder="Enter total marks" value="${data.total}">
        <div class="text-danger small" id="total-error"></div>

        <label>Obtained Marks:</label>
        <input type="text" class="form-control" id="subject-obtained" placeholder="Enter obtained marks" value="${data.obtained}">
        <div class="text-danger small" id="obtained-error"></div>

        <div class="d-flex gap-2 mt-3">
            ${index > 0
            ? `<button class="btn btn-success" onclick="goBackSubject()">Back</button>`
            : ''}
          <button class="btn ${isLast ? 'btn-success' : 'btn-primary'}" onclick="${isLast ? 'submitAndShowResult()' : 'submitCurrentSubject()'}">
    ${isLast ? 'Show Result' : `Submit Subject ${index + 1}`}
</button>

        </div>
    `;

    subjectInputsContainer.appendChild(div);

    // Remove back button

    const staticBackBtn = document.getElementById('back-btn');
    if (staticBackBtn) staticBackBtn.style.display = 'none';

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
function validateAndCollectInput() {
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
    } else {
        // Check for duplicate subject names (case-insensitive)
        const nameLower = name.toLowerCase();
        for (let i = 0; i < subjects.length; i++) {
            if (i !== currentSubjectIndex && subjects[i].name && subjects[i].name.toLowerCase() === nameLower) {
                document.getElementById('name-error').innerText = 'Subject name already entered. Choose another name.';
                isValid = false;
                break;
            }
        }
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

    const total = Number(totalRaw);
    const obtained = Number(obtainedRaw);

    if (isValid && obtained > total) {
        document.getElementById('obtained-error').innerText = 'Obtained marks cannot be greater than total marks';
        isValid = false;
    }

    if (!isValid) return null;
    else {
        return { name, total, obtained };
    }


}


function submitCurrentSubject() {
    const subjectData = validateAndCollectInput();
    if (!subjectData) return;

    subjects[currentSubjectIndex] = subjectData;
    currentSubjectIndex++;

    if (currentSubjectIndex < totalSubjects) {
        showSubjectForm(currentSubjectIndex);
    } else {
        document.getElementById('subject-inputs').innerHTML = '';
        document.getElementById('check-result-btn').style.display = 'inline-block';
    }
}

function submitAndShowResult() {
    const subjectData = validateAndCollectInput();
    if (!subjectData) return;

    subjects[currentSubjectIndex] = subjectData;

    localStorage.setItem('subjects', JSON.stringify(subjects));
    window.location.href = 'result.html';
}

function goBackSubject() {
    if (currentSubjectIndex > 0) {
        currentSubjectIndex--;
        showSubjectForm(currentSubjectIndex);
    }
}

function checkResult() {
    localStorage.setItem('subjects', JSON.stringify(subjects));
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
