import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'

export const Producer = new mongoose.Schema({
  _id: {
    type: ObjectId!
  },
  name: {
    type: String!
  },
  country: {
    type: String
  },
  region: {
    type: String
  }
})

export const Product = new mongoose.Schema({
  _id: {
    type: ObjectId!
  },
  vintage: {
    String
  },
  name: {
    type: String!
  },
  producerId: {
    type: ObjectId
  },
  producer: {
    type: Producer
  }
})

export const producerModel = mongoose.model('Producers', Producer)
export const productModel = mongoose.model('Products', Product)
