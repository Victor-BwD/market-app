import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { productRouter } from "../routes/products";
import { shoppingListRouter } from "../routes/shopping-list";
import { categoriesRouter } from "../routes/categories";

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:8080", "http://localhost:5173"],
};

const app = express();

app.use((req, res, next) => {
  res.setHeader("Accept", "application/json");
  res.set("Access-Control-Expose-Headers", "X-Total-Count");
  next();
});

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use(productRouter);
app.use(shoppingListRouter);
app.use(categoriesRouter);

export default app;