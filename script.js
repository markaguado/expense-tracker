// Initialize the expense list and total amount
let expenses = [];
let totalAmount = 0;

// Get the expense form and expense list elements
const form = document.querySelector('form');
const expenseList = document.getElementById('expenseList');

const total = document.getElementById('total');

// Add an expense to the list
function addExpense() {
    // Get the expense and amount values from the form
    const expenseName = document.getElementById('expense').value;
    const expenseAmount = document.getElementById('amount').value;

    // Add the expense to the list
    expenses.push({ name: expenseName, amount: parseFloat(expenseAmount) });

    // Reset the form
    form.reset();

    // Update the expense list and total
    updateExpenses();
}

function validateValues() {
    const expenseDescription = document.getElementById('expense').value;
    const amount = document.getElementById('amount').value;
    if (expenseDescription == "" || amount == "") {
        alert("Fields cannot be empty");
        return false;
    }
    return addExpense();
}

// Update the expense list and total
function updateExpenses() {
    // Clear the expense list
    expenseList.innerHTML = '';

    // Add each expense to the list
    expenses.forEach(function (expense) {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = expense.name + ': $' + expense.amount.toFixed(2);
        expenseList.appendChild(li);

        const button = document.createElement('button');
        button.textContent = 'Delete';
        li.appendChild(button);


    });

    // Calculate and display the total amount
    totalAmount = expenses.reduce(function (sum, expense) {
        return sum + expense.amount;
    }, 0);
    total.textContent = 'Total: $' + totalAmount.toFixed(2);
}

form.addEventListener('submit', function (event) {


    validateValues();


    event.preventDefault();

});

expenseList.addEventListener('click', function (event) {
    if (event.target.tagName === 'BUTTON') {
        const li = event.target.parentElement;
        const index = Array.from(expenseList.children).indexOf(li); // get index of the deleted expense
        expenses.splice(index, 1); // remove the deleted expense from the expenses array
        expenseList.removeChild(li); // remove the deleted expense from the DOM
        updateExpenses(); // update the expense list and total
    }
});


// api for coinbase

// import { API_KEY } from "./config.js";

// api for coinbase
const currency = document.getElementById('currency');

window.onload = function () {
    const url = `https://api.coindesk.com/v1/bpi/currentprice.json`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const time = data.time.updated;
            const bpi = data.bpi.USD.rate;
            const currencyHTML = `
            <p>Time: ${time}</p>
            <p>Bitcoin Price index in USD: ${bpi}</p>
            `;
            currency.innerHTML = currencyHTML;
        })
        .catch(error => {
            console.error(error);
            currency.textContent = 'Not working';
        });

    // weather app

    // const weatherDiv = document.querySelector('.weather');
    // const apiKey = API_KEY;
    // const urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=Ottawa&appid=${apiKey}&units=metric`;

    // fetch(urlWeather)
    //     .then(response => response.json())
    //     .then(data => {
    //         const description = data.weather[0].description;
    //         const temp = data.main.temp;
    //         const feelsLike = data.main.feels_like;
    //         const humidity = data.main.humidity;
    //         const windSpeed = data.wind.speed;
    //         const weatherHTML = `
    //             <h2>Ottawa</h2>
    //             <p>Description: ${description}</p>
    //             <p>Temperature: ${temp}°C</p>
    //             <p>Feels like: ${feelsLike}°C</p>
    //             <p>Humidity: ${humidity}%</p>
    //             <p>Wind Speed: ${windSpeed}m/s</p>
    //         `;
    //         weatherDiv.innerHTML = weatherHTML;
    //     })
    //     .catch(error => {
    //         console.error(error);
    //         weatherDiv.textContent = 'Error getting weather data.';
    //     });
}
