const path = require("path");

const express = require("express");

const productPage = require("../controllers/products");

const router = express.Router();

const products = [];

// /admin/add-product => GET
router.get("/add-product", productPage.getAddProduct );

// /admin/add-product => POST
router.post("/add-product",productPage.postAddProduct);

router.get('/products',productPage.getAdminProducts);

router.get("/edit-product/:productId",productPage.getEditProduct);

router.post("/edit-product",productPage.postEditProduct);

router.post("/delete-product",productPage.postDeleteProduct);
router.post("/delete-from-cart",productPage.postDeleteFromCart);
module.exports = router;