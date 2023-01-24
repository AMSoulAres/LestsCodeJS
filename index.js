import Db from "./dbController.js";

function renderProducts(){
    let productsList = document.querySelector(".productsList-container");
    Db.getAllProducts().then(products => {
        console.log(products)
        products.forEach(element => {
        let cardHtml = document.createElement("div");
        cardHtml.className = "card";
        let imgHtml = document.createElement("img");
        imgHtml.className = "imgCard";
        let nameHtml  = document.createElement("h1");
        nameHtml.className = "name"
        let priceHtml = document.createElement("p");
        priceHtml.className = "price";
        let descHtml = document.createElement("desc");
        descHtml.className = "desc";
        let  addToCart = document.createElement("button")
        addToCart.className = addToCart;
        
        cardHtml.appendChild(imgHtml);
        cardHtml.appendChild(nameHtml);
        cardHtml.appendChild(priceHtml);
        cardHtml.appendChild(descHtml);
        productsList.appendChild(cardHtml);
                }
            )
        }
    )
};



function add(product){
}

window.addEventListener("load", renderProducts);
