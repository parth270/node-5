const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const db = require("./util/database");

const app = express();
const notFoundPage = require('./controllers/404');

app.set('view engine','hbs');
app.set('views','views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

db.execute('SELECT * FROM products').then((result)=>{
    console.log(result[0],result[1]);
}).catch((err)=>{
    console.log(err);
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(notFoundPage);

app.listen(3000);