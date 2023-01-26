class Storage {
    static add(list) {
      localStorage.setItem("@carrinho", JSON.stringify(list));
    }
    static update(produto) {
      const lista = localStorage.getItem("@carrinho");
      if (lista) {
        let listaDes = JSON.parse(lista);
        for (var i = 0; i <= listaDes.length; i++) {
          if (produto.id === listaDes[i].id) {
            listaDes[i] = produto;
            break;
          }
        }
        Storage.add(listaDes);
      }
    }
    static getAllCount() {
      const lista = localStorage.getItem("@carrinho");
      let listaDes = JSON.parse(lista);
      return listaDes.map((elem) => elem.qtd).reduce((ac, at) => ac + at);
    }
    static getByid(id) {
      const lista = localStorage.getItem("@carrinho");
      let listaDes = JSON.parse(lista);
      return listaDes.find((elem) => elem.id === id);
    }
    static getList() {
      const lista = localStorage.getItem("@carrinho");
      if (lista) {
        return JSON.parse(lista);
      }
      return undefined;
    }
    static remove(list, item) {
      list = []
      Storage.add(list);
    }
  }
  export default Storage;