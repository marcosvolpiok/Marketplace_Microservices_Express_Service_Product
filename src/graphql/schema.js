const makeExecutableSchema = require("graphql-tools");
const resolvers = require("./resolvers");
const { DateTime } = require('graphql-iso-date')

const typeDefs = `
  type Query {
    getShop: [Shop],
    
    getProduct: [Product],
    getProductById(id: ID): Product,
    getProductByShop(id: ID): [Product]
  }

  type Shop {
    id: ID
    name: String
  }

  type Product {
    id: ID,
    id_shop: ID,
    price: String,
    name: String,
    description: String,
    created_at: DateTime,
    image: [Image]
  }

  type Image {
    id: ID,
    url: String,
    id_product: ID,
    created_at: DateTime
  }

  scalar DateTime
`

module.exports = makeExecutableSchema.makeExecutableSchema({
  typeDefs,
  resolvers
})