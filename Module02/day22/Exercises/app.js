
const state = {
    rates: {},
    watchlist: []
};

const statusElement = document.querySelector("#status");
const convertForm = document.querySelector("#convert-form");
const amountInput = document.querySelector("#amount");
const currencySelect = document.querySelector("#currency");
const resultElement = document.querySelector("#result");
const addWatchlistButton = document.querySelector("#add-watchlist");
const watchlistElement = document.querySelector("#watchlist");

const API_URL = "https://open.er-api.com/v6/latest/ETB";
const STORAGE_KEY = "currency-watchlist";

// Populate the currency dropdown from state.
function render() {
    const previousCurrency = currencySelect.value;
    currencySelect.replaceChildren();

    const currencies = Object.keys(state.rates).sort();

    for (const currency of currencies) {
        const option = document.createElement("option");

        option.value = currency;
        option.textContent = currency;

        currencySelect.appendChild(option);
    }

    if (currencies.includes(previousCurrency)) {
        currencySelect.value = previousCurrency;
    }
}

// Fetch live exchange rates.
async function loadRates() {
    statusElement.textContent = "Loading exchange rates...";

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Unable to fetch exchange rates.");
        }

        const data = await response.json();

        if (
            data.result !== "success" ||
            !data.rates ||
            typeof data.rates !== "object"
        ) {
            throw new Error("Invalid exchange-rate data.");
        }

        state.rates = data.rates;

        render();
        renderWatchlist();

        statusElement.textContent =
            `Exchange rates loaded. Base currency: ${data.base_code}.`;

    } catch (error) {
        statusElement.textContent =
            "Could not load exchange rates. Check your connection and try again.";

        console.error("Rate loading error:", error);
    }
}

// Convert ETB into the selected currency.
convertForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const amount = Number(amountInput.value);
    const currency = currencySelect.value;
    const rate = state.rates[currency];

    if (
        amountInput.value.trim() === "" ||
        !Number.isFinite(amount) ||
        amount <= 0
    ) {
        resultElement.textContent =
            "Enter a valid amount greater than zero.";
        return;
    }

    if (rate === undefined || !Number.isFinite(rate)) {
        resultElement.textContent =
            "The exchange rate is unavailable.";
        return;
    }

    const convertedAmount = amount * rate;

    resultElement.textContent =
        `${amount.toLocaleString()} ETB = ` +
        `${convertedAmount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })} ${currency}`;
});

// Render the saved currencies.
function renderWatchlist() {
    watchlistElement.replaceChildren();

    for (const currency of state.watchlist) {
        const item = document.createElement("li");
        const label = document.createElement("span");
        const removeButton = document.createElement("button");

        label.textContent = currency;

        removeButton.type = "button";
        removeButton.textContent = "Remove";
        removeButton.dataset.c = currency;
        removeButton.setAttribute(
            "aria-label",
            `Remove ${currency} from watchlist`
        );

        item.append(label, removeButton);
        watchlistElement.appendChild(item);
    }
}

// Add the selected currency without duplicates.
addWatchlistButton.addEventListener("click", function () {
    const currency = currencySelect.value;

    if (!currency || !(currency in state.rates)) {
        statusElement.textContent =
            "Select a valid currency first.";
        return;
    }

    if (state.watchlist.includes(currency)) {
        statusElement.textContent =
            `${currency} is already in your watchlist.`;
        return;
    }

    state.watchlist.push(currency);

    save();
    renderWatchlist();

    statusElement.textContent =
        `${currency} added to your watchlist.`;
});

// One delegated listener handles every Remove button.
watchlistElement.addEventListener("click", function (event) {
    const button = event.target.closest("button[data-c]");

    if (!button || !watchlistElement.contains(button)) {
        return;
    }

    const currency = button.dataset.c;

    state.watchlist = state.watchlist.filter(
        item => item !== currency
    );

    save();
    renderWatchlist();

    statusElement.textContent =
        `${currency} removed from your watchlist.`;
});

// Save the watchlist to browser storage.
function save() {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(state.watchlist)
        );
    } catch (error) {
        console.error("Could not save watchlist:", error);
        statusElement.textContent =
            "Could not save your watchlist in this browser.";
    }
}

// Restore the watchlist when the app starts.
function load() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved === null) {
            return;
        }

        const parsed = JSON.parse(saved);

        if (!Array.isArray(parsed)) {
            return;
        }

        state.watchlist = [
            ...new Set(
                parsed.filter(currency =>
                    typeof currency === "string" &&
                    /^[A-Z]{3}$/.test(currency)
                )
            )
        ];
    } catch (error) {
        state.watchlist = [];
        console.error("Could not load watchlist:", error);
    }
}

// Initialize the application.
async function init() {
    load();
    render();
    renderWatchlist();

    await loadRates();
}

init();
