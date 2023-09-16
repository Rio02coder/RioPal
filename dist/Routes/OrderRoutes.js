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
// Router that handles GET requests for getting orders.
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = Number(req.query.orderId);
    if (Number.isNaN(orderId)) {
        res.json({ Error: "The order id seems incorrect" });
        return;
    }
    dBinstances_1.orderDatabase
        .getOrder(orderId)
        .then((order) => {
        if (!order) {
            // Order Id might not exist in the database
            res.statusCode = 404;
            res.json({ Error: "No such order exists" });
        }
        else {
            res.json(order);
        }
    })
        .catch((reason) => {
        // Error situations like database failure are handled here
        res.statusCode = 500;
        res.json({ Error: getError(reason.message) });
    });
}));
// Router that handles the POST request for adding requests.
router.post("/add", (req, res) => {
    const orderDetails = req.body;
    dBinstances_1.orderDatabase
        .addOrder(orderDetails)
        .then((order) => {
        res.json(order);
    })
        .catch((reason) => {
        // This handles situations where the schema of the JSON
        // in the request body is not proper schema for an Order.
        res.statusCode = 400;
        res.json({ Error: getError(reason.message) });
    });
});
// Router that handles the deletion of orders.
router.delete("/delete", (req, res) => {
    const orderId = Number(req.query.orderId);
    if (Number.isNaN(orderId)) {
        res.statusCode = 400;
        res.json({ Error: "The order id seems incorrect" });
        return;
    }
    dBinstances_1.orderDatabase
        .deleteOrder(orderId)
        .then((order) => {
        // if (!order) {
        //   // Order Id might not exist in the database
        //   res.statusCode = 404;
        //   res.json({
        //     Error: "No such order exist. Can't delete a non existing order",
        //   });
        // } else {
        //   // Returning the deleted order.
        //   res.json(order);
        // }
        res.json(order);
    })
        .catch((reason) => {
        // Error situations like database failure are handled here
        res.statusCode = 400;
        res.json({ Error: getError(reason.message) });
    });
});
// Router that handles the payment of orders.
router.post("/pay", (req, res) => {
    const orderId = Number(req.query.orderId);
    if (Number.isNaN(orderId)) {
        res.statusCode = 400;
        res.json({ Error: "The order id seems incorrect" });
        return;
    }
    const paymentRequestBody = req.body;
    if (!paymentRequestBody["paymentReference"] ||
        Number.isNaN(Number(paymentRequestBody["paymentReference"]))) {
        res.statusCode = 400;
        res.json({ Error: "No payment reference is provided" });
        return;
    }
    dBinstances_1.orderDatabase
        .completePaymentForOrder(orderId, paymentRequestBody["paymentReference"])
        .then((success) => {
        if (success)
            res.json({ message: "Payment has gone through" });
        else {
            res.statusCode = 500;
            res.json({
                message: "There has been a failure and we are unable to complete the payment for this order",
            });
        }
    })
        .catch((reason) => {
        // This handles cases like re payment for orders, insufficient amount
        // empty payment reference and wrong order id.
        res.statusCode = 400;
        res.json({ Error: getError(reason.message) });
    });
});
exports.default = router;
//# sourceMappingURL=OrderRoutes.js.map