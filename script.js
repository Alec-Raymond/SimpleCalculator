let operand1 = 0.0,
  operand2 = "0";
let operator = "";

// Simulating the screen of a calculator
const outputLine = document.getElementById("output");

// Displays operand1, a float
const displayOperand1 = function () {
  outputLine.innerHTML = operand1;
};

// Displays operand2, a string
const displayOperand2 = function () {
  if (operand2 == "0") outputLine.innerHTML = 0;
  else if (operand2.slice(0, 1) == "-")
    outputLine.innerHTML = "-" + operand2.slice(2);
  else outputLine.innerHTML = operand2.slice(1);
};
displayOperand2();

// Converts operand2 from a string into a valid float
const parser = function () {
  let parsed;
  if (operand2.slice(0, 1) == "-") parsed = -parseFloat(operand2.slice(1));
  else parsed = parseFloat(operand2);
  return parsed;
};

/* Performs all of the operations of the calculator:
   addition, subtraction, multiplication, division, clear, and equals/enter
*/
const operation = function () {
  switch (operator) {
    case "":
      operand1 = parser() || operand1;
      displayOperand1();
      operand2 = "0";
      break;
    case "+":
      operand1 += parser();
      displayOperand1();
      operand2 = "0";
      break;
    case "-":
      operand1 -= parser();
      displayOperand1();
      operand2 = "0";
      break;
    case "*":
      operand1 *= parser() || 1;
      displayOperand1();
      operand2 = "0";
      break;
    case "/":
      operand1 /= parser() || 1;
      displayOperand1();
      operand2 = "0";
      break;
    default:
      handlers.clear();
  }
};

// Takes all the button presses, and changes and executes what needs to be executed
const handlers = {
  numericInputZero: function () {
    operand2 += "0";
    displayOperand2();
  },
  numericInputOne: function () {
    operand2 += "1";
    displayOperand2();
  },
  numericInputTwo: function () {
    operand2 += "2";
    displayOperand2();
  },
  numericInputThree: function () {
    operand2 += "3";
    displayOperand2();
  },
  numericInputFour: function () {
    operand2 += "4";
    displayOperand2();
  },
  numericInputFive: function () {
    operand2 += "5";
    displayOperand2();
  },
  numericInputSix: function () {
    operand2 += "6";
    displayOperand2();
  },
  numericInputSeven: function () {
    operand2 += "7";
    displayOperand2();
  },
  numericInputEight: function () {
    operand2 += "8";
    displayOperand2();
  },
  numericInputNine: function () {
    operand2 += "9";
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
    operand2 = "0";
    operator = "";
    displayOperand2();
  },
  enter: function () {
    if (operand2 == 0 && operator == "") {
      operand2 == operand1;
    }
    operation();
    operator = "";
  },
};
