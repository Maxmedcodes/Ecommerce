
// let quantity = 0;
// const addItemInput = document.getElementById("laptop-number1"); // Get the input element
// const button1 = document.getElementById("laptop-add1");
// const button2 =document.getElementById("laptop-remove1")

// const increaseItem = () => {
//     quantity++;
//     addItemInput.value = quantity; // Update the input's value
// };
// const decreaseItem = () => {
//     if(quantity > 0 ){
//     quantity --;
//     addItemInput.value = quantity
//     }; // Update the input's value
// };
// button1.addEventListener("click", increaseItem);
// button2.addEventListener("click",decreaseItem);

const allAddButtons = ["laptop-add1","laptop-add2","laptop-add3","laptop-add4","laptop-add5","laptop-add6"]
const allRemoveButtons = ["laptop-remove1","laptop-remove2","laptop-remove3","latopp-remove4","laptop-remove5","laptop-remove6"]
const allLaptopInput = ["laptop-number1","laptop-number2","laptop-number3","laptop-number4","laptop-number5","laptop-number6"]


for (let i = 0; i < allAddButtons.length; i ++){

    const addButton = document.getElementById(allAddButtons[i]);
    const addRemoveButton = document.getElementById(allRemoveButtons[i]);
    const inputFields = document.getElementById(allLaptopInput[i]);

    addButton.addEventListener("click",() => {
        let quantity = parseInt(inputFields.value);
        quantity++;
        inputFields.value = quantity; // Update the input's value
    });
    addRemoveButton.addEventListener("click",() => {
        let quantity = parseInt(inputFields.value);
        if(quantity > 0 ){
        quantity --;
        inputFields.value = quantity
        }; // Update the input's value
    });
}







function date(){
    const time = new Date().getFullYear()
    
    document.getElementById("time-copyright").innerHTML = "Copyright " + time
}
date()
const hamburger = document.querySelector("#hamburger-menu");
const navMenu = document.querySelector(".hero-navigation");
const hero = document.querySelector("#hero");

hamburger.addEventListener("click", () =>{
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    hero.classList.toggle("active");
})
const account_profile = document.getElementById("account-profile");
account_profile.addEventListener("click", ()=>{
    document.location.href= "/profile.html"
})
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

// Section for adding Items 
