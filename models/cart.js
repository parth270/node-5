const fs = require("fs");
const path = require("path");
const Path = require('../util/path');

const c = path.join(Path, "data", "cart.json");

module.exports = class Cart {
  constructor() {
    this.products = [];
    this.totalPrice = 0;
  }

  static getProducts(cb) {
    fs.readFile(c,(err,fileContent)=>{
      const cart = JSON.parse(fileContent);
      if(err){
        cb(null);
      }else{
        cb(cart);
      }
    });
  };

  static addProduct(id,productPrice) {
    //fetch the previous cart
      fs.readFile(c, (err, fileContent) => {
        let cart = { products: [], totalPrice: 0 };
        if (!err) {
          cart = JSON.parse(fileContent);
        }
        //analyze the cart , if the product exits
        const existingProductIndex = cart.products.findIndex((prod) => prod.id===id);
        const existingProduct = cart.products[existingProductIndex];
        let updatedProduct;
        console.log(existingProductIndex,"cart");
        console.log(id);
        if (existingProduct) {
          updatedProduct = { ...existingProduct };
          updatedProduct.qty = updatedProduct.qty + 1;
          cart.products = [...cart.products];
          cart.products[existingProductIndex] = updatedProduct;
        } else {
          updatedProduct = { id: id, qty: 1 };
          cart.products = [...cart.products, updatedProduct];
        }
        cart.totalPrice = cart.totalPrice + +productPrice;

        fs.writeFile(c, JSON.stringify(cart), (err) => {
          console.log(err);
        });
    });
  };

  static deleteProduct(id,productPrice){
    fs.readFile(c,(err,fileContent)=>{
      if(err){
        return;
      }
      const cart = JSON.parse(fileContent);
      const updatedCart = {...cart};
      const product = updatedCart.products.find(prod=>prod.id===id);
      if(!product){
        return;
      }
      const productQty = product.qty;
      updatedCart.products = cart.products.filter(prod=>prod.id!==id);
      const price = + productPrice;
      console.log(updatedCart.totalPrice , price,productQty);
      updatedCart.totalPrice =  (updatedCart.totalPrice - (price * productQty)).toFixed(2);
      console.log(updatedCart.totalPrice,price);
      fs.writeFile(c,JSON.stringify(updatedCart),err=>{console.log(err);});
    });
  };

  static deleteProductofCart(id,productPrice){
    fs.readFile(c,(err,fileContent)=>{
      if(err){
        return;
      }
      const cart = JSON.parse(fileContent);
      const updatedCart = {...cart};
      const product = updatedCart.products.find(prod=>prod.id===id);
      const productIndex = updatedCart.products.findIndex(prod=>prod.id===id);
      const productQty = product.qty;
      if(productQty === 1){
        updatedCart.products = cart.products.filter(prod=>prod.id!==id);
        const price = + productPrice;
        console.log(updatedCart.totalPrice , price,productQty);
        updatedCart.totalPrice =  (updatedCart.totalPrice - (price * productQty)).toFixed(2);
        console.log(updatedCart.totalPrice,price);
        fs.writeFile(c,JSON.stringify(updatedCart),err=>{console.log(err);});
      }else{
        const price = + productPrice;
        const updatedProduct = {...product,qty:productQty-1};
        updatedCart.totalPrice = (updatedCart.totalPrice - price).toFixed(2);
        updatedCart.products[productIndex] = updatedProduct;
        fs.writeFile(c,JSON.stringify(updatedCart),err=>{console.log(err);});
      };
    });
  };
};