import { Response, response } from "express";
import { companyModel } from "../Entities/CompanySchema";
import { ProductClassModel, productModel } from "../Entities/ProductSchema";

export class ProductService {
  async createProductService(item?: Partial<ProductClassModel>) {
    let result = await productModel.create(item);

    return result;
  }

  async getAllProductService() {
    let result = await productModel
      .find().select("productName category quantity unit company")
      .populate({
        path: "company",
        select: "companyName registrationNumber country website",
      })
      .exec();

    return result;
  }

  async updateProductService(id: string, item: Partial<ProductClassModel>) {
    console.log("item ==>", item);
    let result = await productModel.findByIdAndUpdate(
      id,
      {
        $set: {
          category: item.category,
          company: item.company._id,
          quantity: item.quantity,
          unit: item.unit,
          productName: item.productName,
        },
      },
      { new: true }
    );

    return result;
  }


  async deleteProductService(id:string)
  {      
    let data =  await productModel.findByIdAndRemove(id)

    if(data!=null)
    {
      return data
    }
    else{
      throw new Error("product not found")
    }

  }


}
