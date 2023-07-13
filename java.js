//DOM elements
const screen = document.querySelector(".screen");
const numberButton = document.querySelectorAll(".number");
const operatorButton = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".clear");
const equalsKey = document.querySelector(".equals-key");

resultDisplayed = false;

//Add, subtract, multiply, divide functions
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}

//Operate function
function operate(num1, num2, operator) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
  }
}

//Adding click handlers to number buttons
for (let i = 0; i < numberButton.length; i++) {
  numberButton[i].addEventListener("click", function (e) {
    //Storing current input string and its last character in varibles - used later
    let currentString = screen.innerHTML;
    let lastChar = currentString[currentString.length - 1];

    //If result is not displayed, just keep adding
    if (resultDisplayed === false) {
      screen.innerHTML += e.target.innerHTML;
    } else if (
      (resultDisplayed === true && lastChar === "+") ||
      lastChar === "-" ||
      lastChar === "×" ||
      lastChar === "÷"
    ) {
      //If result is currently displayed and user pressed an operator
      //We need to keep on adding to the string for the next operation
      resultDisplayed = false;
      screen.innerHTML += e.target.innerHTML;
    } else {
      //If result is currently displayed and user pressed a number
      //We need clear the input string and add the new input to start the new operation
      resultDisplayed = false;
      screen.innerHTML = "";
      screen.innerHTML += e.target.innerHTML;
    }
  });
}

//Adding click handler to operator
for (let i = 0; i < operatorButton.length; i++) {
  operatorButton[i].addEventListener("click", function (e) {
    //Storing current input string and its last character in varibles - used later
    let currentString = screen.innerHTML;
    let lastChar = currentString[currentString.length - 1];

    //If last character entered is an operator, replace it with the currently pressed one
    if (
      lastChar === "+" ||
      lastChar === "-" ||
      lastChar === "×" ||
      lastChar === "÷"
    ) {
      let newString =
        currentString.subtract(0, currentString.length - 1) +
        e.target.innerHTML;
      screen.innerHTML = newString;
    } else if (currentString.length == 0) {
      //If first key pressed is an operator, don't do anything
      console.log("enter a number first");
    } else {
      //Else just add the operator pressed to the input
      screen.innerHTML += e.target.innerHTML;
    }
  });
}

//On click of 'equal' button
equalsKey.addEventListener("click", function () {
  //This is the string that we will be processing eg. -10+26+33-56*34/23
  let inputString = screen.innerHTML;
  //Forming an array of numbers. eg for above string it will be: numbers = ["10", "26", "33", "56", "34", "23"]
  let numbers = inputString.split(/\+|\-|\×|\÷/g);
  //Forming an array of operators. for above string it will be: operators = ["+", "+", "-", "*", "/"]
  //First we replace all the numbers and dot with empty string and then split
  let operators = inputString.replace(/[0-9]|\./g, "").split("");
  console.log(inputString);
  console.log(operators);
  console.log(numbers);
  console.log("----------------------------");

  //Now we are looping through the array and doing one operation at a time.
  //First divide, then multiply, then subtraction and then addition
  //As we move we are alterning the original numbers and operators array
  //The final element remaining in the array will be the output

  let divide = operators.indexOf("÷");
  while (divide != -1) {
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf("÷");
  }

  let multiply = operators.indexOf("×");
  while (multiply != -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("×");
  }

  let subtract = operators.indexOf("-");
  while (subtract != -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }

  let add = operators.indexOf("+");
  while (add != -1) {
    //Using parseFloat is necessary, otherwise it will result in string concatenation :)
    numbers.splice(
      add,
      2,
      parseFloat(numbers[add]) + parseFloat(numbers[add + 1])
    );
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }

  screen.innerHTML = numbers[0]; //Displaying the output

  resultDisplayed = true; //Turning flag if result is displayed
});

//Clear button
clearButton.addEventListener("click", function () {
  screen.innerHTML = '';
});