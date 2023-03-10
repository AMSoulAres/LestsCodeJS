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
      maisBtn.innerHTML = "+";
      maisBtn.onclick = addToCart;
      let menosBtn = document.createElement("button");
      menosBtn.className = "maismenosBtn";
      menosBtn.id = `${product.id}btnmenos`;
      menosBtn.innerHTML = '-';
      menosBtn.onclick = subFromCart;
      let qtd = document.createElement("p");
      qtd.className = "qtdMaisMenos";
      qtd.id = `${product.id}btnqtd`;
      qtd.innerHTML = 0;
      let addBtn = document.createElement("button");
      addBtn.id = `${product.id}btn`;
      addBtn.className = "addToCart";
      addBtn.innerHTML = "Adicionar";
      addBtn.onclick = showMaisMenos;
      let juntaBtns = document.createElement("div");
      juntaBtns.className = "juntaBtn";
      maismenos.appendChild(menosBtn);
      maismenos.appendChild(qtd);
      maismenos.appendChild(maisBtn);
      imgDiv.appendChild(discount);
      imgDiv.appendChild(imgHtml);
      cardHtml.appendChild(imgDiv);
      cardHtml.appendChild(nameHtml);
      cardHtml.appendChild(priceHtml);
      cardHtml.appendChild(descHtml);
      juntaBtns.appendChild(maismenos);
      juntaBtns.appendChild(addBtn);
      cardHtml.appendChild(juntaBtns);
      productsList.appendChild(cardHtml);

      document.querySelector("#flush").onclick = flushCart;
    });
    getLocalStorage(products);
  });
}

function getLocalStorage(products) {
  let qtdCarrinho = document.querySelector(".qtdCarrinho");
  let list = Storage.getList();
  if (list && list !== []) {
    let quantidades = list.map((elem) => {
      if (elem.quantidade) {
        document.querySelector(`[id="${elem.id}maismenos"]`).style.visibility = 'visible';
        document.querySelector(`[id="${elem.id}btnqtd"]`).innerHTML = elem.quantidade;
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
      prod.quantidade = 0;
      lista.push(prod);
    });
    Storage.add(lista);
  }
}

function addToCart() {
  let prodID = parseInt(this.id.replace("btnmais", ""));
  Storage.update(prodID, 1);
  let itemAtualizado = Storage.getItem(prodID);
  document.querySelector(`[id="${prodID}btnqtd"]`).innerHTML = itemAtualizado.quantidade;
  document.querySelector(`.qtdCarrinho`).innerHTML = Storage.getAllCount()
}

function subFromCart() {
  let prodID = parseInt(this.id.replace("btnmenos", ""));
  let itemAtualizado = Storage.getItem(prodID);
  if (itemAtualizado.quantidade - 1 < 0) {
    let x = `${prodID}maismenos`;
    let maismenos = document.querySelector(`[id='${x}']`);
    maismenos.style.visibility = "hidden";
  } else {
    Storage.update(prodID, -1);
    let qtdAtt = document.querySelector(`[id="${prodID}btnqtd"]`);
    qtdAtt.innerHTML = itemAtualizado.quantidade-1;
  }
  document.querySelector(`.qtdCarrinho`).innerHTML = Storage.getAllCount();
}

function flushCart(){
  Storage.remove();
  document.location.reload()
}

function showMaisMenos() {
  let btn = document.querySelector(
    `[id = "${this.id.replace("btn", "maismenos")}"]`
  );
  btn.style.visibility = "visible";
}
// function addToCart(count) {//   for (var counter = 0; counter < btnmais.length; counter++) {//     btnmais[counter].addEventListener("click", function () {//       count += 1;//       localStorage.setItem("produtos", count);//       let qtdCarrinho = document.querySelector(".qtdCarrinho");//       qtdCarrinho.innerText = localStorage.getItem("produtos");//     });//   }//   return count;// }
// function subFromCart(count) {
//   for (var counter = 0; counter < btnmenos.length; counter++) {
//     btnmenos[counter].addEventListener("click", function () {
//       count -= 1;
//       if (count >= 0) {
//         localStorage.setItem("produtos", count);
//         let qtdCarrinho = document.querySelector(".qtdCarrinho");
//         qtdCarrinho.innerText = localStorage.getItem("produtos");
//       } else {
//         count = 0;
//         btns.style.visibility = "visible";
//         this.style.visibility = "hidden";
//         let x = btnmais.find((btn) => btn.id == this.id);
//         console.log(this.id);
//         x.style.visibility = "hidden";
//       }
//     });
//   }
//   return count;
// }

window.addEventListener("load", renderProducts);
