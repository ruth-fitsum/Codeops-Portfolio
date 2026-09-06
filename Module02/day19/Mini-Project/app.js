// ========================================
// CACHE ELEMENTS
// ========================================

const form = document.querySelector("#add-form");
const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const list = document.querySelector("#list");
const totalEl = document.querySelector("#total");


// ========================================
// DATA
// ========================================

const items = [];


// ========================================
// ADD ITEM TO THE LIST
// ========================================

function addRow(name, price) {

    // Create the <li>
    const li = document.createElement("li");


    // Create container for item information
    const itemInfo = document.createElement("div");

    itemInfo.classList.add("item-info");


    // Create item name
    const itemName = document.createElement("span");

    itemName.classList.add("item-name");

    itemName.textContent = name;


    // Create item price
    const itemPrice = document.createElement("span");

    itemPrice.classList.add("item-price");

    itemPrice.textContent = `${price.toFixed(2)} ETB`;


    // Add name and price to item info
    itemInfo.append(itemName, itemPrice);


    // Create delete button
    const deleteButton = document.createElement("button");

    deleteButton.classList.add("del");

    deleteButton.textContent = "Delete";


    // Add everything to the <li>
    li.append(itemInfo, deleteButton);


    // Add <li> to the shopping list
    list.append(li);
}


// ========================================
// UPDATE TOTAL
// ========================================

function updateTotal() {

    let total = 0;

    // Go through every item currently in the list
    items.forEach((item) => {
        total += item.price;
    });

    // Display total
    totalEl.textContent = total.toFixed(2);
}


// ========================================
// FORM SUBMIT
// ========================================

form.addEventListener("submit", (e) => {

    // Stop the browser from reloading
    e.preventDefault();


    // Read the input values
    const name = nameInput.value.trim();
    const price = Number(priceInput.value);


    // Basic validation
    if (!name || !price || price <= 0) {
        return;
    }


    // Add item to the data array
    items.push({
        name: name,
        price: price
    });


    // Create and display the row
    addRow(name, price);


    // Update total
    updateTotal();


    // Clear the form
    form.reset();
});


// ========================================
// EVENT DELEGATION
// ========================================

list.addEventListener("click", (e) => {

    // Find the row that was clicked
    const li = e.target.closest("li");

    // If there is no <li>, stop
    if (!li) {
        return;
    }


    // ====================================
    // DELETE
    // ====================================

    if (e.target.matches(".del")) {

        // Find the position of this row
        const rows = [...list.children];

        const index = rows.indexOf(li);

        // Remove item from the data array
        items.splice(index, 1);

        // Remove row from the DOM
        li.remove();

        // Update total
        updateTotal();

        return;
    }


    // ====================================
    // BOUGHT
    // ====================================

    li.classList.toggle("bought");
});