/**
 * Number Sign Checker Application
 * Determines if a number is positive, negative, or zero
 */

/**
 * @typedef {Object} AppElements
 * @property {HTMLInputElement} numberInput - The input field for numbers
 * @property {HTMLButtonElement} checkButton - The button to trigger validation
 * @property {HTMLElement} result - The element to display results
 */

/**
 * @typedef {'positive'|'negative'} SignLabel
 */

/**
 * Application configuration constants
 * @readonly
 * @enum {string}
 */
const APP_CONFIG = Object.freeze({
    SIGN_LABELS: Object.freeze({
        POSITIVE: /** @type {SignLabel} */ ('positive'),
        NEGATIVE: /** @type {SignLabel} */ ('negative')
    }),
    MESSAGES: Object.freeze({
        INVALID_INPUT: 'Please insert a valid number.',
        ZERO_OUTPUT: 'The number is zero.',
        ERROR_MISSING_ELEMENTS: 'Required DOM elements not found.'
    }),
    ELEMENT_IDS: Object.freeze({
        NUMBER_INPUT: 'numberInput',
        CHECK_BUTTON: 'checkButton',
        RESULT: 'result'
    })
});

/**
 * Validates if a string represents a valid number
 * @param {string} value - The value to validate
 * @returns {boolean} True if valid number, false otherwise
 */
function isValidNumber(value) {
    return value.trim() !== '' && !isNaN(Number(value)) && isFinite(Number(value));
}

/**
 * Categorizes a number as positive, negative, or zero
 * @param {number} number - The number to categorize
 * @returns {string} A message describing the number's category
 * @throws {Error} If number is not a finite number
 */
function categorizeNumber(number) {
    if (!isFinite(number)) {
        throw new Error('Input must be a finite number');
    }
    
    if (number > 0) {
        return `The number ${number} is ${APP_CONFIG.SIGN_LABELS.POSITIVE}.`;
    }
    if (number < 0) {
        return `The number ${number} is ${APP_CONFIG.SIGN_LABELS.NEGATIVE}.`;
    }
    return APP_CONFIG.MESSAGES.ZERO_OUTPUT;
}

/**
 * Gets required DOM elements with error handling
 * @returns {AppElements} Object containing all required DOM elements
 * @throws {Error} If any required element is not found
 */
function getDOMElements() {
    const numberInput = /** @type {HTMLInputElement} */ (
        document.getElementById(APP_CONFIG.ELEMENT_IDS.NUMBER_INPUT)
    );
    const checkButton = /** @type {HTMLButtonElement} */ (
        document.getElementById(APP_CONFIG.ELEMENT_IDS.CHECK_BUTTON)
    );
    const result = document.getElementById(APP_CONFIG.ELEMENT_IDS.RESULT);

    if (!numberInput || !checkButton || !result) {
        throw new Error(APP_CONFIG.MESSAGES.ERROR_MISSING_ELEMENTS);
    }

    return { numberInput, checkButton, result };
}

/**
 * Creates the number validation functionality
 * @param {AppElements} elements - The DOM elements
 * @returns {Object} Object with validation methods
 */
function createNumberValidator(elements) {
    const { numberInput, result } = elements;

    /**
     * Validates and displays the result for the current input
     */
    function validateAndDisplayResult() {
        const inputValue = numberInput.value.trim();
        
        if (!isValidNumber(inputValue)) {
            result.textContent = APP_CONFIG.MESSAGES.INVALID_INPUT;
            result.className = 'error';
            return;
        }

        try {
            const number = Number(inputValue);
            result.textContent = categorizeNumber(number);
            result.className = 'success';
        } catch (error) {
            result.textContent = APP_CONFIG.MESSAGES.INVALID_INPUT;
            result.className = 'error';
        }
    }

    /**
     * Handles input field changes
     */
    function handleInputChange() {
        if (numberInput.value.trim() === '') {
            result.textContent = '';
            result.className = '';
        }
    }

    return {
        validateAndDisplayResult,
        handleInputChange
    };
}

/**
 * Initializes the application
 */
function initializeApp() {
    try {
        const elements = getDOMElements();
        const validator = createNumberValidator(elements);

        elements.checkButton.addEventListener('click', validator.validateAndDisplayResult);
        elements.numberInput.addEventListener('input', validator.handleInputChange);
        elements.numberInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                validator.validateAndDisplayResult();
            }
        });

        // Set focus to input field for better UX
        elements.numberInput.focus();

    } catch (error) {
        console.error('Failed to initialize app:', error.message);
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);
