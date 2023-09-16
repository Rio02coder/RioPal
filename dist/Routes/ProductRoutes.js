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
const dBinstances_1 = require("../Database/dBinstances");
const router = express_1.default.Router();
const getError = (reason) => reason === "" ? "Some error occurred" : reason;
// Router to get products.
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = Number(req.query.productId);
    if (Number.isNaN(productId)) {
        res.json({ Error: "The product id seems incorrect" });
        return;
    }
    dBinstances_1.productDatabase
        .getProduct(productId)
        .then((product) => {
        if (!product) {
            res.json({ Error: "No such product exists" });
        }
        else {
            res.json(product);
        }
    })
        .catch((reason) => {
        // Handles some DB failures
        res.statusCode = 400;
        res.json({ Error: getError(reason.message) });
    });
}));
// Router to add a product
router.post("/add", (req, res) => {
    const productDetails = req.body;
    dBinstances_1.productDatabase
        .addProduct(productDetails)
        .then((product) => {
        res.json(product);
    })
        .catch((reason) => {
        // Handles cases of DB failures and incorrect product fields.
        res.statusCode = 400;
        res.json({ Error: getError(reason.message) });
    });
});
router.delete("/delete", (req, res) => {
    const productId = Number(req.query.productId);
    if (Number.isNaN(productId)) {
        res.statusCode = 400;
        res.json({ Error: "The product id is either missing or seems incorrect" });
        return;
    }
    dBinstances_1.productDatabase
        .deleteProduct(productId)
        .then((product) => {
        res.json(product);
    })
        .catch((reason) => {
        // Handles cases of DB failures and deleting non existing products.
        res.statusCode = 400;
        res.json({ Error: getError(reason.message) });
    });
});
// Router to update a product.
router.patch("/update", (req, res) => {
    const productId = Number(req.query.productId);
    if (Number.isNaN(productId)) {
        res.statusCode = 400;
        res.json({ Error: "The product id seems incorrect" });
        return;
    }
    const updatedProductDetails = req.body;
    if (updatedProductDetails["id"] != null) {
        res.statusCode = 400;
        res.json({ Error: "The product id cannot be changed." });
        return;
    }
    dBinstances_1.productDatabase
        .updateProduct(productId, updatedProductDetails)
        .then((product) => {
        res.json(product);
    })
        .catch((reason) => {
        // This handles cases of DB failure and updating non existing products.
        res.statusCode = 400;
        res.json({ Error: getError(reason.message) });
    });
});
exports.default = router;
//# sourceMappingURL=ProductRoutes.js.map