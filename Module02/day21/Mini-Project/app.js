const PHONE = /^(?:\+251|0)9\d{8}$/;

const form = document.getElementById("signupForm");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const error = document.getElementById("error");
const entriesList = document.getElementById("entries");

const STORAGE_KEY = "signupEntries";


function validate(name, phone) {
    if (name.trim().length < 2) {
        return "Enter your full name.";
    }

    if (!PHONE.test(phone)) {
        return "Enter a valid Ethiopian phone number.";
    }

    return "";
}


function loadEntries() {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved === null) {
        return [];
    }

    try {
        const entries = JSON.parse(saved);

        if (!Array.isArray(entries)) {
            return [];
        }

        return entries;
    } catch (error) {
        return [];
    }
}


function saveEntries(entries) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}


function displayEntries(entries) {
    entriesList.textContent = "";

    entries.forEach((entry) => {
        const li = document.createElement("li");

        li.textContent = `${entry.name} - ${entry.phone}`;

        entriesList.appendChild(li);
    });
}


form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    const message = validate(name, phone);

    error.textContent = message;

    if (message !== "") {
        return;
    }

    const entries = loadEntries();

    entries.push({
        name: name,
        phone: phone
    });

    saveEntries(entries);
    displayEntries(entries);

    form.reset();
    error.textContent = "Signup successful.";
});


const entries = loadEntries();
displayEntries(entries);