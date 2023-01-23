import Db from "./dbController.js";

function renderProducts(){
    let section = document.querySelector(".productsList");
    let product  = Db.getOneProduct(1);
    console.log(product);
}



function add(product){
}


document.querySelector(".render").onclick = renderProducts