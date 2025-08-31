function appInitialize() {
    let counter;
    let isCounting = false;

    const APP_CONFIG = {
        MESSAGES: Object.freeze({
            INVALID_INPUT: 'Please insert a valid number.',
            ZERO_OUTPUT: 'The number is zero.'
        })
    }

    const regressiveMessage = document.getElementById("regressiveMessage");
    const progressiveMessage = document.getElementById("progressiveMessage");

    const progressiveStart = document.getElementById("progressiveStart");
    const regressiveStart = document.getElementById("regressiveStart");

    const counterValue = document.getElementById("counterValue");

    const modalProgressive = document.getElementById("progressiveModal");
    const modalRegressive = document.getElementById("regressiveModal");

    const progressiveBtn = document.getElementById("progressiveBtn");
    const regressiveBtn = document.getElementById("regressiveBtn");

    const progressiveClose = document.getElementById('progressiveClose');
    const regressiveClose = document.getElementById('regressiveClose');

    const progressiveCancel = document.getElementById('progressiveCancel');
    const regressiveCancel = document.getElementById('regressiveCancel');

    const progressiveInput = document.getElementById('progressiveInput');
    const regressiveInput = document.getElementById('regressiveInput');

    function minValue(input) {
        const minV = input.getAttribute('min');
        const min = parseInt(minV);
        return isNaN(min) ? 1 : min;
    }

    function maxValue(input) {
        const maxV = input.getAttribute('max');
        const max = parseInt(maxV);
        return isNaN(max) ? 1000 : max;
    }

    function closeModal(close, target) {
        close.addEventListener('click', () => {
            target.classList.remove('show');
        });
    }

    function openModal(open, target) {
        open.addEventListener('click', () => {
            target.classList.add('show');
            counterValue.textContent = '0';
        });
    }

    function checkValue(inputId) {
        const input = document.getElementById(inputId);
        const value = input.value.trim();
        const number = Number(value);

        if (isNaN(number) || !isFinite(number) || number < minValue(input) || number > maxValue(input)) {
            return APP_CONFIG.MESSAGES.INVALID_INPUT;

        }

        if (!value) {
            return APP_CONFIG.MESSAGES.INVALID_INPUT;
        }

        return 'VALID'
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function startCounting(type, targetNumber) {
        if (isCounting) return; // Prevent multiple simultaneous counts
        isCounting = true;

        numericTarget = Number(targetNumber);
        if (type === 'progressive') {
            counter = 0;
            while (counter < numericTarget) {
                counter++;
                counterValue.textContent = counter;
                await delay(1000); // 1 second delay
            }
        } else if (type === 'regressive') {
            counter = numericTarget + 1;
            while (counter > 0) {
                counter--;
                counterValue.textContent = counter;
                await delay(1000); // 1 second delay

            }
        }

        isCounting = false;
    }

    progressiveStart.addEventListener('click', () => {
        const result = checkValue('progressiveInput');
        if (result === 'VALID' && !isCounting) {
            startCounting('progressive', progressiveInput.value);
            modalProgressive.classList.remove('show');
        } else {
            progressiveMessage.textContent = result;
        }
    });

    regressiveStart.addEventListener('click', () => {
        const result = checkValue('regressiveInput');
        if (result === 'VALID' && !isCounting) {
            startCounting('regressive', regressiveInput.value);
            modalRegressive.classList.remove('show');
        } else {
            regressiveMessage.textContent = result;
        }
    });

    openModal(progressiveBtn, modalProgressive);
    closeModal(progressiveClose, modalProgressive);
    closeModal(progressiveCancel, modalProgressive);

    openModal(regressiveBtn, modalRegressive);
    closeModal(regressiveClose, modalRegressive);
    closeModal(regressiveCancel, modalRegressive);

};

document.addEventListener('DOMContentLoaded', appInitialize)