const studentNameInput = document.getElementById('studentname');
const fatherNameInput = document.getElementById('fathername');
const classNameInput = document.getElementById('classname');
const rollnoInput = document.getElementById('rollno');

function generateSubjectInputs() {



    const subjectCount = parseInt(document.getElementById('subject-count').value);
    const subjectInputsContainer = document.getElementById('subject-inputs');
    subjectInputsContainer.innerHTML = '';
    if (subjectCount <= 10) {
        for (let i = 1; i <= subjectCount; i++) {
            const div = document.createElement('div');
            div.classList.add('col-md-6');
            div.innerHTML = `
            <label>Subject ${i} Name:</label>
            <input type="text" class="form-control subject-name" placeholder="Enter subject name">
            
            <label>Total Marks for Subject ${i}:</label>
            <input type="text" pattern="\\d+" class="form-control subject-total" placeholder="Enter total marks">
            <label>Obtained Marks for Subject ${i}:</label>
            <input type="text" pattern="\\d+" class="form-control subject-obtained" placeholder="Enter obtained marks">
        `;
            subjectInputsContainer.appendChild(div);
        }

    }



}

function checkResult() {
    const studentName = studentNameInput.value.trim();
    const fatherName = fatherNameInput.value.trim();
    const className = classNameInput.value.trim();grade-info
    const rollno = rollnoInput.value.trim();


    let isValid = true;

    if (!studentName) {
        document.querySelector('.studentname-invalid-input').innerText = 'Please provide student name';
        document.querySelector('.studentname-invalid-input').style.display = 'block';
        isValid = false;
    }
    if (!fatherName) {
        document.querySelector('.fathername-invalid-input').innerText = 'Please provide father name';
        document.querySelector('.fathername-invalid-input').style.display = 'block';
        isValid = false;
    }
    if (!className) {
        document.querySelector('.classname-invalid-input').innerText = 'Please provide class name';
        document.querySelector('.classname-invalid-input').style.display = 'block';
        isValid = false;
    }
    if (!rollno || rollno.length < 6) {
        document.querySelector('.rollno-invalid-input').innerText = 'Please provide valid roll number (6 digits)';
        document.querySelector('.rollno-invalid-input').style.display = 'block';
        isValid = false;
    }


    const subjectNames = document.querySelectorAll('.subject-name');
    const subjectTotalInputs = document.querySelectorAll('.subject-total');
    const subjectObtainedInputs = document.querySelectorAll('.subject-obtained');


    let totalMarks = 0;
    let obtainedMarks = 0;

    for (let i = 0; i < subjectNames.length; i++) {
        const subject = subjectNames[i].value.trim();
        const total = parseFloat(subjectTotalInputs[i].value);
        const obtained = parseFloat(subjectObtainedInputs[i].value);


        if (!subject || /\d/.test(subject || subject.length > 10)) {
            subjectNames[i].style.border = '1px solid red';
            subjectNames[i].placeholder = 'Only characters allowed';

            isValid = false;
        } else {
            subjectNames[i].style.border = '';
        }

        if (isNaN(total) || total <= 0 || isNaN(obtained) || obtained < 0 || obtained > total) {
            subjectTotalInputs[i].style.border = '1px solid red';
            subjectObtainedInputs[i].style.border = '1px solid red';
            isValid = false;
        } else {
            subjectTotalInputs[i].style.border = '';
            subjectObtainedInputs[i].style.border = '';
            totalMarks += total;
            obtainedMarks += obtained;
        }
    }

    if (isValid && subjectNames.length > 0) {
        const percentage = (obtainedMarks / totalMarks) * 100;
        const grade = getGrade(percentage);

        document.querySelector('.student-name-info').innerText = `Student Name: ${studentName}`;
        document.querySelector('.father-name-info').innerText = `Father Name: ${fatherName}`;
        document.querySelector('.class-name-info').innerText = `Class Name: ${className}`;
        document.querySelector('.rollno-info').innerText = `Roll No: ${rollno}`;
        document.querySelector('.grade-info').innerText = `Grade: ${grade}`;
        document.querySelector('.total-marks-info').innerText = `Total Marks: ${obtainedMarks} out of ${totalMarks}`;




        const tableBody = document.getElementById('subject-table-body');
        tableBody.innerHTML = '';

        for (let i = 0; i < subjectNames.length; i++) {
            const subject = subjectNames[i].value.trim();
            const total = parseFloat(subjectTotalInputs[i].value);
            const obtained = parseFloat(subjectObtainedInputs[i].value);
            const grade = getGrade((obtained / total) * 100);

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${subject}</td>
                <td>${total}</td>
                <td>${obtained}</td>
                <td>${grade}</td>
            `;
            tableBody.appendChild(row);
        }
    }
}

function getGrade(avg) {
    switch (true) {
        case avg >= 90: {
            return 'A+';
        }
        case avg >= 80: {
            return 'A';
        }
        case avg >= 70: {
            return 'B';
        }
        case avg >= 60: {
            return 'C';
        }
        case avg >= 50: {
            return 'D';
        }
        default: {
            return 'F';
        }
    }
}


studentNameInput.addEventListener('input', () => {
    document.querySelector('.studentname-invalid-input').style.display = 'none';
});
fatherNameInput.addEventListener('input', () => {
    document.querySelector('.fathername-invalid-input').style.display = 'none';
});
classNameInput.addEventListener('input', () => {
    document.querySelector('.classname-invalid-input').style.display = 'none';
});
rollnoInput.addEventListener('input', () => {
    document.querySelector('.rollno-invalid-input').style.display = 'none';
});

