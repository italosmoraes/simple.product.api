"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongodb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const environment_1 = require("../environment");
const env = process.env.TARGET_ENV || 'dev';
const connectMongodb = () => {
    mongoose_1.default.connect(environment_1.MONGODB_URI);
    const connection = mongoose_1.default.connection;
    connection.once('open', function () {
        console.log('MongoDB database connection established successfully');
    });
    connection.on('error', () => {
        console.error('Error while connecting to DB');
    });
};
exports.connectMongodb = connectMongodb;
//# sourceMappingURL=mongodb.js.map