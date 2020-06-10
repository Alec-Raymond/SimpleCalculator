let operand1 = 0.0,
  operand2 = "";
let operator = "";

// Simulating the screen of a calculator
const outputLine = document.getElementById("output");

// Displays operand1, a float
const displayOperand1 = function () {
  outputLine.innerHTML = operand1;
};

// Displays operand2, a string
const displayOperand2 = function () {
  if (operand2 == "") outputLine.innerHTML = 0;
  else outputLine.innerHTML = operand2;
};
displayOperand2();

// Converts operand2 from a string into a valid float

/* Performs all of the operations of the calculator:
   addition, subtraction, multiplication, division, clear, and equals/enter
*/
const operation = function () {
  switch (operator) {
    case "":
      operand1 = parseFloat(operand2) || operand1;
      displayOperand1();
      operand2 = "";
      break;
    case "+":
      operand1 += parseFloat(operand2) || 0;
      displayOperand1();
      operand2 = "";
      break;
    case "-":
      operand1 -= parseFloat(operand2) || 0;
      displayOperand1();
      operand2 = "";
      break;
    case "*":
      operand1 *= parseFloat(operand2) || 1;
      displayOperand1();
      operand2 = "";
      break;
    case "/":
      operand1 /= parseFloat(operand2) || 1;
      displayOperand1();
      operand2 = "";
      break;
    default:
      handlers.clear();
  }
};

// Takes all the button presses, and changes and executes what needs to be executed
const handlers = {
  numericInput: function (value) {
    operand2 += `${value}`;
    displayOperand2();
  },
  decimal: function () {
    operand2 += ".";
    displayOperand2();
  },
  negative: function () {
    if (operand2[0] == "-") operand2 = operand2.slice(1);
    else operand2 = "-" + operand2;
    displayOperand2();
  },
  addition: function () {
    operation();
    if (operator != "+") {
      operator = "+";
    }
  },
  subtraction: function () {
    operation();
    operator = "-";
  },
  multiplication: function () {
    operation();
    operator = "*";
  },
  division: function () {
    operation();
    operator = "/";
  },
  clear: function () {
    operand1 = 0.0;
    operand2 = "";
    operator = "";
    displayOperand2();
  },
  enter: function () {
    operation();
    operator = "";
  },
};
