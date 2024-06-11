'use strict'
// Exercise 6
function validate(event) {
	event.preventDefault();
	var error = 0;

	// Get the input fields
	var fName = document.getElementById("fName");
	var fEmail = document.getElementById("fEmail");
	var fAddress = document.getElementById("fAddress");
	var fLastN = document.getElementById("fLastN");
	var fPassword = document.getElementById("fPassword");
	var fPhone = document.getElementById("fPhone");

	// Get the error elements
	var errorName = document.getElementById("errorName");
	var errorEmail = document.getElementById("errorEmail");
	var errorAddress = document.getElementById("errorAddress");
	var errorLastN = document.getElementById("errorLastN");
	var errorPassword = document.getElementById("errorPassword");
	var errorPhone = document.getElementById("errorPhone");

	// Reset error messages
	errorName.style.display = "none";
	errorEmail.style.display = "none";
	errorAddress.style.display = "none";
	errorLastN.style.display = "none";
	errorPassword.style.display = "none";
	errorPhone.style.display = "none";

	// Regular expression for email validation
	let emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	// Validate fields entered by the user: name, email, address, last name, password, and phone
	if (fName.value.length < 3) {
		error++;
		errorName.style.display = "block";
	}

	/*if (!fEmail.value.includes("@") || fEmail.value.length < 3) {
		error++;
		errorEmail.style.display = "block";
	}*/
	if (!emailRegEx.test(fEmail.value)) {
		error++;
		errorEmail.style.display = "block";
	}


	if (fAddress.value.length < 3) {
		error++;
		errorAddress.style.display = "block";
	}

	if (fLastN.value.length < 3) {
		error++;
		errorLastN.style.display = "block";
	}

	/*if (fPassword.value.length < 4 || fPassword.value.length > 8) {
		error++;
		errorPassword.style.display = "block";
	}*/
	if (fPassword.value.length < 8 || fPassword.value.length > 12) {
		error++;
		errorPassword.style.display = "block";
	} else {
		let regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,15}$/
;
		if (!regexPass.test(fPassword.value)) {
			error++;
			errorPassword.style.display = "block";
		}
	}

	if (fPhone.value.length != 9 || isNaN(fPhone.value)) {
		error++;
		errorPhone.style.display = "block";
	}

	if (error > 0) {
		alert("Hay campos incorrectos o incompletos.");
	} else {
		alert("Datos introducidos correctamente");
	}
}

// Attach the validate function to the form's submit event
document.querySelector('form').addEventListener('submit', validate);
	 	