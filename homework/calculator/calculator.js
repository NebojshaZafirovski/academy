let currentInput = "";
let previousInput = "";
let operation = null;
const display = document.getElementById("calculator-display");

function updateDisplay() {
    display.innerText = currentInput || "0";
}


function appendNumber(number) {
    if (currentInput.includes(".") && number === ".") return;
    currentInput = currentInput.length < 15 ? currentInput + number : currentInput;
    updateDisplay();
}


function chooseOperation(op) {
    if (currentInput === "") return;
    if (previousInput !== "") compute();
    operation = op;
    previousInput = currentInput;
    currentInput = "";
}


function compute() {
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(curr)) return;

    switch (operation) {
        case "+":
            result = prev + curr;
            break;
        case "-":
            result = prev - curr;
            break;
        case "*":
            result = prev * curr;
            break;
        case "/":
            result = curr === 0 ? "Error" : prev / curr;
            break;
        default:
            return;
    }

    currentInput = result.toString().length > 15 ? "Error" : result.toString();
    operation = null;
    previousInput = "";
    updateDisplay();
}


function clearDisplay() {
    currentInput = "";
    previousInput = "";
    operation = null;
    updateDisplay();
}

// Prevent JavaScript code from showing in the browser window
window.addEventListener("DOMContentLoaded", () => {
    const preElements = document.getElementsByTagName("pre");
    for (let i = 0; i < preElements.length; i++) {
        preElements[i].style.display = "none";
    }
});

// Event listeners
document.querySelectorAll(".btn-number").forEach(button => {
    button.addEventListener("click", () => appendNumber(button.innerText));
});

document.querySelectorAll(".btn-operator").forEach(button => {
    button.addEventListener("click", () => chooseOperation(button.innerText));
});

document.getElementById("equals-button").addEventListener("click", compute);
document.getElementById("clear-button").addEventListener("click", clearDisplay);
