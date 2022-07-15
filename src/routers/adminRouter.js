const express = require('express');
const debug = require('debug')('app:adminRouter');
const { MongoClient } = require('mongodb');
const adminRouter = express.Router();
const products = require('../data/users.json');


adminRouter.route('/')
    .get((req, res) => {
        const url = 'mongodb+srv://dbuser:dbuser@globomantics.gzpjc.mongodb.net/simpleHouseRestaurant?retryWrites=true&w=majority';
        const dbname = 'simpleHouseRestaurant';

        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                debug('Connected to MongoDB');

                const db = client.db(dbname);

                const response = await db.collection('users').insertMany(products);
                res.json(response);
            }
            catch (error) {
                debug(error.stack);
            }
        }())
    });

module.exports = adminRouter;