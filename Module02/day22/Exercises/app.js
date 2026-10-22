
const API = "https://open.er-api.com/v6/latest/ETB";
const KEY = "birrwatch";

// ==================================================
// QUESTION 1
// Scaffold index.html and declare the state object.
// HTML containers are in index.html.
// ==================================================

const state = {
    base: "ETB",
    rates: {},
    watchlist: [],
    amount: 100,
    currency: "USD"
};

// Select HTML elements
const status = document.querySelector("#status");
const select = document.querySelector("#currency");
const form = document.querySelector("#convert-form");
const amount = document.querySelector("#amount");
const result = document.querySelector("#result");
const addButton = document.querySelector("#add-currency");
const watchUl = document.querySelector("#watchlist");


// ==================================================
// QUESTION 2
// Write render() using fake hard-coded rates.
// Test this before using the API.
// ==================================================

// Uncomment these lines to test Question 2:
// state.rates = { USD: 0.0177, KES: 2.29 };
// render();


// ==================================================
// QUESTION 3
// Fetch live rates, check res.ok, store data.rates
// in state, and handle loading and error messages.
// ==================================================

async function loadRates() {
    status.textContent = "Loading rates...";

    try {
        const res = await fetch(API);

        if (!res.ok) {
            throw new Error("HTTP " + res.status);
        }

        const data = await res.json();

        if (data.result !== "success" || !data.rates) {
            throw new Error("Invalid API response");
        }

        state.rates = data.rates;
        status.textContent = "";

        render();

    } catch (err) {
        status.textContent = "Could not load rates.";
    }
}


// ==================================================
// QUESTION 2: RENDER FUNCTION
// Populate the currency dropdown from state.rates.
// Also used by the live API in Question 3.
// ==================================================

function render() {
    const codes = Object.keys(state.rates);

    select.innerHTML = codes
        .map(c => `<option value="${c}">${c}</option>`)
        .join("");

    if (codes.includes(state.currency)) {
        select.value = state.currency;
    } else if (codes.length > 0) {
        state.currency = codes.includes("USD") ? "USD" : codes[0];
        select.value = state.currency;
    }

    renderWatchlist();
}


// ==================================================
// QUESTION 4
// Handle form submission, prevent page reload,
// validate the amount, calculate conversion,
// and display the result.
// ==================================================

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const amt = Number(amount.value);
    const currency = select.value;

    if (
        !amount.value.trim() ||
        !Number.isFinite(amt) ||
        amt <= 0
    ) {
        result.textContent = "Enter a valid amount.";
        return;
    }

    const rate = state.rates[currency];

    if (rate === undefined) {
        result.textContent = "Exchange rate is unavailable.";
        return;
    }

    state.amount = amt;
    state.currency = currency;

    const converted = (amt * rate).toFixed(2);

    result.textContent =
        `${amt} ETB = ${converted} ${currency}`;
});


// ==================================================
// QUESTION 5
// Add currencies to the watchlist.
// Prevent duplicates and render the list from state.
// ==================================================

function renderWatchlist() {
    const currencies = state.watchlist.filter(
        c => state.rates[c] !== undefined
    );

    if (currencies.length === 0) {
        watchUl.innerHTML = "<li>No currencies yet</li>";
        return;
    }

    watchUl.innerHTML = currencies.map(c => `
        <li data-c="${c}">
            1 ETB = ${state.rates[c]} ${c}
            <button type="button" class="rm">Remove</button>
        </li>
    `).join("");
}

addButton.addEventListener("click", function () {
    const currency = select.value;

    if (!currency) {
        status.textContent = "Wait for rates to load.";
        return;
    }

    if (state.watchlist.includes(currency)) {
        status.textContent =
            `${currency} is already in your watchlist.`;
        return;
    }

    state.watchlist.push(currency);

    status.textContent = "";
    save();
    renderWatchlist();
});

// Remove a currency using one delegated click listener
watchUl.addEventListener("click", function (e) {
    if (!e.target.matches(".rm")) {
        return;
    }

    const currency = e.target.closest("li").dataset.c;

    state.watchlist = state.watchlist.filter(
        c => c !== currency
    );

    save();
    renderWatchlist();
});


// ==================================================
// QUESTION 6
// Save and load the watchlist and last currency
// with localStorage. Restore them during init().
// ==================================================

function save() {
    localStorage.setItem(KEY, JSON.stringify({
        watchlist: state.watchlist,
        currency: state.currency
    }));
}

function load() {
    try {
        const saved = localStorage.getItem(KEY);

        if (!saved) return;

        const data = JSON.parse(saved);

        if (Array.isArray(data.watchlist)) {
            state.watchlist = [...new Set(
                data.watchlist.filter(c => typeof c === "string")
            )];
        }

        if (typeof data.currency === "string") {
            state.currency = data.currency;
        }

    } catch (err) {
        state.watchlist = [];
        state.currency = "USD";
    }
}

// Save the most recently selected currency
select.addEventListener("change", function () {
    state.currency = select.value;
    save();
});


// ==================================================
// INITIALIZATION
// Load saved choices first, then fetch live rates.
// ==================================================

async function init() {
    load();
    await loadRates();
}

init();
