// script.js
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuoteButton');
const addQuoteButton = document.getElementById('addQuoteButton');

let quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
    { text: "Innovation distinguishes between a leader and a follower.", category: "Leadership" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", category: "Hope" },
    // Add more initial quotes here
];

function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteDisplay.innerHTML = quotes[randomIndex].text; 
    // We should rather Use textContent for security purposes
}

function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText.trim() !== "" && newQuoteCategory.trim() !== "") {
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);
        showRandomQuote();
        document.getElementById('newQuoteText').value = ""; // Clear input fields
        document.getElementById('newQuoteCategory').value = "";
        document.getElementById('newQuoteForm').style.display = "none"; // Hide form
        addQuoteButton.style.display = "block"; // Show "Add Quote" button
    } else {
        alert("Please enter both a quote and a category.");
    }
}

function createAddQuoteForm() {
    const formDiv = document.createElement('div');
    formDiv.id = 'newQuoteForm';
    formDiv.style.display = 'none';

    const textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.id = 'newQuoteText';
    textInput.placeholder = 'Enter a new quote';

    const categoryInput = document.createElement('input');
    categoryInput.type = 'text';
    categoryInput.id = 'newQuoteCategory';
    categoryInput.placeholder = 'Enter quote category';

    const addButton = document.createElement('button');
    addButton.textContent = 'Add Quote';
    addButton.onclick = addQuote;

    formDiv.appendChild(textInput);
    formDiv.appendChild(categoryInput);
    formDiv.appendChild(addButton);

    document.body.appendChild(formDiv);
    return formDiv;
}


newQuoteButton.addEventListener('click', showRandomQuote);

addQuoteButton.addEventListener('click', () => {
    let form = document.getElementById('newQuoteForm');
    if (!form) {
        form = createAddQuoteForm();
    }
    form.style.display = "block";
    addQuoteButton.style.display = "none";
});

showRandomQuote(); // Display initial quote



// Load quotes from localStorage when the script loads


window.addEventListener('DOMContentLoaded', () => {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }
    showRandomQuote(); // Show initial quote after loading
});


function addQuote() {
    // ... (existing addQuote logic) ...

    if (newQuoteText.trim() !== "" && newQuoteCategory.trim() !== "") {
        // ... (existing quote adding logic) ...

        // Save quotes to localStorage:
        localStorage.setItem('quotes', JSON.stringify(quotes));

        // ... (rest of the existing addQuote logic) ...
    } else {
      //...
    }
}