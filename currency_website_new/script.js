document.addEventListener("DOMContentLoaded", () => {
    populateCurrencies();
    document.getElementById("convertBtn").addEventListener("click", convertCurrency);
});

// Function for fetching currency list
async function populateCurrencies() {
    try {
        let response = await fetch("https://v6.exchangerate-api.com/v6/6341a0ddf6aee7eb055a6f43/latest/USD");
        if (!response.ok) throw new Error("Failed to fetch currency list");

        let data = await response.json();
        let currencies = Object.keys(data.conversion_rates);

        let fromCurrencyList = document.getElementById("fromCurrencyList");
        let toCurrencyList = document.getElementById("toCurrencyList");

        fromCurrencyList.innerHTML = "";
        toCurrencyList.innerHTML = "";

        currencies.forEach(currency => {
            fromCurrencyList.innerHTML += `<option value="${currency}">`;
            toCurrencyList.innerHTML += `<option value="${currency}">`;
        });

        document.getElementById("fromCurrencyInput").value = "USD";
        document.getElementById("toCurrencyInput").value = "EUR";
    } catch (error) {
        console.error("Error loading currency list:", error);
    }
}

// Function for currency conversion
async function convertCurrency() {
    try {
        let amount = document.getElementById("amount").value;
        let fromCurrency = document.getElementById("fromCurrencyInput").value.toUpperCase();
        let toCurrency = document.getElementById("toCurrencyInput").value.toUpperCase();

        if (!amount || isNaN(amount) || amount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        let response = await fetch(`https://v6.exchangerate-api.com/v6/6341a0ddf6aee7eb055a6f43/latest/${fromCurrency}`);
        if (!response.ok) throw new Error("Failed to fetch exchange rates.");

        let data = await response.json();
        let conversionRate = data.conversion_rates[toCurrency];

        if (!conversionRate) {
            alert("Invalid currency selection.");
            return;
        }

        let convertedAmount = (amount * conversionRate).toFixed(2);
        document.getElementById("result").textContent = `Converted Amount: ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        console.error("Conversion Error:", error);
        alert("Conversion failed. Please try again.");
    }
}
