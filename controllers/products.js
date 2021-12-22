const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getAddProduct=(req, res, next) => {
  res.render("admin/edit-product", {
    title: "Add Product",
    path: "/admin/add-product",
    productCSS: true,
    formsCSS: true,
    layout: "layouts/main-layout",
    activePRODUCT: true,
    editing:false
  });
};

exports.postAddProduct= (req, res, next) => {
    const obj=req.body;
    const product = new Product(null,obj.title,obj.image,obj.desc,obj.price);
    console.log(obj)
    product.save().then(()=>{
      res.redirect("/");
    }).catch(err=>{console.log(err)});
};


exports.getEditProduct=(req, res, next) => {
  const editMode = req.query.edit;
  const id = req.params.productId;
  console.log(editMode);
  if(!editMode){
    return res.redirect('/');
  };
  Product.findById(id,(product)=>{
    if(!product){
      return res.reidirect('/');
    };
    console.log(product);
    res.render("admin/edit-product", {
      title: "Edit Product",
      path: "/admin/edit-product",
      productCSS: true,
      formsCSS: true,
      layout: "layouts/main-layout",
      activePRODUCT: true,
      editing:editMode,
      product:product
    });
  });
};
  
exports.postEditProduct=(req,res,next)=>{
  const obj = req.body;
  const product = new Product(obj.id,obj.title,obj.image,obj.desc,obj.price);
  product.save();
  console.log(obj);
  res.redirect('/admin/products');
};

exports.getProducts=(req, res, next) => {
  Product.fetchAll().then(([rows,feildData])=>{
    console.log(rows);
    res.render("shop/products-list", {
      prods: rows,
      title: "My Shop",
      path: "/",
      hasProducts: rows.length > 0,
      layout: "layouts/main-layout",
      activeSHOP:true,
      productCSS:true,
    });
  }).catch((error)=>{console.log(error)});
};

exports.getStartProducts=(req,res,next)=>{
  Product.fetchAll().then(([rows,feildData])=>{
    res.render('shop/index',{
      prods:rows,
      title:'Products',
      hasProducts:rows.length > 0,
      path:'/products',
      layout:'layouts/main-layout',
      activeProducts:true,
      productCSS:true,
    })
  }).catch(err=>{console.log(err)});
};

exports.getOrders=(req, res, next)=>{
  res.render('shop/orders', {
    title:"Orders",
    path:"/Orders",
    layout: "layouts/main-layout",
    activeOrders:true,
    productCSS:true,
  });
};

exports.getCheckout=(req,res,next)=>{
  
};

exports.getProduct=(req,res,next)=>{
  const prodId = req.params.productId;
  console.log(prodId);
  Product.findById(prodId,(product=>{
    res.render("shop/product-detail",{
      product:product,
      title:"Product Details",
      path:`/products/${prodId}`,
      activeProducts:true,
      productCSS:true,
      layout: "layouts/main-layout",
    });
  }));
};

exports.postCart=(req,res,next)=>{
  const id = req.body.productId;
  Product.findById(id,(product)=>{
    Cart.addProduct(id,product.price);
  });
  
  res.redirect("/cart");
};

exports.getCart=(req,res,next)=>{
  Cart.getProducts((cart)=>{
    Product.fetchAll((products)=>{
      const cartProducts = [];
      for(product of products){
        const cartProductData = cart.products.find(prod=> prod.id === product.id);
        if(cartProductData){
          cartProducts.push({productData:product,qty:cartProductData.qty});
        }
      }

      console.log(cartProducts);
      res.render("shop/cart",{
        title:"Cart",
        path:"/cart",
        layout: "layouts/main-layout",
        activeCart:true,
        productCSS:true,
        products: cartProducts,
        hasProducts:cartProducts.length>0
      });
    })
  })
};

exports.getAdminProducts=(req,res,next)=>{
  Product.fetchAll((products)=>{
    res.render("admin/products",{
      title:"Admin-Products",
      path:"/admin/products",
      layout: "layouts/main-layout",
      activeAdmin:true,
      productCSS:true,
      prods:products,
      hasProducts:products.length>0
    });
  });
};

exports.postDeleteProduct=(req,res,next)=>{
  const id = req.body.id;
  const productPrice = req.body.price;
  Product.deleteProduct(id,productPrice);
  res.redirect('/');
}

exports.postDeleteFromCart=(req,res,next)=>{
  const id =req.body.id;
  const price = req.body.price;
  Cart.deleteProductofCart(id,price);
  res.redirect('/cart');
}