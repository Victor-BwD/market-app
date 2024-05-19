import { Router } from "express";
import { productUrls } from "./urls";
import { CreateProductController } from "../../../controller/product/create";
import { deleteProductController } from "../../../controller/product/delete";
import { listProductController } from "../../../controller/product/list";
import { editProductController } from "../../../controller/product/edit";

const productRouter = Router();

productRouter.post(productUrls.main, CreateProductController);
productRouter.delete(productUrls.main + "/:id", deleteProductController);
productRouter.get(productUrls.main + "/:id", listProductController);
productRouter.put(productUrls.main + "/:id", editProductController);

export { productRouter };