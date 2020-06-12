let operation = [],
  entered = false,
  numOfOpen = 0,
  numOfClosed = 0,
  lastInput = "open";

// Simulating the screen of a calculator
const outputLine = document.getElementById("output");

const display = function () {
  if (outputLine.innerHTML == "") outputLine.innerHTML = "0";
  else outputLine.innerHTML = operation.join(" ");
};
display();

// Gets the two parenthesis that make up the block that needs to be done
const closestPair = function () {
  let indexesOfOpen = [],
    o = -1;
  while ((o = operation.indexOf("(", o + 1)) != -1) {
    indexesOfOpen.push(o);
  }
  let indexesOfClosed = [],
    c = -1;
  while ((c = operation.indexOf(")", c + 1)) != -1) {
    indexesOfClosed.push(c);
  }
  let prevVal = Infinity,
    closestCloseIndex,
    closestOpenIndex;
  for (let element1 of indexesOfClosed) {
    for (let element2 of indexesOfOpen) {
      let val = element1 - element2;
      if (val < prevVal && val > 0) {
        prevVal = val;
        closestCloseIndex = element1;
        closestOpenIndex = element2;
      }
    }
  }
  return [closestOpenIndex, closestCloseIndex, prevVal];
};

// Takes a block from closestPair() and returns a single value
const equation = function () {
  while (numOfClosed >= 0) {
    let block = operation.slice(
      closestPair()[0] + 1 || 0,
      closestPair()[1] || operation.length
    );
    for (let operator = 1; operator < block.length; operator += 2) {
      switch (block[operator]) {
        case "x":
          block[operator - 1] = (
            parseFloat(block[operator - 1]) * parseFloat(block[operator + 1])
          ).toString();
          block.splice(operator, 2);
          operator -= 2;
          break;
        case "÷":
          block[operator - 1] = (
            parseFloat(block[operator - 1]) / parseFloat(block[operator + 1])
          ).toString();
          block.splice(operator, 2);
          operator -= 2;
          break;
      }
    }
    while (block.length > 1) {
      switch (block[1]) {
        case "+":
          block[0] = (parseFloat(block[0]) + parseFloat(block[2])).toString();
          block.splice(1, 2);
          break;
        case "-":
          block[0] = (parseFloat(block[0]) - parseFloat(block[2])).toString();
          block.splice(1, 2);
          break;
      }
    }
    if (numOfClosed !== 0)
      operation.splice(closestPair()[0], closestPair()[2] + 1, block[0]);
    else operation = block;
    numOfClosed--;
    numOfOpen--;
  }
};

// Takes all the button presses and only allows valid input
const handlers = {
  numericInput: function (value) {
    if (entered) handlers.clear();
    if (lastInput === "open" || lastInput === "oper") {
      operation.push(`${value}`);
      display();
      lastInput = "num";
    } else if (lastInput === "num") {
      operation[operation.length - 1] += `${value}`;
      display();
    }
  },
  negative: function () {
    if (entered) handlers.clear();
    if (lastInput === "open" || lastInput === "oper") {
      operation.push("");
      lastInput = "num";
    }
    if (lastInput === "num") {
      if (operation[operation.length - 1].substring(0, 1) === "-") {
        operation[operation.length - 1] = operation[operation.length - 1].slice(
          1
        );
      } else {
        operation[operation.length - 1] = "-" + operation[operation.length - 1];
      }
      display();
    }
  },
  oper: function (tor) {
    if (lastInput === "closed" || lastInput === "num") {
      operation.push(tor);
      lastInput = "oper";
      display();
    }
  },
  clear: function () {
    operation = [];
    lastInput = "open";
    numOfOpen = 0;
    outputLine.innerHTML = "";
    numOfClosed = 0;
    entered = false;
    display();
  },
  enter: function () {
    if (numOfOpen === numOfClosed && lastInput !== "oper") {
      equation();
    }
    display();
  },
  open: function () {
    if (lastInput === "open" || lastInput === "oper") {
      operation.push("(");
      numOfOpen++;
      lastInput = "open";
      display();
    }
  },
  closed: function () {
    if (
      numOfClosed < numOfOpen &&
      (lastInput == "closed" || lastInput == "num")
    ) {
      operation.push(")");
      lastInput === closed;
      numOfClosed++;
      display();
    }
  },
};
