const response = await fetch("http://localhost:3000/products");
const json = await response.json();

function loadProducts() {
  for (const key in json) {
    if (Object.hasOwnProperty.call(json, key)) {
      let body = document.querySelector("body");
      let p = document.createElement("p");
      body.appendChild(p);
      p.innerHTML = `<div class="produtos">
            <img class="imgProdutos" src="${json[key].images[0]}">
            <p>${json[key].title}</p>                    
            <p>${json[key].description}</p>
            <input id="${json[key].id}" type="button" value="+"><br>
            <input id="${json[key].id}" type="button" value="-"><br>
            <button value="${json[key].id}" >add</button>
            </div>`;
    }
  }
}

function changeCart() {
  var count = 0;
  var buttons = document.querySelectorAll("button");
  var input = document.querySelectorAll("input");
  let btnmais = [...input].filter((input) => input.value === "+");
  let btnmenos = [...input].filter((input) => input.value === "-");
  let btns;
  for (var counter = 0; counter < btnmais.length; counter++) {
    btnmais[counter].addEventListener("click", function () {
      count += 1;
      localStorage.setItem("produtos", count);
      let qtdCarrinho = document.querySelector(".qtdCarrinho");
      qtdCarrinho.innerText = localStorage.getItem("produtos");
    });
  }
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
