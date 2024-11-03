// Get all required elements
const billInput = document.querySelector(".bill input");
const tipButtons = document.querySelectorAll(".tip-percent button");
const customTipInput = document.querySelector(".tip-percent input");
const peopleInput = document.getElementById('people-input');
const tipAmountDisplay = document.querySelector(".tip-amount .total-money #display-money");
const totalAmountDisplay = document.querySelector(".total .total-money #display-money");
const resetButton = document.querySelector(".display-tip-amount button");
const errorMessage = document.getElementById('error-message');

// function to calculate and update tip amount and total per person
function calculateTip() {
  const bill = parseFloat(billInput.value);
  const people = parseInt(peopleInput.value);
  let tipPercent = parseFloat(customTipInput.value);

  // check if bill and people inputs are valid numbers
  if (isNaN(bill) || bill <= 0 || isNaN(people) || people <= 0) {
    tipAmountDisplay.textContent = "$0.00";
    totalAmountDisplay.textContent = "$0.00";
    return;
  }

  // get the selected tip percentage if custom tip is not used
  if (isNaN(tipPercent) || tipPercent <= 0) {
    const activeButton = document.querySelector(".tip-percent button.active");
    if (activeButton) tipPercent = parseFloat(activeButton.textContent) / 100;
  } else {
    tipPercent = tipPercent / 100;
  }

  // calculate tip and total amounts per person
  const tipAmountPerPerson = (bill * tipPercent) / people;
  const totalAmountPerPerson = (bill + bill * tipPercent) / people;

  // display values
  tipAmountDisplay.textContent = `$${tipAmountPerPerson.toFixed(2)}`;
  totalAmountDisplay.textContent = `$${totalAmountPerPerson.toFixed(2)}`;
}

// event listeners to tip buttons
tipButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Remove active class from other buttons
    tipButtons.forEach(btn => btn.classList.remove("active"));
    // Set the clicked button as active
    button.classList.add("active");
    // Clear custom tip input and calculate tip
    customTipInput.value = "";
    calculateTip();
  });
});

// event listeners to inputs for bill, people, and custom tip
[billInput, peopleInput, customTipInput].forEach(input => {
  input.addEventListener("input", () => {
    // clear active state from tip buttons when using custom tip input
    if (input === customTipInput) {
      tipButtons.forEach(btn => btn.classList.remove("active"));
    }
    calculateTip();
  });
});

// event listener to reset button
resetButton.addEventListener("click", () => {
  billInput.value = "";
  customTipInput.value = "";
  peopleInput.value = "";
  tipButtons.forEach(btn => btn.classList.remove("active"));
  tipAmountDisplay.textContent = "$0.00";
  totalAmountDisplay.textContent = "$0.00";
});

// event listener for when the tip buttons are clicked and if they are active
tipButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (button.classList.contains("active")) {
      button.classList.remove("active");
    } else {
      button.classList.add("active");
    }
  });
});

// event listener to check if the input people is valid

peopleInput.addEventListener('input', () => {
  const inputValue = parseInt(peopleInput.value, 10);
  
  if (inputValue === 0) {
      // Show error message and apply error style
      errorMessage.style.display = 'block';
      peopleInput.classList.add('input-error');
  } else {
      // Hide error message and remove error style when input is valid
      errorMessage.style.display = 'none';
      peopleInput.classList.remove('input-error');
  }
});

  // Function to check if any input has a value
  function checkInputs() {
    if (billInput.value || peopleInput.value) {
        resetButton.classList.add('reset-active');
    } else {
        resetButton.classList.remove('reset-active');
    }
  }

  // Add event listeners to check for changes in each input
  billInput.addEventListener('input', checkInputs);
  peopleInput.addEventListener('input', checkInputs);