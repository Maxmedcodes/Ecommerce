// Keep your original arrays of element IDs
const allAddButtons = ["laptop-add1","laptop-add2","laptop-add3","laptop-add4","laptop-add5","laptop-add6"];
const allRemoveButtons = ["laptop-remove1","laptop-remove2","laptop-remove3","laptop-remove4","laptop-remove5","laptop-remove6"];
const allLaptopInput = ["laptop-number1","laptop-number2","laptop-number3","laptop-number4","laptop-number5","laptop-number6"];
const allCartItems = ["cart-item1","cart-item2","cart-item3","cart-item4","cart-item5","cart-item6"];
const allItemPrices = ["item-price1","item-price2","item-price3","item-price4","item-price5","item-price6"];
const allProductNames = ["product-name1","product-name2","product-name3","product-name4","product-name5","product-name6"];
const itemImages = ["item-img1","item-img2","item-img3","item-img4","item-img5","item-img6"];

// Helper function to extract filename from URL
function geturl(url){
    return url.split("/").pop();
}

// UI elements event handling - things like hamburger menu, navigation, etc.
function setupUIElements() {
    const hamburger = document.getElementById("hamburger-menu");
    const navMenu = document.querySelector(".hero-navigation");
    const hero = document.getElementById("hero");
    const laptop = document.querySelector(".laptop-hero");
    
    if (hamburger) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
            if (laptop){
                laptop.classList.toggle("active");
            }
            if (hero){
                hero.classList.toggle("active");
            }
        });
    }

    // Date/copyright
    const timeElement = document.getElementById("time-copyright");
    if (timeElement) {
        timeElement.innerHTML = "Copyright " + new Date().getFullYear();
    }

    // Navigation buttons
    const account_icon = document.getElementById("user-account");
    const checkout_icon = document.getElementById("checkout-cart");
    
    if (account_icon){
        account_icon.addEventListener("click", () => {
            window.location.href="/index.html";
        });
    }
    
    if(checkout_icon){
        checkout_icon.addEventListener("click", () => {
            window.location.href="/cart.html";
        });
    }
    
    // Category navigation buttons
    const buttonIDS = ["browse-laptop","browse-tablets","browse-gaming","browse-mischellanous","browse-furniture"];
    
    buttonIDS.forEach(id => {
        const button = document.getElementById(id);
        if(button){
            button.addEventListener("click", () => {
                const page = id.replace("browse-", '');
                document.location.href = `${page}.html`;
            });
        }
    });
}

// Function to set up cart functionality for products
function setupCartFunctionality() {
    // Use event delegation for quantity buttons and add to cart
    const productContainer = document.getElementById("product-items");
    
    if (productContainer) {
        productContainer.addEventListener("click", (event) => {
            const target = event.target;
            
            // Handle Add button clicks
            if (target.id && target.id.startsWith("laptop-add")) {
                const index = target.id.replace("laptop-add", "");
                const inputField = document.getElementById(`laptop-number${index}`);
                if (inputField) {
                    let quantity = parseInt(inputField.value) || 0;
                    quantity++;
                    inputField.value = quantity;
                }
            }
            
            // Handle Remove button clicks
            else if (target.id && target.id.startsWith("laptop-remove")) {
                const index = target.id.replace("laptop-remove", "");
                const inputField = document.getElementById(`laptop-number${index}`);
                if (inputField) {
                    let quantity = parseInt(inputField.value) || 0;
                    if (quantity > 0) {
                        quantity--;
                        inputField.value = quantity;
                    }
                }
            }
            
            // Handle Add to Cart button clicks
            else if (target.id && target.id.startsWith("cart-item") || 
                    (target.parentElement && target.parentElement.id && target.parentElement.id.startsWith("cart-item"))) {
                
                // Get the actual button (could be the span inside the button)
                const button = target.id.startsWith("cart-item") ? target : target.parentElement;
                const index = button.id.replace("cart-item", "");
                
                // Get all required elements
                const productNameElement = document.getElementById(`product-name${index}`);
                const itemPriceElement = document.getElementById(`item-price${index}`);
                const itemImgElement = document.getElementById(`item-img${index}`);
                const inputField = document.getElementById(`laptop-number${index}`);
                
                if (productNameElement && itemPriceElement && itemImgElement && inputField) {
                    const productName = productNameElement.querySelector("h4").innerText;
                    const price = itemPriceElement.innerText;
                    const numericPrice = parseFloat(price.replace("$", ""));
                    const imgUrl = itemImgElement.src;
                    const quantity = parseInt(inputField.value) || 1;
                    
                    if (quantity > 0) {
                        // Retrieve existing cart from localStorage
                        let storedCart = localStorage.getItem('cart');
                        let checkout_cart = storedCart ? JSON.parse(storedCart) : [];
                        
                        // Check if item already exists
                        let existingItem = checkout_cart.find(item => item.Item === productName);
                        
                        if (existingItem) {
                            // Update existing item
                            existingItem.Quantity += quantity;
                            existingItem.Price += numericPrice * quantity;
                        } else {
                            // Add new item
                            checkout_cart.push({
                                Item: productName, 
                                Quantity: quantity, 
                                Price: numericPrice * quantity, 
                                Image: geturl(imgUrl)
                            });
                        }
                        
                        // Save cart and alert user
                        localStorage.setItem('cart', JSON.stringify(checkout_cart));
                        alert("Item(s) have been added to the cart!");
                        
                        // Reset input field
                        inputField.value = 0;
                    } else {
                        alert("Please select at least one item to add to cart.");
                    }
                }
            }
        });
    }
}

// Function to load and display cart on the cart page
function setupCartPage() {
    const cartrows = document.getElementById("cart-rows2");
    
    if (!cartrows) return; // If not on cart page, exit
    
    // Retrieve cart from localStorage
    let storedCart = localStorage.getItem('cart');
    let checkout_cart = storedCart ? JSON.parse(storedCart) : [];
    
    if (checkout_cart.length > 0) {
        // Find or create the table
        let cartTable = cartrows.querySelector("table");
        if (!cartTable) {
            cartTable = document.createElement("table");
            cartrows.appendChild(cartTable);
        }
        
        // Clear previous content
        cartTable.innerHTML = `
            <tr id="table-heading">
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
            </tr>
        `;
        
        // Add each item to the table
        checkout_cart.forEach((item, index) => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td class="first-table">
                    <div class="cart-picture">
                        <img src="./images/${item.Image}" alt="${item.Item}">
                        <div class="cart-picture-description">
                            <p>${item.Item}</p>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="cart-quantity">
                        <button type="button" class="cart-add" data-addIndex="${index}">+</button>
                        <div class="cart-numberofitems">
                            <input type="number" class="cart-quantity" value="${item.Quantity}" readonly>
                        </div>
                        <button type="button" class="cart-minus" data-minusIndex="${index}">-</button>
                    </div>
                </td>
                <td><div class="cart-total-price">£${item.Price.toFixed(2)}</div></td>
                <td><button type="button" class="cartbutton-remove" data-index="${index}">Remove</button></td>
            `;
            
            cartTable.appendChild(newRow);
        });
        
        // Add cart total and checkout button
        cartrows.appendChild(document.createElement("hr"));
        
        const totalPriceDiv = document.createElement("div");
        totalPriceDiv.setAttribute("id", "cart-total");
        
        // Calculate total price
        const totalPrice = checkout_cart.reduce((total, item) => total + item.Price, 0);
        
        totalPriceDiv.innerHTML = `<p>Total: £${totalPrice.toFixed(2)}</p>`;
        cartrows.appendChild(totalPriceDiv);
        
        // Add checkout button
        const totalCartButton = document.createElement("button");
        totalCartButton.setAttribute("id", "checkout-Totalbutton");
        totalCartButton.setAttribute("type", "reset");
        totalCartButton.innerHTML = "Checkout";
        totalPriceDiv.appendChild(totalCartButton);
        
        // Setup cart page event handlers
        setupCartPageEventHandlers();
    } else {
        // Display empty cart message
        cartrows.innerHTML = '<div class="empty-cart-message">Your cart is empty!</div>';
    }
}

// Event handlers for cart page
function setupCartPageEventHandlers() {
    // Checkout button
    const checkoutButton = document.getElementById("checkout-Totalbutton");
    const checkmark = document.getElementById("outer-finish");
    const cartTable = document.querySelector("#cart-rows2 table");
    
    if (checkoutButton) {
        checkoutButton.addEventListener("click", () => {
            if (cartTable) cartTable.style.display = "none";
            localStorage.clear();
            
            if (checkmark) checkmark.style.display = "flex";
            setTimeout(() => {
                window.location.reload();
            }, 2500);
        });
    }
    
    // Cart item quantity buttons
    document.querySelectorAll(".cart-add").forEach(button => {
        button.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-addIndex");
            updateCartItemQuantity(index, 1);
        });
    });
    
    document.querySelectorAll(".cart-minus").forEach(button => {
        button.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-minusIndex");
            updateCartItemQuantity(index, -1);
        });
    });
    
    // Remove buttons
    document.querySelectorAll(".cartbutton-remove").forEach(button => {
        button.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-index");
            removeCartItem(index);
        });
    });
}

// Function to update cart item quantity
function updateCartItemQuantity(index, change) {
    const storedCart = localStorage.getItem('cart');
    if (!storedCart) return;
    
    const cart = JSON.parse(storedCart);
    const item = cart[index];
    
    if (!item) return;
    
    // For decreasing, check if quantity would be zero
    if (change < 0 && item.Quantity <= 1) {
        // Just remove the item if quantity would become zero
        removeCartItem(index);
        return;
    }
    
    // Calculate unit price
    const unitPrice = item.Price / item.Quantity;
    
    // Update quantity and price
    item.Quantity += change;
    item.Price = unitPrice * item.Quantity;
    
    // Save and reload
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.reload();
}

// Function to remove item from cart
function removeCartItem(index) {
    const storedCart = localStorage.getItem('cart');
    if (!storedCart) return;
    
    const cart = JSON.parse(storedCart);
    
    // Remove the item
    cart.splice(index, 1);
    
    // Save and reload
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.reload();
}

// Main function to fetch products from API
async function fetchProducts(category) {
    try {
        // Skip API call for non-product pages
        if (category === "index" || category === "cart") {
            return;
        }
        
        const response = await axios.get(`http://localhost:3000/${category}`);
        const products = response.data;
        
        const productContainer = document.getElementById("product-items");
        if (!productContainer) return;
        
        // Clear previous content
        productContainer.innerHTML = "";
        
        // Loop through products and generate HTML
        products.forEach((product, index) => {
            const productSegment = document.createElement("div");
            productSegment.id = "product-segments";
            
            productSegment.innerHTML = `
                <div id="single-div">
                    <div id="card-img">
                        <img src="${product.image_src}" alt="${product.product_name}" id="item-img${index + 1}">
                    </div>
                    <div id="product-code">
                        <p>Product Code: ${product.product_code}</p>
                        <p>${product.rating} ⭐</p>
                    </div>
                    <div id="product-name${index + 1}">
                        <h4>${product.product_name}</h4>
                    </div>
                    <div id="product-description">
                        <p>${product.description}</p>
                    </div>
                </div>
                <div id="product-price">
                    <p id="item-price${index + 1}">$${product.price}</p>
                    <p>$${product.price + 50}</p> <!-- Example Discount Price -->
                </div>
                <div id="product-cart">
                    <button id="laptop-add${index + 1}">+</button>
                    <input type="number" id="laptop-number${index + 1}" value="0" min="0">
                    <button id="laptop-remove${index + 1}">-</button>
                    <button id="cart-item${index + 1}"><span>🛒</span> Add to Cart</button>
                </div>
            `;
            
            productContainer.appendChild(productSegment);
        });
        
    } catch (error) {
        console.error("Error fetching products:", error);
        const productContainer = document.getElementById("product-items");
        if (productContainer) {
            productContainer.innerHTML = "<p>Error loading products. Please try again later.</p>";
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Get current page category from URL
    const path = window.location.pathname;
    const category = path.split("/").pop().replace(".html", "") || "index";
    
    // Setup UI elements that exist on all pages
    setupUIElements();
    
    // Fetch products if on a product page
    fetchProducts(category).then(() => {
        // After products are loaded, set up cart functionality
        setupCartFunctionality();
    });
    
    // Setup cart page if on the cart page
    if (category === "cart") {
        setupCartPage();
    }
});