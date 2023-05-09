function solve() {
  let text = document.getElementById('input').value;
  let sentences = text.split('.').filter(s => s !== '').map(s=>s+'.');
  let parCount = 0;
  if(sentences.length<=3){
    parCount++;
  }else{
    if(sentences.length%3 ==0){
      parCount = sentences.length / 3;
    }else{
      parCount = Math.trunc(sentences.length / 3) + 1;
    }
  };
  let paragraphs = [];
  for (let i = parCount;parCount>0;parCount--) {
    if(sentences.length<=3){
      paragraphs.push(sentences.splice(0,).join(''));
    }else{
      paragraphs.push(sentences.splice(0,3).join(''));
    }
  };
  let outputDiv = document.getElementById('output');
  paragraphs.forEach(p=>{
    let element = document.createElement('p');
    let node = document.createTextNode(p);
    element.appendChild(node);
    outputDiv.appendChild(element);
    // outputDiv.appendChild(`<p>${p}</p>`);
  });
}