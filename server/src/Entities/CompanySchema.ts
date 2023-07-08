import { number } from "joi";
import mongoose from "mongoose";

export class companyClassModel {
  companyName: string;
  registrationNumber: number;
  country: string;
  website: string;
}

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    registrationNumber: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const companyModel = mongoose.model("company", companySchema);
