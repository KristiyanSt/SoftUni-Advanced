function solve() {
   let addButtons = Array.from(document.getElementsByClassName('add-product'));
   let textArea = document.querySelector('textarea');
   let total = 0;
   let products = [];
   for (const addButton of addButtons) {
      let productAddDiv = addButton.parentNode;
      let detailsDiv = productAddDiv.previousElementSibling;
      let productName = detailsDiv.firstElementChild.textContent;
      let productPrice = productAddDiv.nextElementSibling.textContent;
      addButton.addEventListener('click',()=>{
         total+=Number(productPrice);
         if(!products.includes(productName)){
            products.push(productName);
         }
         textArea.textContent += `Added ${productName} for ${Number(productPrice).toFixed(2)} to the cart.\n`;
      });
   }
   let checkoutButton = document.querySelector('button[class="checkout"]');
   checkoutButton.addEventListener('click',()=>{
      textArea.textContent += `You bought ${products.join(', ')} for ${total.toFixed(2)}.`;
      let buttons = Array.from(document.querySelectorAll('button'));
      for (const button of buttons) {
         button.disabled = true;
      }
   });
}