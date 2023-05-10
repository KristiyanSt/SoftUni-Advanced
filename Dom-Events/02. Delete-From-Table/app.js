function deleteByEmail() {
   let inputElement = document.querySelector('input[name="email"]');
   let emailElements = Array.from(document.querySelectorAll('tbody tr td:nth-of-type(2n)'));
   let targetEmailElement = emailElements.find(el=>el.textContent === inputElement.value);
   let resultElement = document.getElementById('result');
   if(targetEmailElement){
       let row = targetEmailElement.parentNode;
       row.parentNode.removeChild(row);
       resultElement.textContent = 'Deleted.';
   }else{
    resultElement.textContent = 'Not found.';
   }
   inputElement.value = "";
}