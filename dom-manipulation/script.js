// script.js
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuoteButton');
const addQuoteButton = document.getElementById('addQuoteButton');
const newQuoteForm = document.getElementById('newQuoteForm');

let quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
    { text: "Innovation distinguishes between a leader and a follower.", category: "Leadership" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", category: "Hope" },
    //
];

function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteDisplay.textContent = quotes[randomIndex].text;
}

function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText.trim() !== "" && newQuoteCategory.trim() !== "") { //Prevent empty quotes
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);
        showRandomQuote(); // Display a new random quote after adding
        //Clear the form
        document.getElementById('newQuoteText').value = "";
        document.getElementById('newQuoteCategory').value = "";
        newQuoteForm.style.display = "none"; //Hide the form after adding
        addQuoteButton.style.display = "block"; // Show the add quote button again
    } else {
        alert("Please enter both a quote and a category.");
    }
}

newQuoteButton.addEventListener('click', showRandomQuote);

addQuoteButton.addEventListener('click', () => {
    newQuoteForm.style.display = "block";
    addQuoteButton.style.display = "none"; // Hide the add button while the form is displayed
});


// Initial quote display on page load
showRandomQuote();