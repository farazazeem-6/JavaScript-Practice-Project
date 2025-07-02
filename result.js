document.addEventListener('DOMContentLoaded', () => {
    const studentInfo = JSON.parse(localStorage.getItem('studentInfo'));
    const subjects = JSON.parse(localStorage.getItem('subjects'));


    document.querySelector('.student-name-info').innerHTML = `NAME: <span style=" margin-left: 5px; " >${studentInfo.studentName} </span>`;
    document.querySelector('.father-name-info').innerHTML = `FATHER'S NAME: <span style=" margin-left: 5px;" >${studentInfo.fatherName} </span>`;
    document.querySelector('.rollno-info').innerHTML = `Roll no: <span style=" margin-left: 5px;" >${studentInfo.rollno} </span>`;
    document.querySelector('.class-name-info').innerHTML = `CLASS NAME: <span style=" margin-left: 5px;" >${studentInfo.className} </span>`;

    const tableBody = document.querySelector('#result-table-body');
    let totalMarks = 0;
    let obtainedMarks = 0;

    subjects.forEach(subject => {
        const percent = (subject.obtained / subject.total) * 100;
        const grade = getGrade(percent);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td  style="width: 400px; text-align: start; border:1px solid black;">${subject.name}</td>
            <td style="border:1px solid black;">${subject.total}</td>
            <td style="border:1px solid black;">${subject.obtained}</td>
            <td style="border:1px solid black;">${grade}</td>
        `;
        tableBody.appendChild(row);

        totalMarks += subject.total;
        obtainedMarks += subject.obtained;
    });


    let percentageformula = (obtainedMarks / totalMarks) * 100;
    document.querySelector('.total-marks-info').innerHTML = `TOTAL MARKS: <span style=" margin-left: 5px;" >${obtainedMarks} / ${totalMarks} </span>`;
    document.querySelector('.grade-info').innerHTML = `GRADE: <span style=" margin-left: 5px;" >${getGrade((obtainedMarks / totalMarks) * 100)} </span>`;
    document.querySelector('.percentage-info').innerHTML = `PERCENTAGE: <span style=" margin-left: 5px; "> ${((obtainedMarks / totalMarks) * 100).toFixed(2)}% </span>`
    document.querySelector('.status-info span').innerHTML = ` ${statusofresult(percentageformula)}`
    document.querySelector('.numberinword span').innerHTML=`${numberToWords(obtainedMarks)}`



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
function statusofresult(percentage) {
    if (percentage > 40) {
        return 'Pass'
    }
    else {
        return 'Fail'
    }

}

function numberToWords(num) {
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  if (num === 0) return "Zero";

  let word = "";

  if (Math.floor(num / 1000) > 0) {
    word += ones[Math.floor(num / 1000)] + " Thousand ";
    num %= 1000;
  }

  if (Math.floor(num / 100) > 0) {
    word += ones[Math.floor(num / 100)] + " Hundred ";
    num %= 100;
  }

  if (num > 0) {
    if (word !== "") word += "And ";

    if (num < 10) word += ones[num];
    else if (num < 20) word += teens[num - 10];
    else {
      word += tens[Math.floor(num / 10)];
      if (num % 10 > 0) word += "-" + ones[num % 10];
    }
  }

  return word.trim();
}


document.getElementById('go-back-btn').addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'index.html';
});
