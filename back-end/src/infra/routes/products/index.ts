import { Router } from "express";
import { productUrls } from "./urls";
import { CreateProductController } from "../../../controller/product";

const productRouter = Router();

productRouter.post(productUrls.main, CreateProductController);

export { productRouter };