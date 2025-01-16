import generateReturnsArray from "./src/investimentGoals.js";
import { Chart } from "chart.js/auto";

const finalMoneyChart = document.getElementById('final-money-distribution');
const progressionChart = document.getElementById('progression');
const investimentForm = document.getElementById('investiment-form');
const resetBtn = document.getElementById('resetBtn');
let doughnutChartReference = {};
let progressionChartReference = {};

function formatCurrency(value) {
  return value.toFixed(2);
}

function renderProgression(e) {
  e.preventDefault();
  if (document.querySelector('.error')) {
    return;
  }

  resetCharts();

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

  const finalInvestimentObject = returnsArray[returnsArray.length - 1];
  doughnutChartReference = new Chart(finalMoneyChart, {
    type: 'doughnut',
    data: {
      labels: [
        'Total Investido',
        'Rendimento',
        'Imposto'
      ],
      datasets: [{
        data: [
          formatCurrency(finalInvestimentObject.investedAmount),
          formatCurrency(finalInvestimentObject.totalInterestReturns * (1 - taxRate / 100)),
          formatCurrency(finalInvestimentObject.totalInterestReturns * (taxRate / 100)),
        ],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    }
  });

  progressionChartReference = new Chart(progressionChart, {
    type: 'bar',
    data: {
      labels: returnsArray.map(investimentObject => investimentObject.month),
      datasets: [{
        label: 'Total Investido',
        data: returnsArray.map(investimentObject => formatCurrency(investimentObject.investedAmount)),
        backgroundColor: 'rgb(255, 99, 132)',
      }, {
        label: 'Retorno de Investimento',
        data: returnsArray.map(investimentObject => formatCurrency(investimentObject.interestReturns)),
        backgroundColor: 'rgb(54, 162, 235)',
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true
        }
      }
    }
  })
}

function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function resetCharts() {
  if (!isObjectEmpty(doughnutChartReference) && !isObjectEmpty(progressionChartReference)) {
    doughnutChartReference.destroy();
    progressionChartReference.destroy();
  }
}

function clearValues() {
  for (const formElement of investimentForm) {
    if (formElement.tagName === 'INPUT' && formElement.hasAttribute('name')) {
      formElement.value = "";
    }
  }

  resetCharts();

  const errorInputsContainers = document.querySelectorAll('.error');

  for (const errorInputContainer of errorInputsContainers) {
    errorInputContainer.classList.remove('error');
    errorInputContainer.parentElement.querySelector('p').remove();
  }
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


investimentForm.addEventListener('submit', renderProgression);
resetBtn.addEventListener('click', clearValues);
