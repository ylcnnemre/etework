import mongoose from "mongoose";

export class ProductClassModel {
  productName: string;
  category: string;
  quantity: number;
  unit: string;
  company: any;
}

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "company",
    required: true,
  },
},{
   timestamps : true,
   versionKey : false
});

export const productModel = mongoose.model("Product", productSchema);
