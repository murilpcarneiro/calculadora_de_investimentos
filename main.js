import generateReturnsArray from "./src/investimentGoals.js";

const investimentForm = document.getElementById('investiment-form');
const resetBtn = document.getElementById('resetBtn');
resetBtn.addEventListener('click', clearValues);

function renderProgression(e) {
  e.preventDefault();
  if (document.querySelector('.error')) {
    return;
  }
  const startingAmount = Number(document.getElementById("starting-amount").value.replace(",", "."));
  const timeAmount = Number(document.getElementById("time-amount").value);
  const additionalContribution = Number(document.getElementById("additional-contribution").value.replace(",", "."));
  const returnRate = Number(document.getElementById("return-rate").value.replace(",", "."));
  const taxRate = Number(document.getElementById("tax-rate").value.replace(",", "."));
  const timeAmountPeriod = document.getElementById("time-amount-period").value;
  const returnRatePeriod = document.getElementById("evaluation-period").value;

  const returnsArray = generateReturnsArray(
    startingAmount,
    timeAmount,
    timeAmountPeriod,
    additionalContribution,
    returnRate,
    returnRatePeriod
  );

  console.log(returnsArray);
}

function validateInput(e) {

  if (e.target.value === '') {
    return;
  }

  const { parentElement } = e.target;
  const grandParentElement = e.target.parentElement.parentElement;
  const inputValue = e.target.value.replace(",", ".");


  if ((isNaN(inputValue) || Number(inputValue) <= 0) && !parentElement.classList.contains('error')) {
    const errorTextElement = document.createElement('p');
    errorTextElement.classList.add('text-red-500');
    errorTextElement.textContent = "Insira um valor numérico e maior que zero";
    parentElement.classList.add('error');
    grandParentElement.appendChild(errorTextElement);
  } else if (parentElement.classList.contains('error') && !isNaN(inputValue) && inputValue > 0) {
    parentElement.classList.remove('error');
    grandParentElement.querySelector('p').remove();
  }
}

for (const formElement of investimentForm) {
  if (formElement.tagName === 'INPUT' && formElement.hasAttribute('name')) {
    formElement.addEventListener('blur', validateInput);
  }
}

function clearValues() {
  for (const formElement of investimentForm) {
    if (formElement.tagName === 'INPUT' && formElement.hasAttribute('name')) {
      formElement.value = "";
    }
  }

}

investimentForm.addEventListener('submit', renderProgression);
