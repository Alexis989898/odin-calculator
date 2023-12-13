//Getting all buttons from the calculator
const display = document.querySelector("#display");
const clearBtn = document.querySelector("#btn-clear");
const divideBtn = document.querySelector("#btn-divide");
const multiplyBtn = document.querySelector("#btn-multiply");
const subtractBtn = document.querySelector("#btn-subtract");
const addBtn = document.querySelector("#btn-add");
const equalsBtn = document.querySelector("#btn-equals");
const numsBtn = document.querySelectorAll(".num");

let n1, n2, operator; //Vars for each operation part
n1 = null;
n2 = null;

let resetOrder = false;

//Trigger for number buttons
for (let i = 0; i < numsBtn.length; i++) {
    numsBtn[i].addEventListener("click", () => addNum(numsBtn[i].textContent), false);
}

//Trigger for operator buttons
addBtn.addEventListener("click", () => addOperator("+"));
subtractBtn.addEventListener("click", () => addOperator("-"));
multiplyBtn.addEventListener("click", () => addOperator("*"));
divideBtn.addEventListener("click", () => addOperator("/"));

//Trigger for equals button
equalsBtn.addEventListener("click", () => operate(n1, n2, operator));

//Trigger for clean button
clearBtn.addEventListener("click", () => clearCalc());

function addOperator(op) {
    resetOrder = false;
    if(n1 == null) {
        return;
    }
    if(op && n1 && n2) {
        operate(n1, n2, operator);
        resetOrder = false;
        operator = op;
        display.textContent += op;
    } else {
        if(display.innerText.length < 12) {
            if(operator) {
                display.textContent = display.textContent.slice(0, -1);
            }
            operator = op;
            display.textContent += op;
        } else {
            redDisplayBlink();
        }
    }
}

function toFixedIfNecessary(value, dp){
    return +parseFloat(value).toFixed(dp);
}

function clearCalc() {
    display.style.color = "black";
    display.className = "";
    n1 = null;
    n2 = null;
    operator = null;
    display.textContent = "";
}

function add(x, y) {
    return parseFloat(x) + parseFloat(y);
}

function subtract(x, y) {
    return parseFloat(x) - parseFloat(y);
}

function multiply(x, y) {
    return parseFloat(x) * parseFloat(y);
}

function divide(x, y) {
    return parseFloat(x) / parseFloat(y);
}

function operate(x, y, op) {
    if(isNaN(n1) || isNaN(n2)) {
        clearCalc();
        return;
    }
    if(!operator || n1 === null || n2 === null) {
        return;
    }
    let result = null;
    switch (op) {
        case "+": result = add(x, y); break;
        case "-": result = subtract(x, y); break;
        case "*": result = multiply(x, y); break;
        case "/": result = divide(x, y); break;
    }
    result = parseFloat(toFixedIfNecessary(result, 5));
    n1 = result;
    n2 = null;
    operator = null;
    display.textContent = result;
    
    resetOrder = true;
}

function redDisplayBlink() {
    display.style.color = "red";
    display.className = "blink";
}

function addNum(num) {
    console.log(num);
    if(resetOrder) {
        resetOrder = false;
        clearCalc();
        n1 = num;
        display.textContent += num;
        return;
    }
    if(display.innerText.length < 12) {
        if(operator) {
            if(!n2) {
                n2 = num;
            } else {
                if(num == "." && n2.toString().includes(".")) {
                    return;
                }
                n2 += num;
            }
            display.textContent += num;
        } else {
            if(!n1) {
                n1 = num;
            } else {
                if(num == "." && n1.toString().includes(".")) {
                    return;
                }
                n1 += num;
            }
            display.textContent += num;
        }
    } else {
        redDisplayBlink();
    }
}