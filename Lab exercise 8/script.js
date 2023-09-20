// Constants
const productList = document.getElementById('product-list');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const sortSelect = document.getElementById('sort-select');
let products = []; // Declare the products array in the global scope

// AJAX request to fetch products.json
function fetchProducts() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', "products.json", true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            products = JSON.parse(xhr.responseText); // Assign the fetched data to the global products variable
            displayProducts(products);
        } else {
            console.error('Failed to fetch products:', xhr.status);
        }
    };

    xhr.send();
}

// Display products dynamically
function displayProducts(products) {
    productList.innerHTML = '';

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');

        const productName = document.createElement('h2');
        productName.textContent = product.name;

        const productDescription = document.createElement('p');
        productDescription.textContent = product.description;

        const productPrice = document.createElement('p');
        productPrice.textContent = `$${product.price.toFixed(2)}`;

        const productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = product.name;

        productItem.appendChild(productImage);
        productItem.appendChild(productName);
        productItem.appendChild(productDescription);
        productItem.appendChild(productPrice);

        productList.appendChild(productItem);
    });
}

// Event listeners
searchButton.addEventListener('click', function () {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
    displayProducts(filteredProducts);
});

sortSelect.addEventListener('change', function () {
    const sortBy = sortSelect.value;
    if (sortBy === 'name') {
        products.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'price') {
        products.sort((a, b) => a.price - b.price);
    }
    displayProducts(products);
});

// Initial fetch
fetchProducts();
