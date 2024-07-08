import express from 'express'
import { createHandler } from 'graphql-http/lib/use/express'
import { buildSchema, graphql } from 'graphql'
import { producerModel, productModel } from './dataSchema'
import { ObjectId } from 'mongodb'
import { connectMongodb } from './clients/mongodb'

const schema = buildSchema(`
  type Query {
    productById(id: String!): Product
  }
  type Mutation {
    createProducts(products: [CreateProductInput]): [Product]
    updateProductById(id: String!, update: UpdateProductInput): Product
    deleteProductById(id: String!): Boolean
    delete: Boolean
  }

  type Product {
    _id: String!
    name: String!
  }

  input CreateProductInput {
    name: String!
  }

  input UpdateProductInput {
    name: String
  }
`)

const graphqlResolvers = {
  async productById({ id }: { id: string }) {
    const found = await productModel.findById(id)
    return found
  },
  async createProducts({ products }: { products: [{ name: string }] }) {
    const created = await Promise.all(
      products.map(async (item) => {
        const product = await productModel.create({
          _id: new ObjectId(),
          name: item.name
        })

        return product
      })
    )

    return created
  },
  async updateProductById({ id, update }: { id: string; update: any }) {
    const found = await productModel.findById(id)

    if (!found) {
      throw new Error(`Product ${id} not found`)
    }

    // @ts-ignore left hand assignment ts issue
    found.name = update.name
    const saved = await found?.save()

    return saved
  },
  async deleteProductById({ id }: { id: string }) {
    console.log(id)
    await productModel
      .deleteOne({ _id: id })
      .then(function () {
        console.log('Data deleted') // Success
      })
      .catch(function (error) {
        console.log(error) // Failure
      })

    return true
  },
  async delete() {
    return true
  }
}

const server = express()
server.use(express.json())

server.all(
  '/graphql',
  createHandler({
    schema: schema,
    rootValue: graphqlResolvers
  })
)

server.get('/_alive', (req, res) => {
  res.send('Good!')
})

connectMongodb()

server.listen(3000)
console.log('Running a GraphQL API server at http://localhost:3000/graphql')
