let valueCount = 1;
// taking price value in variable
let unitPrice = 0;
let totalPrice = 0;

function over(element) {
  element.style.color = "red";
}
function out(element) {
  element.style.color = "white";
}

window.onload = function () {
  // Get product id 
  let queryStr = window.location.search;
  let params = new URLSearchParams(queryStr);
  let id = params.get("id");

  // Ensure product id is not empty or exist overall product number
  if (!id || id > allBooks.length) {
    return;
  }

  book = allBooks[id - 1];
  console.log(book);

  unitPrice = totalPrice = book.price;
  valueCount = 1;
  let starPercentage = book.rating * 100 / 5;

  document.querySelector('#title').innerHTML = book.title;
  document.querySelector('#u-price').innerHTML = unitPrice;
  document.querySelector('#t-price').innerHTML = totalPrice;
  document.querySelector('#image').src = book.imageUrl;
  document.querySelector('#slide1').src = book.slide1;
  document.querySelector('#slide2').src = book.slide2;
  document.querySelector('#description').innerHTML = book.description;
  // Show ratings
  // Stars from font-awesome
  document.querySelector('#rating').innerHTML
    = "<div class=\"stars-outer\"><div class=\"stars-inner\" style=\"width:" + starPercentage + "%;\"></div></div>";

  // setting defult attribute to disabled of minus button
  document.querySelector(".minus-btn").setAttribute("disabled", "disabled");
  document.querySelector(".plus-btn").addEventListener("click", plusFunc);
  document.querySelector(".minus-btn").addEventListener("click", minusFunc);
}

// price calculation function
function priceTotal() {
  totalPrice = valueCount * unitPrice;
  document.getElementById("t-price").innerText = totalPrice.toFixed(2);
}

// taking value to increment decrement botton
// plus button
function plusFunc() {
  // input value increment by 1
  valueCount++;
  // setting increment input value
  document.getElementById("quantity").value = valueCount;
  if (valueCount > 1) {
    document.querySelector(".minus-btn").removeAttribute("disabled")
    document.querySelector(".minus-btn").classList.remove("disabled")
  }
  //calling price function
  priceTotal();
}

// minus button
function minusFunc() {
  // input value increment by 1
  valueCount--;
  // setting increment input value
  document.getElementById("quantity").value = valueCount;
  if (valueCount == 1) {
    document.querySelector(".minus-btn").setAttribute("disabled", "disabled")
  }
  //calling price function
  priceTotal();
}

function searchFunc(event) {
  event.preventDefault();
  // Get the search query keyword
  let keyword = document.getElementById("searchBar").value;
  console.log(keyword);

  // Redirect to the search result page
  window.location.href = "./search.html?keyword=" + keyword;
};