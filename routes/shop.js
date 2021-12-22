const path = require("path");

const express = require("express");

const productPage = require('../controllers/products');

const router = express.Router();

router.get("/", productPage.getProducts );
router.get('/cart',productPage.getCart);
router.post('/cart',productPage.postCart);
router.get('/products',productPage.getStartProducts);
router.get('/products/:productId',productPage.getProduct);
router.get('/orders',productPage.getOrders);
router.get('/checkout',productPage.getCheckout);

module.exports = router;