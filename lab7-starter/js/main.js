// Lab 7: Campus Cafe page (index.html). Test after each step.
// If you use an AI tool, describe how you used it in a comment here.

// PART B: CHANGE THE PAGE
// - Set the h1 (#pageTitle) text to a title of your choice.
const heading = document.querySelector("#pageTitle");
heading.textContent = "Campus Cafe Menu";

// - Hide note button (#noteBtn): toggle the class d-none on #note,
//   change the button text between "Hide note" and "Show note",
//   and update aria-expanded.
const noteBtn = document.querySelector("#noteBtn");
const note = document.querySelector("#note");
noteBtn.addEventListener("click", () => {
    const isHidden = note.classList.toggle("d-none");
    noteBtn.textContent = isHidden ? "Show note" : "Hide note";
    noteBtn.setAttribute("aria-expanded", !isHidden);
});

// - Dark mode button (#themeBtn): switch data-bs-theme on <html>
//   between "light" and "dark", change its text, and update aria-pressed.
const themeBtn = document.querySelector("#themeBtn");
themeBtn.addEventListener("click", () => {
    const root = document.documentElement;
    const goDark = root.getAttribute("data-bs-theme") !== "dark";
    root.setAttribute("data-bs-theme", goDark ? "dark" : "light");
    themeBtn.textContent = goDark ? "Light mode" : "Dark mode";
    themeBtn.setAttribute("aria-pressed", goDark);
});

// PART C: CARDS FROM THE ARRAY
// - priceLabel(price): "Free" if 0, "Under $5" if less than 5, else "$" + price.
function priceLabel(price) {
    if (price === 0) {
        return "Free";
    } else if (price < 5) {
        return "Under $5";
    }
    return "$" + price;
}

// - cardHTML(item): returns the HTML for one card
//   (col-12 md:col-6 lg:col-4, card h-100, card-body).
//   It shows title, category, priceLabel(price) and a Save button with
//   class "save-btn", a data-id, and aria-pressed="false".
function cardHTML(item) {
    return `<div class="col-12 md:col-6 lg:col-4">
        <div class="card h-100">
            <div class="card-body">
                <h3 class="card-title">${item.title}</h3>
                <p>${item.category} · ${priceLabel(item.price)}</p>
                <button type="button" class="btn-solid theme-primary save-btn"
                    data-id="${item.id}" aria-pressed="false">Save</button>
            </div>
        </div>
    </div>`;
}

// - Draw the cards into #tourList with map and join.
const tourList = document.querySelector("#tourList");
tourList.innerHTML = items.map(cardHTML).join("");

// - Save buttons toggle is-saved, the text Save / Saved and aria-pressed.
//   #savedCount always shows how many items are saved.
const savedCount = document.querySelector("#savedCount");
let saved = 0;

tourList.addEventListener("click", event => {
    const btn = event.target.closest(".save-btn");
    if (!btn) return;

    const isSaved = btn.classList.toggle("is-saved");
    btn.textContent = isSaved ? "Saved" : "Save";
    btn.setAttribute("aria-pressed", isSaved);

    saved = isSaved ? saved + 1 : saved - 1;
    savedCount.textContent = saved;
});

// PART D: FILTER AND SEARCH
// - Two state variables: activeCategory and query.
let activeCategory = "All";
let query = "";

// - One update() function: filter the items, draw them, update #count.
function update() {
    const shown = items.filter(item =>
        (activeCategory === "All" || item.category === activeCategory)
        && item.title.toLowerCase().includes(query));
    tourList.innerHTML = shown.map(cardHTML).join("");
}

// - Category buttons (.filter-btn) set activeCategory, move is-active and aria-pressed.
const filterBtns = document.querySelectorAll(".filter-btn");
for (const btn of filterBtns) {
    btn.addEventListener("click", () => {
        activeCategory = btn.getAttribute("data-category");
        for (const filterBtn of filterBtns) {
            filterBtn.classList.remove("is-active");
            filterBtn.setAttribute("aria-pressed", false);
        }
        btn.classList.add("is-active");
        btn.setAttribute("aria-pressed", true);
        update();
    });
}

// - #searchBox (input event) sets query. Ignore capital letters.

// - #count shows "Showing 3 of 8 items". If nothing matches, show a message.
