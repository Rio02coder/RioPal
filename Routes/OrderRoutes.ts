import express from "express";
import { orderDatabase } from "../Database/dBinstances";

const router = express.Router();

const getError = (reason: string) =>
  reason === "" ? "Some error occurred" : reason;

// Router that handles GET requests for getting orders.
router.get("/", async (req, res) => {
  const orderId = Number(req.query.orderId);
  if (Number.isNaN(orderId)) {
    res.json({ Error: "The order id seems incorrect" });
    return;
  }
  orderDatabase
    .getOrder(orderId)
    .then((order) => {
      if (!order) {
        // Order Id might not exist in the database
        res.statusCode = 404;
        res.json({ Error: "No such order exists" });
      } else {
        res.json(order);
      }
    })
    .catch((reason) => {
      // Error situations like database failure are handled here
      res.statusCode = 500;
      res.json({ Error: getError(reason.message) });
    });
});

// Router that handles the POST request for adding requests.
router.post("/add", (req, res) => {
  const orderDetails = req.body;

  orderDatabase
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
  orderDatabase
    .deleteOrder(orderId)
    .then((order) => {
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
  // Handling incorrect format of order id.
  const orderId = Number(req.query.orderId);
  if (Number.isNaN(orderId)) {
    res.statusCode = 400;
    res.json({ Error: "The order id seems incorrect" });
    return;
  }

  // Handling incorrect format of payment reference.
  const paymentRequestBody = req.body;
  if (
    !paymentRequestBody["paymentReference"] ||
    Number.isNaN(Number(paymentRequestBody["paymentReference"]))
  ) {
    res.statusCode = 400;
    res.json({ Error: "No payment reference is provided" });
    return;
  }
  orderDatabase
    .completePaymentForOrder(orderId, paymentRequestBody["paymentReference"])
    .then((success) => {
      if (success) res.json({ message: "Payment has gone through" });
      else {
        res.statusCode = 500;
        res.json({
          message:
            "There has been a failure and we are unable to complete the payment for this order",
        });
      }
    })
    .catch((reason) => {
      // This handles cases like re payment for orders, insufficient amount
      // and wrong order id.
      res.statusCode = 400;
      res.json({ Error: getError(reason.message) });
    });
});

export default router;
