let operation = [""];
let entered = false;

// Simulating the screen of a calculator
const outputLine = document.getElementById("output");

// Displays operand1, a float
const display = function (operand) {
  if (operation[0] === "" && operation.length === 1) {
    outputLine.innerHTML = "0";
  } else if (operation[2] === "" || operation.length === 2) {
    outputLine.innerHTML = operation[0];
  } else {
    outputLine.innerHTML = operation[operation.length - 1];
  }
};
display();

/* Performs the math functions of the calculator:
   addition, subtraction, multiplication, division
*/
const operator = function () {
  if (operation.length == 3) {
    switch (operation[1]) {
      case "add":
        operation[0] = (
          parseFloat(operation[0]) + (parseFloat(operation[2]) || 0)
        ).toString();
        operation.splice(1, 2);
        break;
      case "subtract":
        operation[0] = (
          parseFloat(operation[0]) - (parseFloat(operation[2]) || 0)
        ).toString();
        operation.splice(1, 2);
        break;
      case "multiply":
        operation[0] = (
          parseFloat(operation[0]) * (parseFloat(operation[2]) || 1)
        ).toString();
        operation.splice(1, 2);
        break;
      case "divide":
        operation[0] = (
          parseFloat(operation[0]) / (parseFloat(operation[2]) || 1)
        ).toString();
        operation.splice(1, 2);
        break;
      default:
        handlers.clear();
    }
  }
  display();
};

// Takes all the button presses and uses them to create a functioning calculator
const handlers = {
  numericInput: function (value) {
    if (entered) handlers.clear();
    if (operation.length === 2) operation.push("");
    operation[operation.length - 1] += `${value}`;
    display();
  },
  decimal: function () {
    if (entered) handlers.clear();
    operation[operation.length - 1] += ".";
    display();
  },
  negative: function () {
    if (entered) handlers.clear();
    if (operation[operation.length - 1].substring(0, 1) === "-") {
      operation[operation.length - 1] = operation[operation.length - 1].slice(
        1
      );
    } else {
      operation[operation.length - 1] = "-" + operation[operation.length - 1];
    }
    display();
  },
  func: function (tor) {
    operator();
    if (operation.length === 1) {
      operation.push(tor);
    } else if (operation.length === 2) {
      operation[1] = tor;
    }
    entered = false;
    display();
  },
  clear: function () {
    operation = [""];
    entered = false;
    display();
  },
  enter: function () {
    operator();
    display();
    entered = true;
  },
};