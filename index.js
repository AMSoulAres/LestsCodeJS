import Db from "./dbController.js";
import Storage from "./localStorage.js";

function renderProducts() {
  let productsList = document.querySelector(".productsList-container");
  Db.getAllProducts().then((products) => {
    products.forEach((product) => {
      let cardHtml = document.createElement("div");
      cardHtml.className = "card";
      let imgDiv = document.createElement("div");
      imgDiv.className = "imgDiv";
      let imgHtml = document.createElement("img");
      imgHtml.className = "imgCard";
      let discount = document.createElement("div");
      discount.className = "discount";
      discount.innerHTML = `${product.discountPercentage}% OFF`;
      imgHtml.src = product.thumbnail;
      let nameHtml = document.createElement("h1");
      nameHtml.className = "name";
      nameHtml.innerHTML = product.title;
      let priceHtml = document.createElement("p");
      priceHtml.className = "price";
      nameHtml.innerHTML = `R$ ${product.price}`;
      let descHtml = document.createElement("desc");
      descHtml.className = "desc";
      descHtml.innerHTML = product.description;
      let addToCart = document.createElement("button");
      addToCart.className = "addToCart";
      addToCart.innerHTML = "Adicionar";
      imgDiv.appendChild(discount);
      imgDiv.appendChild(imgHtml);
      cardHtml.appendChild(imgDiv);
      cardHtml.appendChild(nameHtml);
      cardHtml.appendChild(priceHtml);
      cardHtml.appendChild(descHtml);
      cardHtml.appendChild(addToCart);
      productsList.appendChild(cardHtml);
    });
    getLocalStorage(products);
  });
}

function getLocalStorage(products) {
  let qtdCarrinho = document.querySelector(".qtdCarrinho");
  if (Storage.getList()) {
    let quantidades = Storage.getList().map((elem) => {
      if (elem.quantidade) {
        return elem.quantidade;
      } else {
        return 0;
      }
    });
    console.log(quantidades)
    let total = quantidades.reduce((acc, crr) => acc + crr);
    qtdCarrinho.innerText = total;
  } else {
    let lista = [];
    products.forEach((product) => {
      let prod = {};
      prod.id = product.id;
      prod.title = product.title;
      prod.qtd = 0;
      lista.push(prod);
    });
    Storage.add(lista);
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

function subFromCart(count) {
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
