"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("graphql-http/lib/use/express");
const graphql_1 = require("graphql");
const dataSchema_1 = require("./dataSchema");
const mongodb_1 = require("mongodb");
const mongodb_2 = require("./clients/mongodb");
const schema = (0, graphql_1.buildSchema)(`
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
`);
const graphqlResolvers = {
    productById({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield dataSchema_1.productModel.findById(id);
            return found;
        });
    },
    createProducts({ products }) {
        return __awaiter(this, void 0, void 0, function* () {
            const created = yield Promise.all(products.map((item) => __awaiter(this, void 0, void 0, function* () {
                const product = yield dataSchema_1.productModel.create({
                    _id: new mongodb_1.ObjectId(),
                    name: item.name
                });
                return product;
            })));
            return created;
        });
    },
    updateProductById({ id, update }) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield dataSchema_1.productModel.findById(id);
            if (!found) {
                throw new Error(`Product ${id} not found`);
            }
            // @ts-ignore left hand assignment ts issue
            found.name = update.name;
            const saved = yield (found === null || found === void 0 ? void 0 : found.save());
            return saved;
        });
    },
    deleteProductById({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(id);
            yield dataSchema_1.productModel
                .deleteOne({ _id: id })
                .then(function () {
                console.log('Data deleted'); // Success
            })
                .catch(function (error) {
                console.log(error); // Failure
            });
            return true;
        });
    },
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
};
const server = (0, express_1.default)();
server.use(express_1.default.json());
server.all('/graphql', (0, express_2.createHandler)({
    schema: schema,
    rootValue: graphqlResolvers
}));
server.get('/_alive', (req, res) => {
    res.send('Good!');
});
(0, mongodb_2.connectMongodb)();
server.listen(3000);
console.log('Running a GraphQL API server at http://localhost:3000/graphql');
//# sourceMappingURL=server.js.map