const express = require('express');
const products = require('../data/products.json');
const debug = require('debug')('app:productRouter');
const { MongoClient } = require('mongodb');
const { ObjectID } = require('bson');
const productRouter = express.Router();

productRouter.route('/')
    .get((req, res) => {
        const url = 'mongodb+srv://dbuser:dbuser@globomantics.gzpjc.mongodb.net/simpleHouseRestaurant?retryWrites=true&w=majority';
        const dbname = 'simpleHouseRestaurant';

        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                debug('Connected to MongoDB');

                const db = client.db(dbname);

                const products = await db.collection('products').find().toArray();
                res.render('products', {products})
            }
            catch (error) {
                debug(error.stack);
            }
        }())
    });
    productRouter.route('/:id')
    .get((req, res) => {
        const id = req.params.id;
        const url = 'mongodb+srv://dbuser:dbuser@globomantics.gzpjc.mongodb.net/simpleHouseRestaurant?retryWrites=true&w=majority';
        const dbname = 'simpleHouseRestaurant';

        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                debug('Connected to MongoDB');

                const db = client.db(dbname);

                const product = await db.collection('products').findOne({_id:new ObjectID(id)});
                res.render('product',{
                    product
                });
            }
            catch (error) {
                debug(error.stack);
            }
        }())
       
    });

module.exports = productRouter;