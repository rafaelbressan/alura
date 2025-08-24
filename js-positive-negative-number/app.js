document.addEventListener('DOMContentLoaded', () => {
    const numberInput = document.getElementById("numberInput");
    const btn = document.getElementById("checkButton");
    const result = document.getElementById("result");
    let signs = ["positive", "negative"]

    function positiveNegative(number) {
        const result = `The number ${number} is `;
        if (number > 0) {
            return result + signs[0] + ".";
        } else if (number < 0) {
            return result + signs[1] + ".";
        } else {
            return "The number is zero.";
        }
    }

    function checkValue() {
        const num = numberInput.value;
        if (num == "" || isNaN(num)) {
            result.innerHTML = "Please insert a number."
        } else {
            result.innerHTML = positiveNegative(num);
        }
    }

    function handleInputChange() {
        const num = numberInput.value;
        if (num == "") {
            result.innerHTML = ""
        }
    }

    btn.addEventListener("click", checkValue);
    numberInput.addEventListener('input', handleInputChange);
});
