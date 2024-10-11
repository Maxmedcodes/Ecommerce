const allAddButtons = ["laptop-add1","laptop-add2","laptop-add3","laptop-add4","laptop-add5","laptop-add6"];
const allRemoveButtons = ["laptop-remove1","laptop-remove2","laptop-remove3","laptop-remove4","laptop-remove5","laptop-remove6"];
const allLaptopInput = ["laptop-number1","laptop-number2","laptop-number3","laptop-number4","laptop-number5","laptop-number6"];
const allCartItems = ["cart-item1","cart-item2","cart-item3","cart-item4","cart-item5","cart-item6"];
const allItemPrices = ["item-price1","item-price2","item-price3","item-price4","item-price5","item-price6"];
const allProductNames = ["product-name1","product-name2","product-name3","product-name4","product-name5","product-name6"];
const itemImages = ["item-img1","item-img2","item-img3","item-img4","item-img5","item-img6"];


for (let i = 0; i < allAddButtons.length; i ++){

    const addButton = document.getElementById(allAddButtons[i]);
    const addRemoveButton = document.getElementById(allRemoveButtons[i]);
    const inputFields = document.getElementById(allLaptopInput[i]);

    if (addButton){
        addButton.addEventListener("click",()=> {
            let quantity = parseInt(inputFields.value);
            quantity++;
            inputFields.value = quantity; // Update the input's value
        });
    }
    if (addRemoveButton){
        addRemoveButton.addEventListener("click",() => {
            let quantity = parseInt(inputFields.value);
            if(quantity > 0 ){
            quantity --;
            inputFields.value = quantity
            }; // Update the input's value
        });
    }
    
    
}

function geturl(url){
    return url.split("/").pop();
};

// Adding Item to cart

if (allAddButtons.length > 0){
for (let i = 0; i < allAddButtons.length; i ++){
    const allCartItem = document.getElementById(allCartItems[i]);
    
    
    const inputFields = document.getElementById(allLaptopInput[i]);
    const itemPrice = document.getElementById(allItemPrices[i]);
    const productNames = document.getElementById(allProductNames[i]);
    let productName;
    if(productNames){
         productName = document.getElementById(allProductNames[i]).innerText
    }
    const item_imgs = document.getElementById(itemImages[i]);
    let item_img;
    if (item_imgs){
         item_img = document.getElementById(itemImages[i]).src;
    } 
    if (allCartItem){
        allCartItem.addEventListener("click",()=>{
            // Retrieve existing cart from localStorage
            let storedCart = localStorage.getItem('cart');
            let checkout_cart = storedCart ? JSON.parse(storedCart) : [];  
        // If no cart exists, start with an empty array
    
            let cartquantity = parseInt(inputFields.value);
            let price = itemPrice.innerText; 
            let numericPrice = parseInt(price.replace("$", " "));
            let amountquantity = cartquantity * numericPrice; 
            let imgUrl = geturl(item_img);
            
            
            
        
        // Add the new item to the cart array
        checkout_cart.push({
            Item: productName, 
            Quantity: cartquantity, 
            Price: amountquantity, 
            Image: imgUrl
        });    
    
        // Save the updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(checkout_cart));
        });
    }   
    


}
}


// Load cart from localStorage when the page loads
function loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        Checkout = JSON.parse(storedCart); // Restore the Checkout array
        console.log(Checkout); // Display cart items
    }
}

// Call loadCart when the page loads
window.addEventListener('load', loadCart);




function date(){
    const time = new Date().getFullYear()
    
    document.getElementById("time-copyright").innerHTML = "Copyright " + time
}
date()


const hamburger = document.getElementById("hamburger-menu");
const navMenu = document.querySelector(".hero-navigation");
const hero = document.getElementById("hero");
const laptop = document.querySelector(".laptop-hero");
// laptop page event click
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






// Section for adding Items From Cart to Cart HTML Page

window.addEventListener('load', () => {
    const cartrows = document.getElementById("cart-rows"); // Ensure this ID matches your HTML
    
    // Retrieve the cart items from localStorage
    let storedCart = localStorage.getItem('cart');
    let checkout_cart = storedCart ? JSON.parse(storedCart) : [];

    // Clear previous items
    if (cartrows){
        cartrows.innerHTML = ''; // Optional: Clears existing items
    }    
    // Check if there are items in the cart
    if (checkout_cart.length > 0) {
        checkout_cart.forEach(item => {
            const newCartItem = document.createElement('div');
            newCartItem.classList.add('cart-item');
            newCartItem.innerHTML = `
                <div id="cart-picture"><img src="./images/${item.Image}" alt="${item.Item}"></div>
                <div id="cart-item">${item.Item}</div>
                <div id="cart-numberofitems">${item.Quantity}</div>
                <div id="cart-total-price">£${item.Price}</div>
            `;
            cartrows.appendChild(newCartItem);
        });
    } else {
        if(cartrows){
        cartrows.innerHTML = '<div>Your cart is empty!</div>'; // Message for empty cart
        }
    }
});

// Adding Link to Checkout Page

const account_icon = document.getElementById("user-account");
const checkout_icon = document.getElementById("checkout-cart");
if (account_icon){
account_icon.addEventListener("click", ()=>{
    window.location.href="/index.html"
});
}
if(checkout_icon){
checkout_icon.addEventListener("click",()=>{
    window.location.href="/cart.html"
});
}
// const index_profile = document.getElementById("account-profile");
// index_profile.addEventListener("click", ()=>{
//     console.log("Index Button profile Clicked")
    
// })
buttonIDS = ["browse-laptop","browse-tablets","browse-gaming","browse-mischellanous","browse-furniture"]

buttonIDS.forEach(id => {
    const button = document.getElementById(id);

    if(button){
        button.addEventListener("click",()=>{
            const page = id.replace("browse-",'');
            document.location.href = `${page}.html`
        })
    }
});