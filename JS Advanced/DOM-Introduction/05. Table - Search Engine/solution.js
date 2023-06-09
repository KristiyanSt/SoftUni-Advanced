function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);
   function onClick() {
      let inputFieldEl = document.getElementById('searchField');
      let searchText = inputFieldEl.value;
      inputFieldEl.value = '';
      let rows = Array.from(document.querySelectorAll('.container tbody tr'));
      rows.forEach(row=>{
         row.classList.remove('select');
         let tdataArr = Array.from(row.getElementsByTagName('td'));
         tdataArr.forEach(td=>{
            if(td.textContent.includes(searchText)){
               row.classList.add('select');
            }
         });
      });
   }
}