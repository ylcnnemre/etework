import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";
import { ProductClassModel } from "../Entities/ProductSchema";
import { productSaveValidator } from "../Validators/ProductSaveValidator";
import { ValidationError } from "joi";

export class ProductController {
  private readonly productService: ProductService;

  constructor() {
    this.productService = new ProductService();

    this.createProduct = this.createProduct.bind(this);
    this.getAllProduct = this.getAllProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  private errorFormat(error: ValidationError) {
    return error.details.map((item) => {
      return {
        type: item.context.label,
        msg: item.message,
      };
    });
  }

  async createProduct(req: Request, res: Response) {
    try {
      const { company, ...rest } = req.body;
      const { error, value } = productSaveValidator.validate(req.body);
      console.log("req body ==>", req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          value: this.errorFormat(error),
        });
      }
      const productData: Partial<ProductClassModel> = {
        ...rest,
        company: company,
      };

      let data = await this.productService.createProductService(productData);

      res.status(200).json({
        success: true,
        value: data,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        value: err.message,
      });
    }
  }

  async getAllProduct(req: Request, res: Response) {
    try {
      let data = await this.productService.getAllProductService();
      console.log("dataa ==>= ",data)
      res.status(200).send({
        success: true,
        value: data,
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        value: err.message,
      });
    }
  }

  async updateProduct(req: Request, res: Response) {
    try {
      const { _id, ...rest } = req.body;
      const { error, value } = productSaveValidator.validate(rest);
      if (error) {
        return res.status(400).json({
          success: false,
          value: this.errorFormat(error),
        });
      }
      let data = this.productService.updateProductService(_id, rest);
      return res.json({
        success: true,
        value: data,
      });
    } catch (err) {                       // 500 durumu bütün controllerılarda kontrol edilmeli
      return res.status(400).json({
        success: false,
        value: err.message,
      });
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      let data = await this.productService.deleteProductService(id);
      res.status(200).json({
        success: true,
        value: data,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        value: err.message,
      });
    }
  }
}
