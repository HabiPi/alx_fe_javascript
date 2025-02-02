// script.js
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuoteButton');
const addQuoteButton = document.getElementById('addQuoteButton');
const exportQuotesButton = document.getElementById('exportQuotesButton');
const fileInput = document.getElementById('fileInput');
const categorySelect = document.createElement('select'); // The select element for categories
categorySelect.id = 'categoryFilter'; // the ID for filtering
document.body.insertBefore(categorySelect, quoteDisplay); // Inserted before quoteDisplay

let quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
    { text: "Innovation distinguishes between a leader and a follower.", category: "Leadership" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", category: "Hope" },
    // I know I can add more quotes here
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


function populateCategories() {
    const categories = new Set(quotes.map(quote => quote.category)); // Use map and Set
    categorySelect.innerHTML = ''; // Clear existing options
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.text = 'All Categories';
    categorySelect.appendChild(allOption);
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.text = category;
        categorySelect.appendChild(option);
    });
}

function categoryFilter(category) {
    if (category === 'all') {
        showRandomQuote(); // Show a random quote from all categories
        return;
    }

    const filteredQuotes = quotes.filter(quote => quote.category === category);
    if (filteredQuotes.length === 0) {
        quoteDisplay.textContent = "No quotes in this category yet.";
    } else {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        quoteDisplay.textContent = filteredQuotes[randomIndex].text;
    }
}

categorySelect.addEventListener('change', () => {
    const selectedCategory = categorySelect.value;
    categoryFilter(selectedCategory);
});


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

//the blob is added below
exportQuotesButton.addEventListener('click', () => {
    const quotesToExport = JSON.stringify(quotes, null, 2); // Pretty print JSON

    const blob = new Blob([quotesToExport], { type: 'application/json;charset=utf-8' }); // MIME type + charset
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

function addQuote() {
    // ... (existing addQuote logic) ...

    if (newQuoteText.trim() !== "" && newQuoteCategory.trim() !== "") {
        // ... (existing quote adding logic) ...

        // Save quotes to localStorage:
        localStorage.setItem('quotes', JSON.stringify(quotes));
    } else {
        alert("Please enter both a quote and a category.");
    }
}

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith('text/')) { // Check if it is a text file.
        const reader = new FileReader(); // Using FileReader

        reader.onload = (e) => {  // Using onload
            const fileContent = e.target.result;
            console.log("File Content:", fileContent); // Log the content

            try {
                const importedQuotes = JSON.parse(fileContent);
                if (Array.isArray(importedQuotes)) { //Check if the imported file is a valid JSON of quotes
                    quotes = quotes.concat(importedQuotes); // Add imported quotes
                    localStorage.setItem('quotes', JSON.stringify(quotes)); // Save to local storage
                    showRandomQuote(); // Display a new quote
                    alert("Quotes imported successfully!");
                } else {
                    alert("Invalid JSON format. The file should contain an array of quote objects.");
                }
            } catch (error) {
                alert("Error parsing JSON. Please make sure the file contains valid JSON.");
            }

        };

        reader.readAsText(file); // Using readAsText
    } else if (file) {
        alert("Please select a valid text file.");
    }
});

function filterQuote(searchTerm) {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredQuotes = quotes.filter(quote => {
        const lowerCaseText = quote.text.toLowerCase();
        return lowerCaseText.includes(lowerCaseSearchTerm);
    });

    if (filteredQuotes.length === 0) {
        quoteDisplay.textContent = "No quotes found matching your search.";
    } else {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        quoteDisplay.textContent = filteredQuotes[randomIndex].text;
    }
}

const quoteSearch = document.getElementById('quoteSearch');

quoteSearch.addEventListener('input', () => { // Listen for input changes
    const searchTerm = quoteSearch.value;
    filterQuote(searchTerm);
});


// THE SERVER

const SERVER_URL = 'https://jsonplaceholder.typicode.com/posts'; // Or your mock API endpoint
const SYNC_INTERVAL = 5000; // 5 seconds (adjust as needed)

function fetchQuotesFromServer() {
    return fetch(SERVER_URL)
        .then(response => response.json())
        .catch(error => {
            console.error("Error fetching quotes from server:", error);
            throw error; // Re-throw the error to be caught by the caller
        });
}


async function fetchQuotesFromServer() { // async keyword added
    try {
        const response = await fetch(SERVER_URL); // await keyword added
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`); // Improved error handling
        }
        const serverQuotes = await response.json(); // await keyword added
        return serverQuotes;
    } catch (error) {
        console.error("Error fetching quotes from server:", error);
        throw error; // Re-throw the error to be caught by the caller
    }
}

async function syncWithServer() { // async keyword added
    try {
        const [serverQuotes, localQuotes] = await Promise.all([ // await keyword added
            fetchQuotesFromServer(),
            Promise.resolve(JSON.parse(localStorage.getItem('quotes')) || [])
        ]);

        // ... (rest of your syncWithServer logic - conflict resolution, merging, etc.)

    } catch (error) {
        console.error("An error occurred during synchronization:", error);
        alert("An error occurred during synchronization. Please check the console for more details.");
    }
}


function syncWithServer() {
    fetch(SERVER_URL)
        .then(response => response.json())
        .then(serverQuotes => {
            const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];

            // Simple conflict resolution: Server data takes precedence
            const mergedQuotes = serverQuotes.map(serverQuote => {
                const matchingLocalQuote = localQuotes.find(localQuote => localQuote.id === serverQuote.id);
                return matchingLocalQuote ? { ...serverQuote, ...matchingLocalQuote } : serverQuote;
            });

            // Add new local quotes not in the server
            mergedQuotes.push(...localQuotes.filter(localQuote => !mergedQuotes.find(serverQuote => serverQuote.id === localQuote.id)))

            quotes = mergedQuotes;
            localStorage.setItem('quotes', JSON.stringify(quotes));
            populateCategories();
            showRandomQuote();

            // Conflict notification (you can improve this UI-wise)
            if (serverQuotes.length !== localQuotes.length) {
                console.warn("Data synced with server. Some local changes might have been overwritten.");
                alert("Data Synced with Server. Please check the console for more information");
            }

        })
        .catch(error => {
            console.error("Error syncing with server:", error);
            alert("Error syncing with server. Please check the console for more information");
        });
}


// Add ID to quotes when adding a new quote
function addQuote() {
    // ... (other addQuote logic)
    const newQuote = {
        id: Date.now(), // Use timestamp as a simple ID
        text: newQuoteText,
        category: newQuoteCategory
    };
    quotes.push(newQuote);
    // ... (rest of addQuote logic)
}


// Initial sync and then periodic sync
window.addEventListener('DOMContentLoaded', () => {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }
    populateCategories();
    showRandomQuote();
    syncWithServer(); // Initial sync
    setInterval(syncWithServer, SYNC_INTERVAL); // Periodic sync
});


// THE POST, METHOD AND HEADERS

async function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText.trim() !== "" && newQuoteCategory.trim() !== "") {
        const newQuote = {
            id: Date.now(),
            text: newQuoteText,
            category: newQuoteCategory
        };
        quotes.push(newQuote);
        showRandomQuote();
        document.getElementById('newQuoteText').value = "";
        document.getElementById('newQuoteCategory').value = "";
        document.getElementById('newQuoteForm').style.display = "none";
        addQuoteButton.style.display = "block";

        localStorage.setItem('quotes', JSON.stringify(quotes));

        try {
            const response = await fetch(SERVER_URL, {
                method: 'POST', // Using method: POST
                headers: {
                    'Content-Type': 'application/json' // Using Content-Type header
                },
                body: JSON.stringify(newQuote) // Sending the new quote in the body
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Quote added on server:', data);

        } catch (error) {
            console.error("Error posting quote to server:", error);
            alert("Error posting quote. Please check the console for more details.");
        }

    } else {
        alert("Please enter both a quote and a category.");
    }
}
