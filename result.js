document.addEventListener('DOMContentLoaded', () => {
    const studentInfo = JSON.parse(localStorage.getItem('studentInfo'));
    const subjects = JSON.parse(localStorage.getItem('subjects'));

    document.querySelector('.student-name-info').innerText = `Student Name: ${studentInfo.studentName}`;
    document.querySelector('.father-name-info').innerText = `Father Name: ${studentInfo.fatherName}`;
    document.querySelector('.rollno-info').innerText = `Roll No : ${studentInfo.rollno}`;
    document.querySelector('.class-name-info').innerText = `Class Name: ${studentInfo.className}`;

    const tableBody = document.querySelector('#result-table-body');
    let totalMarks = 0;
    let obtainedMarks = 0;

    subjects.forEach(subject => {
        const percent = (subject.obtained / subject.total) * 100;
        const grade = getGrade(percent);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${subject.name}</td>
            <td>${subject.total}</td>
            <td>${subject.obtained}</td>
            <td>${grade}</td>
        `;
        tableBody.appendChild(row);

        totalMarks += subject.total;
        obtainedMarks += subject.obtained;
    });


    document.querySelector('.total-marks-info').innerText = `Total: ${obtainedMarks} / ${totalMarks}`;
    document.querySelector('.grade-info').innerText = `Grade: ${getGrade((obtainedMarks / totalMarks) * 100)}`;
});

function getGrade(percentage) {
    if (percentage >= 90) return 'A+';
    else if (percentage >= 80) {
        return 'A';
    }
    else if (percentage >= 70) {
        return 'B';
    }
    else if (percentage >= 60) {
        return 'C';
    }
    else if (percentage >= 50) {
        return 'D';
    }
    else {
        return 'F';
    }

}
document.getElementById('go-back-btn').addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'index.html';
});
