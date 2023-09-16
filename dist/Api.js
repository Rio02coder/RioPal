"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const ProductRoutes_1 = __importDefault(require("./Routes/ProductRoutes"));
const OrderRoutes_1 = __importDefault(require("./Routes/OrderRoutes"));
const app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use("/product", ProductRoutes_1.default);
app.use("/order", OrderRoutes_1.default);
app.listen(3000, () => console.log("Server is running on port 3000"));
//# sourceMappingURL=Api.js.map