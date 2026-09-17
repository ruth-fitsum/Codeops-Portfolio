
const themeSelect = document.querySelector("#theme");

// Restore the saved theme when the page loads
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
    themeSelect.value = savedTheme;
    document.body.className = savedTheme;
}

// Save the theme when the user changes it
themeSelect.addEventListener("change", () => {
    const theme = themeSelect.value;

    localStorage.setItem("theme", theme);
    document.body.className = theme;
});

// 2

function save(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}

function load(key) {
    const saved = localStorage.getItem(key);

    // Nothing has been saved yet
    if (saved === null) {
        return [];
    }

    try {
        return JSON.parse(saved);
    } catch (error) {
        // Stored data is invalid JSON
        return [];
    }
}

// 3
// on the html

// 4


const form = document.querySelector("#signup-form");
const nameInput = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");

const errorMsg = document.querySelector("#error");
const successMsg = document.querySelector("#success");
const countMsg = document.querySelector("#count");

const PHONE = /^(?:\+251|0)9\d{8}$/;

function validate({ name, phone }) {
    if (!name) {
        return "Please enter your name.";
    }

    if (name.length < 2) {
        return "Name must be at least 2 characters.";
    }

    if (!phone) {
        return "Please enter your phone number.";
    }

    if (!PHONE.test(phone)) {
        return "Enter a valid Ethiopian phone number.";
    }

    return "";
}

// 5

function showError(text) {
    errorMsg.textContent = text;
}

// 6

let signups = load("signups");

// Show the saved count when the page loads
function updateCount() {
    countMsg.textContent = `People signed up: ${signups.length}`;
}

updateCount();

// Handle form submission
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    const error = validate({ name, phone });

    if (error) {
        showError(error);
        successMsg.textContent = "";
        return;
    }

    // Create a new signup object
    const person = { name, phone };

    // Add it to the array
    signups.push(person);

    // Save the updated array
    save("signups", signups);

    // Clear the form and messages
    form.reset();
    errorMsg.textContent = "";
    successMsg.textContent = "Signup successful!";

    // Update the count
    updateCount();
});