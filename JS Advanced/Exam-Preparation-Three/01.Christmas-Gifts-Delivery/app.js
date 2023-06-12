function solution() {
    let giftInput = document.querySelector('input[placeholder="Gift name"]');
    let addButton = document.querySelector('.card div button')
    addButton.addEventListener('click',addGift)

    function addGift(){
        let giftsUl = document.querySelector('.container :nth-of-type(2n) ul');
        let li = document.createElement('li');
        li.classList.add('gift');
        li.textContent = giftInput.value;

        let sendButton = document.createElement('button');
        sendButton.id = 'sendButton';
        sendButton.textContent = "Send";
        sendButton.addEventListener('click',addItemToSendGifts);

        let discardButton = document.createElement('button');
        discardButton.id = 'discardButton';
        discardButton.textContent = "Discard";
        discardButton.addEventListener('click',addItemToDiscardedGifts);

        li.appendChild(sendButton);
        li.appendChild(discardButton);

        giftsUl.appendChild(li);
        let lis = Array.from(giftsUl.querySelectorAll('li'));
        giftsUl.innerText = "";
        lis.sort((a,b) => a.textContent.localeCompare(b.textContent));
        lis.forEach(li=>giftsUl.appendChild(li));
        giftInput.value = "";
    }

    function addItemToSendGifts(e){
        let sentLi = replaceItem(e);
        let sentGiftsUl = document.querySelector('.container :nth-of-type(3n) ul');
        sentGiftsUl.appendChild(sentLi);
    }
    function addItemToDiscardedGifts(e){
        let discardedLi = replaceItem(e);
        let discardedGiftsUl = document.querySelector('.container :nth-of-type(4n) ul');
        discardedGiftsUl.appendChild(discardedLi);
    }
    function replaceItem(e){
        let li = e.target.parentElement;
        Array.from(li.children).forEach(b => b.remove());

        let sentLi = document.createElement('li');
        sentLi.textContent = li.textContent;

        li.remove();
        return sentLi;
    }
}