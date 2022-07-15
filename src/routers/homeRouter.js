const express = require('express');
const debug = require('debug')('app:homeRouter');
const { MongoClient } = require('mongodb');
const { ObjectID } = require('bson');
const homeRouter = express.Router();

homeRouter.route('/')
    .get((req, res) => {
        const url = 'mongodb+srv://dbuser:dbuser@globomantics.gzpjc.mongodb.net/simpleHouseRestaurant?retryWrites=true&w=majority';
        const dbname = 'simpleHouseRestaurant';

        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                debug('Connected to MongoDB');

                const db = client.db(dbname);

                const products = await db.collection('products').find().limit(4).toArray();
                res.render('index', {products})
            }
            catch (error) {
                debug(error.stack);
            }
        }())
    });
module.exports = homeRouter;