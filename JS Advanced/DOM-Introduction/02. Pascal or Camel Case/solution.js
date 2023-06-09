function solve() {
  let text = document.getElementById('text').value.toLowerCase();
  let namingConvention = document.getElementById('naming-convention').value;
  let words = text.split(' ');
  let conventions = {
    'Camel Case': function (words) {
      let result = '';
      words.forEach((word, index) => {
        if (index == 0) {
          result += word;
        } else {
          result += word[0].toUpperCase();
          result += word.substring(1);
        }
      });
      return result;
    },
    'Pascal Case': function (words) {
      let result = '';
      words.forEach(word => {
        result += word[0].toUpperCase();
        result += word.substring(1);
      });
      return result;
    }
  }
  let resultElement = document.getElementById('result');
  if(conventions[namingConvention]){
    resultElement.textContent = conventions[namingConvention](words);
  }
  else{
    resultElement.textContent = 'Error!';
  }
  
}