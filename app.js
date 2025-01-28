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
            let existingItem = checkout_cart.find(item=> item.Item === productName);

            
            let cartquantity = parseInt(inputFields.value);
            let price = itemPrice.innerText; 
            let numericPrice = parseInt(price.replace("$", " "));
            let amountquantity = cartquantity * numericPrice; 
            let imgUrl = geturl(item_img);
            
            
            console.log(imgUrl)

            if(existingItem){
                existingItem.Quantity += cartquantity
                existingItem.Price += amountquantity
            } else{
                // Add the new item to the cart array
            checkout_cart.push({
            Item: productName, 
            Quantity: cartquantity, 
            Price: amountquantity, 
            Image: imgUrl
        });  
            }
        
          
        // Alert item has been added to CARtT

        alert("Item(s) has been added to Cart")
        // Save the updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(checkout_cart));
        });
    }   
    


}
}
// Checkout page - Remove item from Cart

// let checkoutCartRemoveButton = document.getElementsByClassName("cartbutton-remove");
// let checkoutCartItem = 

// function CartRemoveItem(){
//     checkoutCartRemoveButton.addEventListener("click", ()=>{
//     let storedCart = localStorage.getItem('cart');
//     let checkout_cart = storedCart ? JSON.parse(storedCart) : [];  
    

// })
// }


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
        const cartTable = document.querySelector("#cart-rows2 table");
    
        checkout_cart.forEach((item,index) => {
            // Create a new table row
            const newRow = document.createElement('tr');
    
            // Set inner HTML with item details
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
                    <button type="button" class="cart-add" data-addIndex=${index}>+</button>
                <div class="cart-numberofitems">
                <input type="number" name=${item.quantity} class="cart-quantity" value="${item.Quantity}">
                </div>
                <button type="button" class="cart-minus" data-minusIndex=${index}>-</button>
                </div>
                </td>
                <td><div class="cart-total-price">£${item.Price}</div></td>
                <td><button type="button" class="cartbutton-remove" data-index=${index}>Remove</button></td>
                
            `;
    
            // Append the new row to the cart table
            if(cartTable){
            cartTable.appendChild(newRow);
            }
        });
        // Add div for Cart Total
        const CartTotalDiv = document.querySelector("#cart-rows2");
        CartTotalDiv.append(document.createElement("hr"))
        const totalPriceDiv = document.createElement("DIV");
        totalPriceDiv.setAttribute("id","cart-total");
        const allCartPrices = JSON.parse(localStorage.getItem("cart"));
        const cartTotalDivButton = document.getElementById("cart-total");
        
        
        const cartPricesOnly = allCartPrices.map( (x)=> x.Price)
        const initialValue = 0;
        let  cartTotalPrices = cartPricesOnly.reduce((accumulator,currentValue)=> accumulator+ currentValue ,initialValue, )
        let totalCartPrice = cartTotalPrices ;
        
        console.log(`THis is allCartPrices --> ${totalCartPrice}`)
        
        totalPriceDiv.innerHTML= `<p> Total :    £${totalCartPrice} </p>`
        CartTotalDiv.append(totalPriceDiv);
        
        const totalCartButton = document.createElement("button");
        totalCartButton.setAttribute("id","checkout-Totalbutton");
        totalCartButton.setAttribute("type","reset");
        totalCartButton.innerHTML = "Checkout";
    
        totalPriceDiv.append(totalCartButton);

        // Checkout Button Click Event
        const checkmark = document.getElementById("outer-finish");
        totalCartButton.addEventListener("click",()=>{
            localStorage.clear();
            window.location.reload();
            
            checkmark.setAttribute("style","display:flex")
            
            
            
        });
        
        // Completed Checkout logo off when there is no item in cart
        // const completedCheckmark = document.getElementById("finished");
        // const completedCheckmarkText = document.getElementById("outer-text");
        // if(checkout_cart.length > 0){
        //     completedCheckmark.setAttribute("style","display:none");
        //     completedCheckmarkText.setAttribute("style","display:none");
        // }
        

        // Increasing Items and price at Checkout
        const cartADD = document.querySelectorAll(".cart-add");
        cartADD.forEach( button =>{
            button.addEventListener("click", (event)=>{
                const cartAddIndex = event.target.getAttribute("data-addIndex");
                const checkout_store = localStorage.getItem("cart");
                const cart_check = JSON.parse(checkout_store);
                
                
                const currentPrice =  cart_check[cartAddIndex].Price
                const currentQuantity = cart_check[cartAddIndex].Quantity
                const unitPrice = currentPrice / currentQuantity
                cart_check[cartAddIndex].Quantity ++;
                cart_check[cartAddIndex].Price += unitPrice;
                localStorage.setItem("cart",JSON.stringify(cart_check));
                window.location.reload();
            })
            ;
        });
        const cartMinus = document.querySelectorAll(".cart-minus")
        cartMinus.forEach(button =>{
            button.addEventListener("click", (event)=>{
                const cartMinusIndex = event.target.getAttribute("data-minusIndex")
                const checkout_store = localStorage.getItem("cart");
                const cart_check = JSON.parse(checkout_store);
                if(cart_check[cartMinusIndex].Quantity > 0 ){
                    
                    const currentPrice =  cart_check[cartMinusIndex].Price
                    const currentQuantity = cart_check[cartMinusIndex].Quantity
                    const unitPrice = currentPrice / currentQuantity
                    cart_check[cartMinusIndex].Quantity --; 
                    cart_check[cartMinusIndex].Price -= unitPrice
                     
                    
                    localStorage.setItem("cart",JSON.stringify(cart_check));
                
                
                    window.location.reload();
                }else{
                    console.log("Item Quantity can not be less than 0")
                }
                
            })
        })

        // Removing Items 
        const cartRemoveButtons = document.querySelectorAll(".cartbutton-remove");
        cartRemoveButtons.forEach( button =>{
            button.addEventListener("click", (event) =>{
                const itemRemoveIndex = event.target.getAttribute("data-index");
                console.log("Cart ITem removed item index no: ",itemRemoveIndex)

                // remove item form cart
                checkout_cart.splice(itemRemoveIndex,1)

                // update local storage
                localStorage.setItem("cart", JSON.stringify(checkout_cart))

                // Reload page to show new Cart

                window.location.reload();
            })
        })

    }else {
        if(cartrows){
        cartrows.innerHTML = '<div>Your cart is empty!</div>'; // Message for empty cart
        }
    }
    
    

        
    
});

var cartremovebutton = document.getElementsByClassName("cartbutton-remove");
if (cartremovebutton){
for (let i=0; cartremovebutton.length; i++){
    cartremovebutton[i].addEventListener("click",(event)=>{
        let itemIndex2= event.target.getAttribute("data-index");
        console.log("cartebutton remove")
    
    })
}
}

function renderCartItems(){
    // Retrieve the cart items from localStorage
    let storedCart = localStorage.getItem('cart');
    let checkout_cart = storedCart ? JSON.parse(storedCart) : [];

    // Locate the table where items will be displayed
    const cartTable = document.querySelector("#cart-rows2 table");

    // Clear existing rows (but keep the table heading)
    cartTable.innerHTML = `
        <tr id="table-heading">
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Button</th>
        </tr>
    `;

    // Check if there are items in the cart
    if (checkout_cart.length > 0) {
        // Loop through the cart items and create rows
        checkout_cart.forEach((item, index) => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>
                    <div id="cart-picture">
                        <img src="./images/${item.Image}" alt="${item.Item}">
                        <div id="cart-picture-description">
                            <p>${item.Item}</p>
                        </div>
                    </div>
                </td>
                <td>${item.Quantity}</td>
                <td>£${item.Price}</td>
                <td>
                    <button class="cartbutton-remove" data-index="${index}">Remove</button>
                </td>
            `;

            // Append the new row to the table
            cartTable.appendChild(newRow);
        });
    } else {
        // If the cart is empty, display a message
        const cartrows = document.getElementById("cart-rows2");
        cartrows.innerHTML = '<div>Your cart is empty!</div>';
    }

}




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