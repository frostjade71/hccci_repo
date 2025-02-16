// Populate currency dropdowns when the page loads
document.addEventListener("DOMContentLoaded", populateCurrencies);

async function populateCurrencies() {
    try {
        let response = await fetch("https://v6.exchangerate-api.com/v6/6341a0ddf6aee7eb055a6f43/latest/USD");

        if (!response.ok) throw new Error("Failed to fetch currency list");

        let data = await response.json();
        let currencies = Object.keys(data.conversion_rates);

        let fromCurrency = document.getElementById("fromCurrency");
        let toCurrency = document.getElementById("toCurrency");

        fromCurrency.innerHTML = "";
        toCurrency.innerHTML = "";

        currencies.forEach(currency => {
            let option1 = document.createElement("option");
            let option2 = document.createElement("option");

            option1.value = option2.value = currency;
            option1.textContent = option2.textContent = currency;

            fromCurrency.appendChild(option1);
            toCurrency.appendChild(option2);
        });

        // Default values (USD to EUR)
        fromCurrency.value = "USD";
        toCurrency.value = "EUR";
    } catch (error) {
        console.error("Error loading currency list:", error);
    }
}

// Function to filter currencies in dropdowns
function filterCurrencies(searchInputId, selectId) {
    let searchInput = document.getElementById(searchInputId);
    let select = document.getElementById(selectId);
    let filter = searchInput.value.toUpperCase();
    let options = select.getElementsByTagName("option");

    for (let i = 0; i < options.length; i++) {
        let txtValue = options[i].textContent || options[i].innerText;
        options[i].style.display = txtValue.toUpperCase().includes(filter) ? "" : "none";
    }
}

// Convert currency function
async function convertCurrency() {
    let amount = document.getElementById("amount").value;
    let fromCurrency = document.getElementById("fromCurrency").value;
    let toCurrency = document.getElementById("toCurrency").value;
    let timestamp = document.getElementById("timestamp");

    if (!amount || amount <= 0) {
        document.getElementById("result").innerText = "Please enter a valid amount";
        return;
    }

    try {
        let response = await fetch(`https://v6.exchangerate-api.com/v6/6341a0ddf6aee7eb055a6f43/latest/${fromCurrency}`);

        if (!response.ok) throw new Error("Failed to fetch exchange rates");

        let data = await response.json();

        // Check if target currency exists
        if (!data.conversion_rates[toCurrency]) {
            throw new Error("Invalid currency conversion");
        }

        let rate = data.conversion_rates[toCurrency];
        let convertedAmount = (amount * rate).toFixed(2);

        document.getElementById("result").innerText = `Converted Amount: ${convertedAmount} ${toCurrency}`;
        document.getElementById("lastUpdated").innerText = `Last Updated: ${data.time_last_update_utc}`;

        // Get current date and time
        let now = new Date();
        let formattedTime = now.toLocaleString(); // Format: "MM/DD/YYYY, HH:MM:SS AM/PM"
        timestamp.innerText = `Converted on: ${formattedTime}`;

    } catch (error) {
        document.getElementById("result").innerText = "Error fetching exchange rates";
        console.error("Error:", error);
    }
}
