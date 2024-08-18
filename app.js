function button(){
    alert("Hello is it working??")

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