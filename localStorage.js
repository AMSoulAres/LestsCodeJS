class Storage {
    static add(list) {
      localStorage.setItem("@carrinho", JSON.stringify(list));
    }
    static update(id, produto) {
      const lista = localStorage.getItem("@carrinho");
      if(lista){
          let listaDes = JSON.parse(lista);
          for (i = 1; i <= lista.length; i++){
            if (id === lista.produto.id){
              lista.produto = produto;
              break;
            }
          }
          Storage.add(lista);
      }
    }
  
    static getList() {
      const lista = localStorage.getItem("@carrinho");
  
      if (lista) {
        return JSON.parse(lista);
      }
      return undefined;
    }

    static remove(list, item){
      list = []
      Storage.add(list);
    }
  }
  
  export default Storage;