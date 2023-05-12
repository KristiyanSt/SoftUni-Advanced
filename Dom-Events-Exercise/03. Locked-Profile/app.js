function lockedProfile() {
    let buttons = Array.from(document.querySelectorAll('button'));
    buttons.forEach(button=>{
        button.addEventListener('click', showHideFunc);
    });
    function showHideFunc(e){
        let currentButton = e.target;
        let currentDiv = currentButton.parentElement;
        let checkedInputField = currentDiv.querySelector('input:checked');
        if(checkedInputField.value === 'unlock'){
            let showDiv = currentDiv.querySelector('div');
            if(showDiv.style.display === 'block'){
                showDiv.style.display = 'none';
                currentButton.textContent = 'Show more';
            }else{
                showDiv.style.display = 'block';
                currentButton.textContent = 'Hide it';
            }
        }
    }
}