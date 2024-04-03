function validateEmail(email) {
  var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
  return email.match(emailRegex);
}

document.getElementById("email").addEventListener("input", function () {
  var emailInput = this.value.trim(); // Trim whitespace from the input value
  var emailError = document.getElementById("emailError");

  if (emailInput === "") {
    emailError.textContent = ""; // Clear error message if the field is empty
  } else if (!validateEmail(emailInput)) {
    emailError.textContent = "Please enter a valid email address";
  } else {
    emailError.textContent = ""; // Clear error message if the email is valid
  }
});

function validateForm() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;
  var emailError = document.getElementById("emailError");

  var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;

  if (name === "" || message === "") {
    alert("Name and Message fields are required");
    return false;
  }

  if (!email.match(emailRegex)) {
    emailError.textContent = "Please enter a valid email address";
    return false;
  } else {
    emailError.textContent = ""; // Clear the error message if email is valid
  }

  alert("Thank you for contacting us! We will get back to you shortly.");

  document.getElementById("contactForm").reset();

  return false;
}
