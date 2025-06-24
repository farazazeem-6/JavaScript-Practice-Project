const studentNameInput = document.getElementById('studentname');
const fatherNameInput = document.getElementById('fathername');
const classNameInput = document.getElementById('classname');
const rollnoInput = document.getElementById('rollno');

function CheckValidationsOfInputs() {
    const studentName = studentNameInput.value.trim();
    const fatherName = fatherNameInput.value.trim();
    const className = classNameInput.value.trim();
    const rollno = rollnoInput.value.trim();

    let isValid = true;

    document.querySelector('.studentname-invalid-input').innerText = '';
    document.querySelector('.fathername-invalid-input').innerText = '';
    document.querySelector('.classname-invalid-input').innerText = '';
    document.querySelector('.rollno-invalid-input').innerText = '';

    const nameRegex = /^[A-Za-z\s]+$/;
    const numberRegex = /^\d+$/;
    const alphaNumericOnly = /^[A-Za-z0-9]+$/;


    if (!studentName) {
        document.querySelector('.studentname-invalid-input').innerText = 'Please provide student name';
        isValid = false;
    } else if (!nameRegex.test(studentName)) {
        document.querySelector('.studentname-invalid-input').innerText = 'Name must only contain letters (A-Z)';
        isValid = false;
    }
    else if (studentName.length > 20) {
        document.querySelector('.studentname-invalid-input').innerText = 'Too much long name';
        isValid = false;
    }

    if (!fatherName) {
        document.querySelector('.fathername-invalid-input').innerText = 'Please provide father name';
        isValid = false;
    } else if (!nameRegex.test(fatherName)) {
        document.querySelector('.fathername-invalid-input').innerText = 'Father name must only contain letters (A-Z)';
        isValid = false;
    }
    else if (fatherName.length > 20) {
        document.querySelector('.fathername-invalid-input').innerText = 'Too much long name';
        isValid = false;
    }

    if (!className) {
        document.querySelector('.classname-invalid-input').innerText = 'Please provide class name';
        isValid = false;
    }
    else if (!alphaNumericOnly.test(className)) {
        document.querySelector('.classname-invalid-input').innerText = 'Please provide valid class name';
        isValid = false;
    }
    else if (className.length > 20) {
        document.querySelector('.classname-invalid-input').innerText = 'Too long class name';
        isValid = false;
    }

    if (!rollno) {
        document.querySelector('.rollno-invalid-input').innerText = 'Please provide roll number';
        isValid = false;
    } else if (!numberRegex.test(rollno)) {
        document.querySelector('.rollno-invalid-input').innerText = 'Roll number must only contain digits';
        isValid = false;
    } else if (rollno.length !== 6) {
        document.querySelector('.rollno-invalid-input').innerText = 'Roll number must be exactly 6 digits';
        isValid = false;
    }

    if (isValid) {
        const studentInfo = {
            studentName,
            fatherName,
            className,
            rollno
        };
        localStorage.setItem('studentInfo', JSON.stringify(studentInfo));
        window.location.href = "subject.html";
    }
}


studentNameInput.addEventListener('input', () => {
    document.querySelector('.studentname-invalid-input').innerText = '';
});

fatherNameInput.addEventListener('input', () => {
    document.querySelector('.fathername-invalid-input').innerText = '';
});

classNameInput.addEventListener('input', () => {
    document.querySelector('.classname-invalid-input').innerText = '';
});

rollnoInput.addEventListener('input', () => {
    document.querySelector('.rollno-invalid-input').innerText = '';
});