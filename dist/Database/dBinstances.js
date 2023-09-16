"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productDatabase = exports.orderDatabase = void 0;
const OrderManager_1 = __importDefault(require("../prisma/OrderManager"));
const ProductManager_1 = __importDefault(require("../prisma/ProductManager"));
exports.orderDatabase = new OrderManager_1.default();
exports.productDatabase = new ProductManager_1.default();
//# sourceMappingURL=dBinstances.js.map