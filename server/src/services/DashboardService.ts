import { companyModel } from "../Entities/CompanySchema";
import { productModel } from "../Entities/ProductSchema";

export class DashboardService {
  async getCompanyAndProductCount() {
    try {
      const companyCount = await companyModel.countDocuments().exec();
      const productCount = await productModel.countDocuments().exec();

      const stockCount = await productModel
        .aggregate([
          {
            $group: {
              _id: null,
              totalQuantity: { $sum: "$quantity" },
            },
          },
          {
            $project: {
              _id: 0,
              totalQuantity: 1,
            },
          },
        ])
        .exec();

      let countryData = await companyModel.aggregate([
        {
          $group: {
            _id: "$country",
            totalCompanies: { $sum: 1 },
          },
        },
        {
          $sort: { totalCompanies: -1 },
        },
        {
          $limit: 1,
        },
      ]);
      let lastCompany = await companyModel.findOne({}, { createdAt: 0, updatedAt: 0, _id: 0 }).sort({ $natural: -1 }).exec();
      let lastProduct = await productModel.findOne({}, { createdAt: 0, updatedAt: 0, _id: 0 }).sort({ $natural: -1 }).exec();


      return {
        companyCount,
        productCount,
        stockCount: stockCount[0]?.totalQuantity,
        countryData: {
          name: countryData[0]._id,
          totalCompanies: countryData[0].totalCompanies,
        },
        lastCompany,
        lastProduct
      };
    } catch (error) {
      return error.message;
    }
  }
}
