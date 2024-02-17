import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { productRouter } from "../routes/products";
import { shoppingListRouter } from "../routes/shopping-list";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(productRouter);
app.use(shoppingListRouter);

export default app;