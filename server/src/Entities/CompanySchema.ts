import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      unique : true
    },
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
      unique : true
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const companyModel=mongoose.model("company",companySchema)