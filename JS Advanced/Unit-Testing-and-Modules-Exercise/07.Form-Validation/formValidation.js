function validate() {
    let usernameInput = document.getElementById('username');
    let emailInput = document.getElementById('email');
    let passwordInput = document.getElementById('password');
    let confirmPasswordInput = document.getElementById('confirm-password');
    let isCompanyInput = document.getElementById('company');
    let companyField = document.getElementById('companyInfo');
    let companyNumberInput = document.getElementById('companyNumber');
    let submitButton = document.getElementById('submit');
    let validDiv = document.getElementById('valid');

    isCompanyInput.addEventListener('change', isCompanyHandler);
    function isCompanyHandler(e) {
        if (e.target.checked) {
            companyField.style.display = 'block';
        } else {
            companyField.style.display = 'none';
        }
    }

    submitButton.addEventListener('click', submitHandler);
    function submitHandler(e) {
        e.preventDefault();

        let usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
        let isUsernameMatch = usernameRegex.test(usernameInput.value);
        if (!isUsernameMatch) {
            usernameInput.style.setProperty('border', '2px solid red');
        } else {
            usernameInput.style.border = 'none';
        }

        let passwordRegex = /^\w{5,15}$/;
        let isPasswordMatch = passwordRegex.test(passwordInput.value);
        let isConfirmPasswordMatch = passwordRegex.test(confirmPasswordInput.value);
        let bothPasswordsMatch = passwordInput.value === confirmPasswordInput.value;
        if (!isPasswordMatch || !bothPasswordsMatch) {
            passwordInput.style.setProperty('border', '2px solid red');
        } else {
            passwordInput.style.border = 'none';
        }
        if (!isConfirmPasswordMatch || !bothPasswordsMatch) {
            confirmPasswordInput.style.setProperty('border', '2px solid red');
        } else {
            confirmPasswordInput.style.border = 'none';
        }

        let emailRegex = /^.+\@.+\..+$/;
        let isEmailMatch = emailRegex.test(emailInput.value);
        if (!isEmailMatch) {
            emailInput.style.setProperty('border', '2px solid red');
        } else {
            emailInput.style.border = 'none';
        }

        let isCompanyNumberValid = false;
        if (isCompanyInput.checked) {
            if (companyNumberInput.value.trim() === ''
                || isNaN(companyNumberInput.value)
                || companyNumberInput.value > 9999
                || companyNumberInput.value < 1000) {
                companyNumberInput.style.setProperty('border', '2px solid red');
            } else {
                companyNumberInput.style.border = 'none';
                isCompanyNumberValid = true;
            }
        }

        if (isUsernameMatch && isPasswordMatch && isConfirmPasswordMatch && isEmailMatch && bothPasswordsMatch) {
            if (isCompanyInput.checked) {
                if (isCompanyNumberValid) {
                    validDiv.style.display = 'block';
                } else {
                    validDiv.style.display = 'none';
                }
            } else {
                validDiv.style.display = 'block';
            }
        } else {
            if (validDiv.style.display === 'block') {
                validDiv.style.display = 'none';
            }
        }
    }
} 

