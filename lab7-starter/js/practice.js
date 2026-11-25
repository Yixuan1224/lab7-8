// PART A: warm-up page (practice.html). Write your five tasks below the helper.

const results = document.querySelector("#results");

// Helper (provided): writes one line into the page.
function show(text) {
  const li = document.createElement("li");
  li.textContent = text;
  results.appendChild(li);
}

// Example of using it (you can delete this line):
show("Warm-up page is working");

// Task 1: Variables
const name = "Yixuan";
const city = "Toronto";
let visits = 0;
visits = visits + 1;
show(`Hello, ${name} from ${city}. Visits: ${visits}.`);

// Task 2: Function and if (ticketLabel)
function ticketLabel(age) {
    if (age < 12) {
        return "Child";
    } else if (age < 65) {
        return "Adult";
    }
    return "Senior";
}
show(ticketLabel(8));
show(ticketLabel(30));
show(ticketLabel(70));

// Task 3: Array of places
const places = ["Toronto", "Quebec City", "Vancouver", "Montreal", "Ottawa"];
show(`Number of places: ${places.length}`);
show(`Last place: ${places[4]}`);
for (const place of places) {
    show(place);
}

// Task 4: Array of objects
const items = [
    { title: "Latte", category: "Drinks", price: 5 },
    { title: "Americano", category: "Drinks", price: 4 },
    { title: "Cheesecake", category: "Snacks", price: 6 },
    { title: "Sandwich", category: "Meals", price: 8 }
];
for (const item of items) {
    show(`${item.title}: $${item.price}`);
}
  
// Task 5: Function with a loop (totalPrice)
function totalPrice(items) {
    let total = 0;
    for (const item of items) {
        total = total + item.price;
    }
    return total;
}
show(`Total price: $${totalPrice(items)}`);