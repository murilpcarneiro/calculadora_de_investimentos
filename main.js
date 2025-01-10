import generateReturnsArray from "./src/investimentGoals.js";

const investimentForm = document.getElementById('investiment-form');

function renderProgression(e) {
  e.preventDefault();
  const startingAmount = Number(document.getElementById("starting-amount").value);
  const timeAmount = Number(document.getElementById("time-amount").value);
  const additionalContribution = Number(document.getElementById("additional-contribution").value);
  const returnRate = Number(document.getElementById("return-rate").value);
  const taxRate = Number(document.getElementById("tax-rate").value);
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

investimentForm.addEventListener('submit', renderProgression);
