class Db {
  static productsUrl = "http://localhost:3000/profile"

  static async getOneProduct(id) {
    try {
      const res = await fetch(`${Db.productsUrl}/${id}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      return res.json();
    } catch (err) {
      console.log("Unexpected Error");
      console.log(err);
    }
  }
  
  static async getAllProducts() {
    try {
      const res = await fetch(`${Db.productsUrl}/`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      return res.json();
    } catch (err) {
      console.log("Unexpected Error");
      console.log(err);
    }
  }
}


export default Db;
