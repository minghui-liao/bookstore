// Book template for search result
// Stars from font-awesome
function bookTemplate(book) {      
    const starPercentage = book.rating * 100 / 5;
    return "<div class=\"hotsales\">" +
        "<a target=\"_blank\" href=./item.html?id=" + book.id 
        + "><img class=\"img\" src=" + book.imageUrl 
        + " width=\"600\" height=\"400\"></a><div class=\"desc\"><p>" 
        + book.title + "</p><p>$" + book.price 
        + "</p><div><div class=\"stars-outer\"><div class=\"stars-inner\" style=\"width:" 
        + starPercentage + "%;\"></div></div></div></div></div>"
}

// Initialize the books being searched
let books = [];

// Initialize the filtered books
let filteredBooks = books;

// Initialze the keyword and Filter variables
let keyword = "";
let priceFilter = {};
let ratingFilter = 0;
let sortOrder = 0;

window.onload = function() {
    // Initialize the books being searched
    books = [];

    // Initialize the filtered books
    filteredBooks = books;

    // Initialze the keyword and Filter variables
    keyword = "";
    priceFilter = {};
    ratingFilter = 0;
    sortOrder = 0;

    // Pass the search bar function
    document.getElementById("search").onclick = search;

    // Get the query string from URL
    let queryStr = window.location.search;
    // Store the parameters in a URLSearchParams Object
    let params = new URLSearchParams(queryStr);
    // Get keyword from URL parameters
    keyword = params.get("keyword");
    console.log(keyword);

    // If keyword is empty, return to home page. 
    if (!keyword || keyword == "") {
        window.location.href = "./Honbookstore.html";
        return;
    }

    // Show the books including the keyword
    // if (keyword) {
    //     books = allBooks.filter(book => book.title.toLowerCase().includes(keyword.toLowerCase()));
    //     filteredBooks = books;
    // }
    
    var http = new XMLHttpRequest();
    http.open('GET', 'searchbar.php?keyword=' + keyword)
    http.onreadystatechange = function() {
        console.log(this.readyState)
        console.log(this.status)
        //console.log(this.response)
        console.log(this.responseText)
        if(this.readyState == 4 && this.status == 200) {
            books = JSON.parse(this.response);
            filteredBooks = books;
            console.log(books);
            displayBooks(books);
        } else {
            books = [];
        }
    };
    http.send();
}

// Sorting the books
function sortFunc() {
    let selectBox = document.getElementById("sort");
    // Get sorting option. 1 is for low to high. 2 is for high to low. 0 is for default
    sortOrder = selectBox.options[selectBox.selectedIndex].value;

    displayBooks(filteredBooks);
}

// Display the books
function displayBooks(books) {
    if (sortOrder == 1) {
        // Sorting the books by price from lowest to highest
        books.sort((book1, book2) => book1.price - book2.price);
    } else if (sortOrder == 2) {
        // Sorting the books by price from highest to lowest
        books.sort((book1, book2) => book2.price - book1.price);
    }

    // Show the search query keyword on web page
    if (keyword) {
        document.getElementById("searchInfo").innerHTML = "You are searchching: " + keyword;
    } 

    // Reset the searbar
    document.getElementById("searchBar").innerHTML = "";

    // Display the books by applying bookTemplate to every books
    document.getElementById("displayResult").innerHTML = books.map(bookTemplate).join("");
}

// Get filter condition of price from HTML
function priceFunc(filter) {
    priceFilter = filter;
    filteredBooks = applyFilter(books);
    displayBooks(filteredBooks);
}

// Get filter condition of rating from HTML
function ratingFunc(filter) {
    ratingFilter = filter;
    filteredBooks = applyFilter(books);
    displayBooks(filteredBooks);
}

// Filter the books
function applyFilter(books) {
    return books.filter(book => {
        // Filter out the books with rating lower than rating range
        if (book.rating < ratingFilter) {
            return false;
        }

        // Filter out books with price lower than price range 
        if (priceFilter.low && book.price < priceFilter.low) {
            return false;
        }
        // Filter out books with price higher than price range 
        if (priceFilter.high && book.price > priceFilter.high) {
            return false;
        }

        return true;
    });
}

// Search the books
function search(event) {
    event.preventDefault();
    // Get keyword from search bar
    keyword = document.getElementById("searchBar").value.toLowerCase();
    // Set the href value to point to search reuslt page 
    window.location.href = "./search.html?keyword=" + keyword;
};