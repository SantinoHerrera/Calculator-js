var result = 0;
var resultText = document.getElementsByClassName('result-text');
var helpText = document.getElementsByClassName('help-text');
var operationText = document.getElementsByClassName('operation-text');
resultText[0].innerHTML = 0;
var btns = document.getElementsByClassName('btn');

for (const btn of btns) {
  btn.addEventListener('click', calculate);
}

function calculate(e) {
  if (
    Number.isNaN(parseFloat(e.target.innerHTML, 10)) &&
    e.target.innerHTML !== '.'
  ) {
    operate(e.target.innerHTML);
  } else {
    if (resultText[0].innerHTML.length >= 14) {
      alert('Se superó el número máximo de dígitos(14)');
    } else {
      addText(e.target.innerHTML);
    }
  }
}

function operate(char) {
  if (resultText[0].innerHTML !== '0' || helpText[0].innerHTML.length >= 1) {
    switch (char) {
      case 'AC':
        resultText[0].innerHTML = 0;
        helpText[0].innerHTML = '';
        operationText[0].innerHTML = '';
        result = 0;
        break;
      case '+/-':
        result = result * -1;
        resultText[0].innerHTML = result;
        break;
      case '%':
      case '/':
      case '*':
      case '-':
      case '+':
        doOperation();
        operationText[0].innerHTML = char;
        resultText[0].innerHTML = 0;
        break;
      case '=':
        doOperation();
        resultText[0].innerHTML = result;
        helpText[0].innerHTML = '';
        operationText[0].innerHTML = '';
        break;
    }
  }
}

function doOperation() {
  if (helpText[0].innerHTML.length >= 1 && resultText[0].innerHTML !== '0') {
    switch (operationText[0].innerHTML) {
      case '+':
        result =
          parseFloat(helpText[0].innerHTML) +
          parseFloat(resultText[0].innerHTML);
        break;
      case '-':
        result =
          parseFloat(helpText[0].innerHTML) -
          parseFloat(resultText[0].innerHTML);
        break;
      case '*':
        result =
          parseFloat(helpText[0].innerHTML) *
          parseFloat(resultText[0].innerHTML);
        break;
      case '/':
        result =
          parseFloat(helpText[0].innerHTML) /
          parseFloat(resultText[0].innerHTML);
        break;
      case '%':
        result =
          (parseFloat(helpText[0].innerHTML) *
            parseFloat(resultText[0].innerHTML)) /
          100;
        break;
    }
  }
  helpText[0].innerHTML = result;
}

function addText(char) {
  if (char === '.' && resultText[0].innerHTML.indexOf('.') > -1) {
    return;
  }
  resultText[0].innerHTML = resultText[0].innerHTML + char;
  removeInitialZeros();
}

function removeInitialZeros() {
  if (resultText[0].innerHTML == 0) resultText[0].innerHTML = '0';
  else {
    var chars = resultText[0].innerHTML.split('');
    for (let index = 0; index < chars.length; index++) {
      if (chars[index] == 0) {
        chars.splice(0, 1);
        index--;
      } else {
        break;
      }
    }
    resultText[0].innerHTML = chars.join('');
    result = parseFloat(resultText[0].innerHTML);
  }
}
