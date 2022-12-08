const bcrypt = require('bcrypt');
const { createClient } = require("redis");
const loginHelper = require('../helpers/loginHelper');
const { cacheHelper } = require('../helpers/cacheHelper');
//const clientOb = createClient.getClient();
const cacheHelperOb = new cacheHelper(createClient);

const shopRepository = require('../repository/shopRepository');
const productRepository = require('../repository/productRepository');

const shopService = require('../services/shopService');
const productService = require('../services/productService');


const {Shop, Product, Image, Sequelize, sequelize} = require('../models');

const shopRepositoryOb=new shopRepository(Shop, Sequelize, sequelize, cacheHelperOb);
const shopServiceOb = new shopService(shopRepositoryOb);

const productRepositoryOb=new productRepository(Product, Image, Sequelize, sequelize, cacheHelperOb);
const productServiceOb = new productService(productRepositoryOb);

module.exports = {
    Sequelize, sequelize,
    shopServiceOb, productServiceOb
};