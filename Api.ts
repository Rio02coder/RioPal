const express = require("express");
import productRouter from "./Routes/ProductRoutes";
import orderRouter from "./Routes/OrderRoutes";

const app = express();
app.use(express.urlencoded());
app.use(express.json());

app.use("/product", productRouter);
app.use("/order", orderRouter);

app.listen(3000, () => console.log("Server is running on port 3000"));
