
const students = [];


const form = document.getElementById('registrationForm');

const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const studentIdInput = document.getElementById('studentId');
const emailInput = document.getElementById('email');
const creditCompletedInput = document.getElementById('creditCompleted');
const departmentInput = document.getElementById('department');

const studentListBody = document.getElementById('studentListBody');
const noStudentsMsg = document.getElementById('noStudents');


function setError(fieldId, message) {
  const errorEl = document.getElementById(fieldId + 'Error');
  errorEl.textContent = message;
}

function clearAllErrors() {
  ['firstName', 'lastName', 'studentId', 'email', 'creditCompleted', 'department']
    .forEach(id => setError(id, ''));
}

// Validation logic checking
function validateForm() {
  let isValid = true;
  clearAllErrors();

  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const studentId = studentIdInput.value.trim();
  const email = emailInput.value.trim();
  const creditCompleted = creditCompletedInput.value.trim();
  const department = departmentInput.value;

  // First name required
  if (firstName === '') {
    setError('firstName', 'First name cannot be empty.');
    isValid = false;
  }

  // Last name required
  if (lastName === '') {
    setError('lastName', 'Last name cannot be empty.');
    isValid = false;
  }

  // Student ID  "-"
  if (studentId === '') {
    setError('studentId', 'Student ID cannot be empty.');
    isValid = false;
  } else if (!studentId.includes('-')) {
    setError('studentId', 'Student ID must contain a "-".');
    isValid = false;
  }

  // Email must contain(.....@student.aiub.edu)
  if (email === '') 
  {
    setError('email', 'Email cannot be empty.');
    isValid = false;
  } 
  else if (!email.includes('@student.aiub.edu')) 
  {
    setError('email', 'Email must contain "@student.aiub.edu".');
    isValid = false;
  }

  // Credit completed:
  if (creditCompleted === '') 
  {
    setError('creditCompleted', 'Credit completed is required.');
    isValid = false;
  } 
  else 
  {
    const creditNum = Number(creditCompleted);
    if (isNaN(creditNum) || creditNum < 0 || creditNum >= 148) 
    {
      setError('creditCompleted', 'Credit completed must be 0 or more, and less than 148.');
      isValid = false;
    }
  }

  // Department required
  if (department === '') 
  {
    setError('department', 'Please select a department.');
    isValid = false;
  }

  return isValid;
}


function renderStudentList() 
{
  studentListBody.innerHTML = '';

  if (students.length === 0) 
  {
    noStudentsMsg.style.display = 'block';
    return;
  }

  noStudentsMsg.style.display = 'none';

  students.forEach((student, index) => 
  {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${student.firstName}</td>
      <td>${student.lastName}</td>
      <td>${student.studentId}</td>
      <td>${student.email}</td>
      <td>${student.creditCompleted}</td>
      <td>${student.department}</td>
    `;
    studentListBody.appendChild(row);
  });
}


form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  // Build student object
  const newStudent = 
  {
    firstName: firstNameInput.value.trim(),
    lastName: lastNameInput.value.trim(),
    studentId: studentIdInput.value.trim(),
    email: emailInput.value.trim(),
    creditCompleted: creditCompletedInput.value.trim(),
    department: departmentInput.value
  };

  // Add to list and re-render
  students.push(newStudent);
  renderStudentList();

  // Reset form for next entry
  form.reset();
  clearAllErrors();
});


renderStudentList();
