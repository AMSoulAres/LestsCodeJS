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
      let maismenos = document.createElement("div");
      maismenos.className = "maismenos";
      maismenos.style.visibility = "hidden";
      maismenos.id = `${product.id}maismenos`;
      let maisBtn = document.createElement("button");
      maisBtn.className = "maismenosBtn";
      maisBtn.id = `${product.id}btnmais`;
      maisBtn.innerText = "+";
      maisBtn.onclick = mais;
      let menosBtn = document.createElement("button");
      menosBtn.className = "maismenosBtn";
      menosBtn.id = `${product.id}btnmenos`;
      menosBtn.innerText = "-";
      menosBtn.onclick = menos;
      let qtd = document.createElement("p");
      qtd.className = "qtdMaisMenos";
      qtd.id = `${product.id}btnqtd`;
      qtd.innerText = "0";
      let addToCart = document.createElement("button");
      addToCart.id = `${product.id}btn`;
      addToCart.className = "addToCart";
      addToCart.innerHTML = "Adicionar";
      addToCart.onclick = showMaisMenos;
      let juntaBtns = document.createElement("div");
      juntaBtns.className = "juntaBtn";
      maismenos.appendChild(maisBtn);
      maismenos.appendChild(qtd);
      maismenos.appendChild(menosBtn);
      imgDiv.appendChild(discount);
      imgDiv.appendChild(imgHtml);
      cardHtml.appendChild(imgDiv);
      cardHtml.appendChild(nameHtml);
      cardHtml.appendChild(priceHtml);
      cardHtml.appendChild(descHtml);
      cardHtml.appendChild(maismenos);
      juntaBtns.appendChild(maismenos);
      juntaBtns.appendChild(addBtn);
      cardHtml.appendChild(juntaBtns);
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
function mais() {
  let x = `${this.id.replace("btnmais", "")}btnqtd`;
  let qtd = document.querySelector(`[id='${x}']`);
  let produto = Storage.getByid(Number(this.id.replace("btnmais", "")));
  let count = produto.qtd + 1;
  let novoProduto = {
    id: Number(this.id.replace("btnmais", "")),
    title: produto.title,
    qtd: count,
  };
  Storage.update(novoProduto);
  qtd.innerText = Storage.getByid(Number(this.id.replace("btnmais", ""))).qtd;
  let qtdCarrinho = document.querySelector(".qtdCarrinho");
  qtdCarrinho.innerText = Storage.getAllCount();
}
function menos() {
  let x = `${this.id.replace("btnmenos", "")}btnqtd`;
  let qtd = document.querySelector(`[id='${x}']`);
  let produto = Storage.getByid(Number(this.id.replace("btnmenos", "")));
  let count = produto.qtd - 1;
  let novoProduto = {
    id: Number(this.id.replace("btnmenos", "")),
    title: produto.title,
    qtd: count,
  };
  if (novoProduto.qtd < 0) {
    console.warn("qtd não pode ser menor que zero");
    let x = `${this.id.replace("btnmenos", "")}maismenos`;
    let maismenos = document.querySelector(`[id='${x}']`);
    maismenos.style.visibility = "hidden";
  } else {
    Storage.update(novoProduto);
  }
  qtd.innerText = Storage.getByid(Number(this.id.replace("btnmenos", ""))).qtd;
  let qtdCarrinho = document.querySelector(".qtdCarrinho");
  qtdCarrinho.innerText = Storage.getAllCount();
}
function showMaisMenos() {
  let qtdCarrinho = document.querySelector(".qtdCarrinho");
  qtdCarrinho.innerText = Storage.getAllCount();
  let x = `${this.id.replace("btn", "")}maismenos`;
  let btn = document.querySelector(`[id='${x}']`);
  btn.style.visibility = "visible";
}
window.addEventListener("load", renderProducts);
