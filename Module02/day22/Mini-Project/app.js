
const API = "https://open.er-api.com/v6/latest/ETB";
const KEY = "birrwatch";

// ==========================================
// 1. STATE: Single source of truth
// ==========================================

const state = {
    base: "ETB",
    rates: {},
    watchlist: [],
    amount: 100,
    currency: "USD"
};

// ==========================================
// 2. SELECT HTML ELEMENTS
// ==========================================

const status = document.querySelector("#status");
const select = document.querySelector("#currency");
const form = document.querySelector("#convert-form");
const amount = document.querySelector("#amount");
const result = document.querySelector("#result");
const addButton = document.querySelector("#add-currency");
const watchUl = document.querySelector("#watchlist");

// ==========================================
// 3. SAVE USER PREFERENCES
// Save the watchlist and last selected currency.
// ==========================================

function save() {
    try {
        localStorage.setItem(KEY, JSON.stringify({
            watchlist: state.watchlist,
            currency: state.currency
        }));
    } catch (err) {
        status.textContent = "Could not save your preferences.";
    }
}

// ==========================================
// 4. LOAD SAVED USER PREFERENCES
// Restore choices when the page opens.
// ==========================================

function load() {
    try {
        const saved = localStorage.getItem(KEY);

        if (!saved) return;

        const data = JSON.parse(saved);

        if (Array.isArray(data.watchlist)) {
            state.watchlist = [...new Set(
                data.watchlist.filter(
                    c => typeof c === "string"
                )
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

// ==========================================
// 5. FETCH LIVE EXCHANGE RATES
// Show loading and error messages.
// ==========================================

async function loadRates() {
    status.textContent = "Loading exchange rates...";

    try {
        const res = await fetch(API);

        if (!res.ok) {
            throw new Error("HTTP " + res.status);
        }

        const data = await res.json();

        if (
            data.result !== "success" ||
            !data.rates ||
            typeof data.rates !== "object"
        ) {
            throw new Error("Invalid API response");
        }

        state.rates = data.rates;
        status.textContent = "";

        render();
    } catch (err) {
        status.textContent =
            "Could not load rates. Check your internet connection.";
    }
}

// ==========================================
// 6. RENDER THE CURRENCY DROPDOWN
// Build the options from state.rates.
// ==========================================

function render() {
    const codes = Object.keys(state.rates);

    select.innerHTML = codes
        .map(c => `<option value="${c}">${c}</option>`)
        .join("");

    if (codes.includes(state.currency)) {
        select.value = state.currency;
    } else if (codes.length > 0) {
        state.currency = codes.includes("USD")
            ? "USD"
            : codes[0];

        select.value = state.currency;
        save();
    }

    renderWatchlist();
}

// ==========================================
// 7. CONVERT ETB TO THE SELECTED CURRENCY
// Validate the amount and calculate the result.
// ==========================================

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const amt = Number(amount.value);
    const currency = select.value;

    if (
        !amount.value.trim() ||
        !Number.isFinite(amt) ||
        amt <= 0
    ) {
        result.textContent =
            "Enter a valid amount greater than zero.";
        return;
    }

    const rate = state.rates[currency];

    if (rate === undefined) {
        result.textContent =
            "The selected exchange rate is unavailable.";
        return;
    }

    state.amount = amt;
    state.currency = currency;

    const converted = (amt * rate).toFixed(2);

    result.textContent =
        `${amt} ETB = ${converted} ${currency}`;

    save();
});

// ==========================================
// 8. REMEMBER THE SELECTED CURRENCY
// ==========================================

select.addEventListener("change", function () {
    state.currency = select.value;
    save();
});

// ==========================================
// 9. RENDER THE WATCHLIST
// Display an empty-state message when needed.
// ==========================================

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
            <span>1 ETB = ${state.rates[c]} ${c}</span>
            <button type="button" class="rm">Remove</button>
        </li>
    `).join("");
}

// ==========================================
// 10. ADD CURRENCY TO THE WATCHLIST
// Do not allow duplicate currencies.
// ==========================================

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

    save();
    status.textContent = "";
    renderWatchlist();
});

// ==========================================
// 11. REMOVE CURRENCY FROM THE WATCHLIST
// Use event delegation on the <ul>.
// ==========================================

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

// ==========================================
// 12. INITIALIZE THE APPLICATION
// Load saved preferences before live rates.
// ==========================================

async function init() {
    load();
    await loadRates();
}

init();
