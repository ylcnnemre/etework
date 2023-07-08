import express from "express"
import { ProductController } from "../controller/ProductController"

const productRoutes = express.Router()
const productController = new ProductController()
productRoutes.post("/create",productController.createProduct)
productRoutes.get("/getAll",productController.getAllProduct)
productRoutes.post("/update",productController.updateProduct)
productRoutes.delete("/:id",productController.deleteProduct)
export {
    productRoutes
}