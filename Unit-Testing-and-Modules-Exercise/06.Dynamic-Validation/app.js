function validate() {
    let emailInput = document.getElementById('email');
    emailInput.addEventListener('change',validateEmail);
    function validateEmail(){
        let inputValue = emailInput.value;
        let emailRegex  = /^[a-z]+\@[a-z]+\.[a-z]+$/;
        let isMatch = emailRegex.test(inputValue);
        if(!isMatch){
            emailInput.classList.add('error');
        }else{
            emailInput.classList.remove('error');
        }
    }
}