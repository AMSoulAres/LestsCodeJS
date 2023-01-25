import Db from "./dbController.js";

function renderProducts(){
    let productsList = document.querySelector(".productsList-container");
    Db.getAllProducts().then(products => {
        console.log(products)
        products.forEach(product => {
        let cardHtml = document.createElement("div");
        cardHtml.className = "card";
        let imgDiv =  document.createElement("div");
        imgDiv.className = "imgDiv";
        let imgHtml = document.createElement("img");
        imgHtml.className = "imgCard";
        let discount = document.createElement("div");
        discount.className = "discount";
        discount.innerHTML = `${product.discountPercentage}% OFF`;
        imgHtml.src = product.thumbnail;
        let nameHtml  = document.createElement("h1");
        nameHtml.className = "name"
        nameHtml.innerHTML = product.title;
        let priceHtml = document.createElement("p");
        priceHtml.className = "price";
        nameHtml.innerHTML = `R$ ${product.price}`
        let descHtml = document.createElement("desc");
        descHtml.className = "desc";
        descHtml.innerHTML = product.description
        let  addToCart = document.createElement("button")
        addToCart.className = 'addToCart';
        addToCart.innerHTML = "Adicionar"
        imgDiv.appendChild(discount);
        imgDiv.appendChild(imgHtml);
        cardHtml.appendChild(imgDiv);
        cardHtml.appendChild(nameHtml);
        cardHtml.appendChild(priceHtml);
        cardHtml.appendChild(descHtml);
        cardHtml.appendChild(addToCart);
        productsList.appendChild(cardHtml);
                }
            )
        }
    )
};

function changeCart() {
    var count = 0;
    var buttons = document.querySelectorAll("button");
    var input = document.querySelectorAll("input");
    let btnmais = [...input].filter((input) => input.value === "+");
    let btnmenos = [...input].filter((input) => input.value === "-");
    let btns;
    
    for (var counter = 0; counter < buttons.length; counter++) {
      buttons[counter].addEventListener("click", function () {
        btnmais[this.value - 1].style.visibility = "visible";
        btnmenos[this.value - 1].style.visibility = "visible";
        btns = this;
        btns.style.visibility = "hidden";
        console.log(btnmais[this.value]);
      });
    }
  }

  function addToCart(count) {
    for (var counter = 0; counter < btnmais.length; counter++) {
        btnmais[counter].addEventListener("click", function () {
          count += 1;
          localStorage.setItem("produtos", count);
          let qtdCarrinho = document.querySelector(".qtdCarrinho");
          qtdCarrinho.innerText = localStorage.getItem("produtos");
        });
      }
    return count;
  }

  function subFromCart (count) {
    for (var counter = 0; counter < btnmenos.length; counter++) {
        btnmenos[counter].addEventListener("click", function () {
          count -= 1;
          if (count >= 0) {
            localStorage.setItem("produtos", count);
            let qtdCarrinho = document.querySelector(".qtdCarrinho");
            qtdCarrinho.innerText = localStorage.getItem("produtos");
          } else {
            count = 0;
            btns.style.visibility = "visible";
            this.style.visibility = "hidden";
            let x = btnmais.find((btn) => btn.id == this.id);
            console.log(this.id);
            x.style.visibility = "hidden";
          }
        });
      }
    return count;
  }
window.addEventListener("load", renderProducts);
