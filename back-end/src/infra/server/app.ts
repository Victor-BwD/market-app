import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { productRouter } from "../routes/products";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(productRouter);

export default app;