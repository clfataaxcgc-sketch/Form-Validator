const Username = document.getElementById('Username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const ConfimPassword = document.getElementById('Confim-password');
const form = document.getElementById('register-from');

// Submit Form
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const isReqiredValid = checRequered([
    Username,
    email,
    password,
    ConfimPassword,
  ]);

  let isFormValid = isReqiredValid;

  if (isReqiredValid) {
    const isUsernameValid = checkLength(Username, 3, 15);
    const isEmailValid = checkemail(email);
    const isPasswordValid = checkLength(password, 6, 25);
    const isConfirmPasswordMatch = checkMatch(password, ConfimPassword);

    isFormValid =
      isUsernameValid &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordMatch;
  }

  if (isFormValid) {
    alert('Registration successful!');

    form.reset();

    document.querySelectorAll('.form-group').forEach((group) => {
      group.className = 'form-group';
    });
  }
});

// Check Password Match
function checkMatch(input1, input2) {
  if (input1.value === input2.value) {
    showSuccess(input2);
    return true;
  } else {
    showError(input2, 'Password does not match');
    return false;
  }
}

// Check Email
function checkemail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(email.value)) {
    showSuccess(email);
    return true;
  } else {
    showError(email, 'Email is not valid');
    return false;
  }
}

// Check Input Length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${formatgetFileName(input)} must be at least ${min} characters`,
    );
    return false;
  }

  if (input.value.length > max) {
    showError(
      input,
      `${formatgetFileName(input)} must be no more than ${max} characters`,
    );
    return false;
  }

  showSuccess(input);
  return true;
}

// Check Required Inputs
function checRequered(inputArry) {
  let isValid = true;

  inputArry.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${formatgetFileName(input)} is required`);
      isValid = false;
    } else {
      showSuccess(input);
    }
  });

  return isValid;
}

// Show Error
function showError(input, message) {
  const formGroup = input.parentElement;
  formGroup.className = 'form-group error';

  const small = formGroup.querySelector('small');
  small.innerText = message;
}

// Show Success
function showSuccess(input) {
  const formGroup = input.parentElement;
  formGroup.className = 'form-group success';
}

// Format Input Name
function formatgetFileName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
