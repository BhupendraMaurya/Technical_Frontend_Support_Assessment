document.addEventListener('DOMContentLoaded', () => {
    const radioButtons = document.querySelectorAll('input[name="product-unit"]');
    const optionCards = document.querySelectorAll('.option-card');
    const totalPriceElement = document.getElementById('total-price');

    // Prices for each unit option
    const prices = {
        '1': '$10.00 USD',
        '2': '$18.00 USD',
        '3': '$24.00 USD'
    };

    // Function to update total price display
    function updateTotalPrice(unit) {
        totalPriceElement.textContent = prices[unit];
    }

    // Function to handle changes in radio button selection
    function handleRadioChange() {
        // First, reset styling and hide unit-details for all cards
        optionCards.forEach(card => {
            card.style.borderColor = '#ddd'; // Default border color
            card.style.backgroundColor = '#fff'; // Default background color
            const details = card.querySelector('.unit-details');
            if (details) {
                details.style.display = 'none'; // Hide details for all cards
                // Reset border-top and padding-top if they were modified for expansion
                details.style.borderTop = 'none';
                details.style.paddingTop = '0';
                details.style.marginTop = '0';
            }
        });

        // Then, apply selected styling and show unit-details for the checked card
        radioButtons.forEach(radio => {
            if (radio.checked) {
                const parentCard = radio.closest('.option-card');
                if (parentCard) {
                    parentCard.style.borderColor = '#e91e63'; // Pink border for selected
                    // Apply light pink background specifically for the 'popular' card if selected
                    if (parentCard.classList.contains('popular-card')) {
                        parentCard.style.backgroundColor = '#fff0f5';
                    }
                    
                    const details = parentCard.querySelector('.unit-details');
                    if (details) {
                        details.style.display = 'flex'; // Show details for the selected card
                        // Apply spacing and border for the expanded details section
                        details.style.borderTop = '1px solid #eee';
                        details.style.paddingTop = '15px';
                        details.style.marginTop = '15px';
                    }
                }
                updateTotalPrice(radio.value); // Update total price based on selected unit
            }
        });
    }

    // Attach event listeners to radio buttons
    radioButtons.forEach(radio => {
        radio.addEventListener('change', handleRadioChange);
    });

    // Attach event listeners to option cards to also trigger radio button selection
    // This allows clicking anywhere on the card (except directly on a select dropdown) works.
    optionCards.forEach(card => {
        card.addEventListener('click', (event) => {
            // Check if the click target is NOT a select dropdown.
            // This prevents issues where clicking a select might trigger card selection
            // instead of opening the dropdown.
            if (event.target.tagName !== 'SELECT') {
                const radio = card.querySelector('input[type="radio"]');
                if (radio) {
                    radio.checked = true; // Programmatically check the radio button
                    handleRadioChange(); // Manually call the change handler
                }
            }
        });
    });

    // Set initial state on page load: ensure the '2 Unit' card is selected and expanded as per image.
    // If you want a different card initially selected, change 'unit2' to 'unit1' or 'unit3'.
    document.getElementById('unit2').checked = true;
    handleRadioChange();
});