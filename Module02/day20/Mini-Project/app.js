const out = document.querySelector("#facts");
const form = document.querySelector("#search-form");
const input = document.querySelector("#country-input");

function render(container, label, value) {
    const div = document.createElement("div");
    div.className = "fact";

    const strong = document.createElement("strong");
    strong.textContent = `${label}:`;

    const span = document.createElement("span");
    span.textContent = value;

    div.appendChild(strong);
    div.appendChild(span);

    container.appendChild(div);
}

async function showCountry(name) {
    out.textContent = "Loading...";

    try {
        const res = await fetch(
            `https://restcountries.com/v3.1/name/${name}`
        );

        if (!res.ok) {
            throw new Error("Country not found");
        }

        const [country] = await res.json();

        out.innerHTML = "";

        render(out, "Capital", country.capital?.[0] || "N/A");
        render(
            out,
            "Population",
            country.population.toLocaleString()
        );
        render(out, "Region", country.region || "N/A");

        const currencies = country.currencies
            ? Object.entries(country.currencies)
                .map(([code, currency]) => `${currency.name} (${code})`)
                .join(", ")
            : "N/A";

        render(out, "Currencies", currencies);

        const flag = document.createElement("img");
        flag.src = country.flags.svg;
        flag.alt = `${country.name.common} flag`;
        flag.width = 150;

        out.appendChild(flag);

    } catch (err) {
        out.textContent = err.message;
    }
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const country = input.value.trim();

    if (country === "") {
        out.textContent = "Please enter a country name.";
        return;
    }

    showCountry(country);
});

showCountry("Ethiopia");