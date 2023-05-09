function search() {
   let text = document.getElementById('searchText').value;
   let towns = Array.from(document.getElementsByTagName('li'));
   let matches = 0;
   towns.forEach(li=>{
      li.style.textDecoration='none';
      li.style.fontWeight='normal';
      if(li.textContent.includes(text)){
         console.log(li);
         li.style.textDecoration='underline';
         li.style.fontWeight='bold';
         matches++;
      }
   });
   let resultEl = document.getElementById('result');
   resultEl.textContent = `${matches} matches found`;
}
