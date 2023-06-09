function validate() {
    let regex = new RegExp(/\w+\@\w+\.\w+/);
    let inputElement = document.getElementById('email');
    inputElement.addEventListener('change',(e)=>{
        let email = inputElement.value;
        let match = email.match(regex);
        if(!match){
            inputElement.classList.add('error');
        }else{
            inputElement.classList.remove('error');
        }
    });
}