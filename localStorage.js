class Storage {
    static add(list) {
      localStorage.setItem("@carrinho", JSON.stringify(list));
    }

    static update(id, quantidade) {
      const lista = localStorage.getItem("@carrinho");
      if(lista){
          let listaDes = JSON.parse(lista);
          for (let i = 0; i < lista.length; i++){
            if (id === listaDes[i].id){
              listaDes[i].quantidade += quantidade;
              break;
            }
          }
          Storage.add(listaDes);
      }
    }

    static getAllCount() {
      const lista = localStorage.getItem("@carrinho");
      let listaDes = JSON.parse(lista);
      return listaDes.map((elem) => elem.quantidade).reduce((ac, at) => ac + at);
    }

    static getItem(id) {
      let lista = Storage.getList();
      return lista[id-1];
    }
  
    static getList() {
      const lista = localStorage.getItem("@carrinho");
  
      if (lista) {
        return JSON.parse(lista);
      }
      return undefined;
    }

    static remove(){
      localStorage.clear()
    }
  }
  
  export default Storage;