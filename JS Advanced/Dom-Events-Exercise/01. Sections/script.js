function create(words) {
   words.forEach(word => {
      let divEl = document.createElement('div');
      let parEl = document.createElement('p');
      parEl.textContent = word;
      parEl.style.display = "none";
      divEl.appendChild(parEl);
      divEl.addEventListener('click',()=>{
         parEl.style.display = "block";
      });
      let applyDiv = document.getElementById('content');
      applyDiv.appendChild(divEl);
   });
}