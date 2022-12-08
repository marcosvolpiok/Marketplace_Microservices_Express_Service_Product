const req = require('express/lib/request');
const {
  shopServiceOb,
  productServiceOb
} = require('../dependencies/');

const resolvers = {
  Query: {
    async getShop(root, args, context) {
      context.req.url = 'getShop';
      return await shopServiceOb.list(context.req);
    },

    async getProduct(root, args, context) {
      context.req.url = 'getProducts';
      return await productServiceOb.list(context.req);
    },

    async getProductById(root, {id}, context) {
      context.req.params.id = id;
      context.req.url = `getProductById/${id}`;
      return await productServiceOb.listById(context.req);
    },

    async getProductByShop(root, {id}, context) {
      context.req.params.id = id;
      context.req.url = `getProductByShop/${id}`;
      return await productServiceOb.listByShop(context.req);
    }, 
  } 
}

module.exports = resolvers