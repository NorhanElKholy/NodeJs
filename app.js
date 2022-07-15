const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const { title } = require('process');
const productRouter = require('./src/routers/productsRouter');
const adminRouter = require('./src/routers/adminRouter');
const homeRouter = require('./src/routers/homeRouter');

const app = express();
console.log('PORT',process.env.PORT)
const port = process.env.PORT || 8080;

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));

app.set('views', './src/views/');
app.set('view engine', 'ejs');


app.use('/products', productRouter);
app.use('/admin', adminRouter);
app.get('/', homeRouter);

app.listen(port, () => {
    console.log(`Listening to port ${chalk.green(port)}`);
});