import { companyClassModel, companyModel } from "../Entities/CompanySchema";
import { productModel } from "../Entities/ProductSchema";

export class CompanyService {
  async addCompanyService(item: Partial<companyClassModel>) {
    let result = await companyModel.create({
      ...item,
    });
    return result;
  }

  async getAllCompanyService() {
    let result = await companyModel
      .find()
      .select("companyName registrationNumber country website");

    return result;
  }

  async updateCompanyService(id: string, item: Partial<companyClassModel>) {
    console.log("item ==>", item);
    console.log("id ==>",id)
    let result = await companyModel.findByIdAndUpdate(
      id,
      {
        $set: {
          companyName: item.companyName,
          country: item.country,
          website: item.website,
          registrationNumber: item.registrationNumber,
        },
      },
      { new: true }
    );
      console.log("resultt ==<",result)
    return result;
  }

  async deleteCompanyService(id: string) {
    const company = await companyModel.findById(id);

    if (company) {
      await productModel.deleteMany({ company: company._id });
      let result = await companyModel.findByIdAndRemove(id);
      return result;
    } else {
      throw new Error("company not found");
    }
  }
}
