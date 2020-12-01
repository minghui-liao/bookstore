// Book list for popular books and hotsalebooks by getting the book id.
const popularBooks = [1, 2, 3, 4, 5];
const hotsalesBooks = [7, 9, 3, 2, 6];

// Book template for landing page
// Stars from font-awesome
function bookTemplate(book) {      
    const starPercentage = book.rating * 100 / 5;
    return "<div class=\"hotsales\">" +
        "<a target=\"_blank\" href=./item.html?id=" + book.id + "> <img class=\"img\" src=" 
        + book.imageUrl + " width=\"600\" height=\"400\"></a><div class=\"desc\"><p>" 
        + book.title + "</p><p>$" 
        + book.price + "</p><div><div class=\"stars-outer\"><div class=\"stars-inner\" style=\"width:" 
        + starPercentage + "%;\"></div></div></div></div></div>"
}

window.onload = function() {
    // Show the popular books
    document.getElementById("popular").innerHTML = popularBooks.map(id => bookTemplate(allBooks[id-1])).join("");
    // Show the hotsale books
    document.getElementById("hotsales").innerHTML = hotsalesBooks.map(id => bookTemplate(allBooks[id-1])).join("");
    document.getElementById("search").onclick = search;
    
}

// Impletemente the search function for search bar
function search(event) {
    event.preventDefault();
    // Get the search query keyword
    let keyword = document.getElementById("searchBar").value.toLowerCase();
    // Set the href value to point to search reuslt page
    window.location.href = "./search.html?keyword=" + keyword;
};
