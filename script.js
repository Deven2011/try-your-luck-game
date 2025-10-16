document.addEventListener('DOMContentLoaded', () => {
    // Select all the necessary elements from the HTML
    const cards = document.querySelectorAll('.card');
    const cardTexts = [
        document.querySelector('#card1 p'),
        document.querySelector('#card2 p'),
        document.querySelector('#card3 p')
    ];
    const luckButton = document.getElementById('luckButton');
    
    // New: Select popup elements
    const resultPopup = document.getElementById('resultPopup');
    const popupMessage = document.getElementById('popupMessage');
    const closePopupButton = document.getElementById('closePopupButton');

    // An array to keep track of the interval timers for each card
    let intervals = [null, null, null];

    // Function to start displaying random numbers on a card
    const startRandomNumbers = (textElement, index) => {
        if (intervals[index]) {
            return;
        }
        intervals[index] = setInterval(() => {
            const randomNumber = Math.floor(Math.random() * 10);
            textElement.textContent = randomNumber;
        }, 100);
    };
    
    // New: Function to show the popup with a specific message
    const showPopup = (message) => {
        popupMessage.textContent = message;
        resultPopup.classList.remove('hidden');
    };

    // New: Function to hide the popup
    const hidePopup = () => {
        resultPopup.classList.add('hidden');
    };

    // Add a click event listener to each card
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            startRandomNumbers(cardTexts[index], index);
        });
    });

    // Add a click event listener to the "Try Your Luck" button
    luckButton.addEventListener('click', () => {
        // Stop all the running intervals
        intervals.forEach(intervalId => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        });
        intervals = [null, null, null];

        const num1 = cardTexts[0].textContent;
        const num2 = cardTexts[1].textContent;
        const num3 = cardTexts[2].textContent;

        // Check if any card was not clicked
        if (num1 === 'Click' || num2 === 'Click' || num3 === 'Click') {
            showPopup("Oops! You need to click all three cards first.");
            return;
        }

        // Check the win/loss condition and show the popup
        if (num1 === num2 && num2 === num3) {
            showPopup("Yay! You won!");
        } else {
            showPopup("Ohh! You lost!");
        }
    });
    
    // New: Add event listener to the close button on the popup
    closePopupButton.addEventListener('click', hidePopup);
});