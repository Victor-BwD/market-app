import { Router } from "express";
import { productUrls } from "./urls";
import { CreateProductController } from "../../../controller/product/create";
import { deleteProductController } from "../../../controller/product/delete";
import { listProductController } from "../../../controller/product/list";

const productRouter = Router();

productRouter.post(productUrls.main, CreateProductController);
productRouter.delete(productUrls.main + "/:id", deleteProductController);
productRouter.get(productUrls.main + "/:id", listProductController);

export { productRouter };