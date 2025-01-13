// Function to convert number to words
function numberToWords(num) {
    if (num === 0) return 'zero';

    const belowTwenty = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
    const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
    const thousands = ["", "thousand", "million", "billion"];

    function helper(n) {
        if (n === 0) return "";
        else if (n < 20) return belowTwenty[n] + " ";
        else if (n < 100) return tens[Math.floor(n / 10)] + " " + helper(n % 10);
        else return belowTwenty[Math.floor(n / 100)] + " hundred " + helper(n % 100);
    }

    let word = "";
    let i = 0;

    while (num > 0) {
        if (num % 1000 !== 0) {
            word = helper(num % 1000) + thousands[i] + " " + word;
        }
        num = Math.floor(num / 1000);
        i++;
    }

    return word.trim();
}

// Event listeners and UI setup
document.addEventListener("DOMContentLoaded", () => {
    const convertButton = document.getElementById("convert-button");
    const numberInput = document.getElementById("number-input");
    const resultDisplay = document.getElementById("result-display");

    convertButton.addEventListener("click", () => {
        const num = parseInt(numberInput.value);
        if (isNaN(num)) {
            resultDisplay.innerText = "Please enter a valid number.";
        } else {
            resultDisplay.innerText = numberToWords(num);
        }
    });
});
