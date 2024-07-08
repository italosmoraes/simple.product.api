"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModel = exports.producerModel = exports.Product = exports.Producer = void 0;
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
exports.Producer = new mongoose_1.default.Schema({
    _id: {
        type: mongodb_1.ObjectId
    },
    name: {
        type: String
    },
    country: {
        type: String
    },
    region: {
        type: String
    }
});
exports.Product = new mongoose_1.default.Schema({
    _id: {
        type: mongodb_1.ObjectId
    },
    vintage: {
        String
    },
    name: {
        type: String
    },
    producerId: {
        type: mongodb_1.ObjectId
    },
    producer: {
        type: exports.Producer
    }
});
exports.producerModel = mongoose_1.default.model('Producers', exports.Producer);
exports.productModel = mongoose_1.default.model('Products', exports.Product);
//# sourceMappingURL=dataSchema.js.map