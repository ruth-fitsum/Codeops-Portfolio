// ========================================
// 1. Change h1 text + toggle CSS class
// ========================================

const title = document.querySelector("#title");

title.textContent = "Welcome to Day 19!";
title.classList.toggle("highlight");


// ========================================
// 2. Create <li> for three Ethiopian cities
// ========================================

const cities = ["Addis Ababa", "Hawassa", "Jimma"];

const cityList = document.querySelector("#city-list");

cities.forEach((city) => {
    const li = document.createElement("li");

    li.textContent = city;

    cityList.append(li);
});


// ========================================
// 3. Click event + event bubbling
// ========================================

const button = document.querySelector("#click-btn");
const eventBox = document.querySelector("#event-box");

// Listener on the button
button.addEventListener("click", (e) => {
    console.log("Button listener:");
    console.log(e.target);
});

// Listener on the parent div
eventBox.addEventListener("click", (e) => {
    console.log("Div listener:");
    console.log(e.target);
});


// ========================================
// 4. Delete items using event delegation
// ========================================

const itemList = document.querySelector("#item-list");

itemList.addEventListener("click", (e) => {

    // Find the closest <button>
    const deleteButton = e.target.closest(".delete-btn");

    // If the click wasn't on a delete button, stop
    if (!deleteButton) return;

    // Find the <li> containing the button
    const li = deleteButton.closest("li");

    // Get the ID from data-id
    const id = li.dataset.id;

    console.log("Deleting item:", id);

    // Remove the <li>
    li.remove();
});


// ========================================
// 5. Form submit
// ========================================

const form = document.querySelector("#add-form");
const itemInput = document.querySelector("#item-input");
const addedList = document.querySelector("#added-list");

form.addEventListener("submit", (e) => {

    // Stop the browser from reloading the page
    e.preventDefault();

    // Get the value typed by the user
    const item = itemInput.value.trim();

    // Don't add an empty item
    if (!item) return;

    // Create a new <li>
    const li = document.createElement("li");

    // Put the input text inside the <li>
    li.textContent = item;

    // Add the new item to the list
    addedList.append(li);

    // Clear the input field
    form.reset();
});