const Cart = require('./cart');
const db = require("../util/database.js");

module.exports= class Product{

    constructor(id,title,imageUrl,desc,price){
        this.id = id;
        this.title=title;
        this.imageUrl=imageUrl;
        this.desc=desc;
        this.price= +price;
    }

    save() {
        return db.execute('INSERT INTO products (title, price, desc, imageUrl) VALUES ( ? ,? , ? , ? )',[this.title,this.price,this.desc,this.imageUrl]);
    }

    static fetchAll(cb){
        return db.execute("SELECT * FROM products");
    };

    static findById(id,cb){

    };

    static deleteProduct(id,productPrice){
    
    };
};

//[{"id":"3","title":"The Lean Startup ","imageUrl":"https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg ","desc":"This is a great book if you are going to do a startup!! this is really great","price":"30.95"},{"id":"2","title":"The Lean Startup","imageUrl":"https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg","desc":"This is a great book if you are going to do a startup!!","price":"19.99"}]