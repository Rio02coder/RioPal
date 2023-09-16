import express from "express";
import { productDatabase } from "../Database/dBinstances";

const router = express.Router();

const getError = (reason: string) =>
  reason === "" ? "Some error occurred" : reason;

// Router to get products.
router.get("/", async (req, res) => {
  const productId = Number(req.query.productId);
  if (Number.isNaN(productId)) {
    res.json({ Error: "The product id seems incorrect" });
    return;
  }
  productDatabase
    .getProduct(productId)
    .then((product) => {
      if (!product) {
        res.json({ Error: "No such product exists" });
      } else {
        res.json(product);
      }
    })
    .catch((reason) => {
      // Handles some DB failures
      res.statusCode = 400;
      res.json({ Error: getError(reason.message) });
    });
});

// Router to add a product
router.post("/add", (req, res) => {
  const productDetails = req.body;

  productDatabase
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
  productDatabase
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
  productDatabase
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

export default router;
