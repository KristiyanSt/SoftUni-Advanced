window.addEventListener('load', solution);

function solution() {
  let buttonSubmit = document.getElementById("submitBTN");
  buttonSubmit.addEventListener('click',submittingInformationHandler);

  function submittingInformationHandler(){

    let inputs = Array.from(document.querySelectorAll('#form div input'));

    if(inputs[0].value.trim() !== "" && inputs[1].value.trim() !== ""){
        let ulPreview = document.getElementById("infoPreview");
        inputs.forEach(el=>addItemToPreviewUl(el,ulPreview));
        inputs.forEach(el=>el.value = "");
        buttonSubmit.setAttribute('disabled',true);
        let buttonsPreview = Array.from(document.querySelectorAll('.actions input'));
        buttonsPreview.forEach(b=>b.removeAttribute('disabled'));
        buttonsPreview[0].addEventListener('click',editInformationHandler);
        buttonsPreview[1].addEventListener('click',continueButtonHandler);
    }
  }
  function addItemToPreviewUl(element,ulInfoPreview){
    let li = document.createElement('li');
    let ids = {
      'fname':'Full Name: ',
      "email": 'Email: ',
      "phone": 'Phone Number: ',
      "address": 'Address: ',
      "code": 'Postal Code: '
    }
    li.textContent = ids[element.id] + element.value;
    ulInfoPreview.appendChild(li);
  }
  function editInformationHandler(){
    let inputs = Array.from(document.querySelectorAll('#form div input'));
                      
    let ulPreviewLis = Array.from(document.querySelectorAll('#infoPreview li'));
                            
    for(let i = 0;i<ulPreviewLis.length;i++){
      let liTextContent = ulPreviewLis[i].textContent;
      let liTextContentArr = liTextContent.split(": ");
      liTextContentArr.shift();
      inputs[i].value = liTextContentArr.join(": ");
    }
    ulPreviewLis.forEach(li=>li.remove());

    Array.from(document.querySelectorAll('.actions input'))
                            .forEach(b=>b.setAttribute('disabled',true));

    buttonSubmit.removeAttribute('disabled');
  }
  function continueButtonHandler(){
    let divBlock = document.getElementById('block');
    Array.from(divBlock.children)
            .forEach(ch=>ch.remove());
    let h3 = document.createElement('h3');
    h3.textContent = "Thank you for your reservation!";
    divBlock.appendChild(h3);
    
  }
}
