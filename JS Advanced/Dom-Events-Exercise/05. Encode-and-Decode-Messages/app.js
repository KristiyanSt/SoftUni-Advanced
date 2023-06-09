function encodeAndDecodeMessages() {
    let inputMessageElement = document.querySelector('#main > div > textarea');
    let buttons = document.getElementsByTagName('button');
    let encodeButton = buttons[0];
    let decodeButton = buttons[1];
    let receiveMessageElement = document.querySelector('#main :nth-child(2) textarea');
    encodeButton.addEventListener('click', encodeText);
    decodeButton.addEventListener('click', decodeText);
    function encodeText(){
        let text = inputMessageElement.value;
        inputMessageElement.value = "";
        let resultString = processText(text,'encode');
        receiveMessageElement.value = resultString;
    }
    function decodeText(){
        let text = receiveMessageElement.value;
        receiveMessageElement.value = processText(text,'decode');
    }
    function processText(text,operation){
        let result = [];
            for (const letter of text) {
                if(operation === 'encode'){
                    result.push(String.fromCharCode((letter.charCodeAt(0) + 1)));
                }else{
                    result.push(String.fromCharCode((letter.charCodeAt(0) - 1)));
                }
            }
            return result.join('');
    }
}