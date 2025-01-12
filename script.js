const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const notification = document.getElementById("notification");

// Elements for the threshold alert
const thresholdForm = document.getElementById("threshold-form");
const thresholdInput = document.getElementById("threshold");

let transactions = [];
let balanceThreshold = null; // Stores the user-defined threshold

function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

function generateID() {
  return Math.floor(Math.random() * 100000000);
}

function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    showNotification();
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };
    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    text.value = "";
    amount.value = "";
  }
}

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
  item.classList.add(sign === "+" ? "plus" : "minus");
  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">
      <i class="fa fa-times"></i>
    </button>
  `;
  list.appendChild(item);
}

function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts
    .reduce((accumulator, value) => (accumulator += value), 0)
    .toFixed(2);
  const income = amounts
    .filter((value) => value > 0)
    .reduce((accumulator, value) => (accumulator += value), 0)
    .toFixed(2);
  const expense = (
    amounts
      .filter((value) => value < 0)
      .reduce((accumulator, value) => (accumulator += value), 0) * -1
  ).toFixed(2);

  balance.innerText = `Rs ${total}`;
  moneyPlus.innerText = `Rs ${income}`;
  moneyMinus.innerText = `Rs ${expense}`;

  // Check if balance is below threshold and show alert
  if (balanceThreshold !== null && parseFloat(total) < balanceThreshold) {
    alert(`Warning: Your balance is below Rs ${balanceThreshold}`);
  }
}

// Function to set balance alert threshold
function setThreshold(e) {
  e.preventDefault();
  if (thresholdInput.value.trim() !== "") {
    balanceThreshold = parseFloat(thresholdInput.value);
    alert(`Alert set: You will be warned when your balance goes below Rs ${balanceThreshold}`);
    thresholdInput.value = "";
  }
}

function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  init();
}

function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

// Event listeners
form.addEventListener("submit", addTransaction);
thresholdForm.addEventListener("submit", setThreshold);

