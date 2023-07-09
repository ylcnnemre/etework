import { Request, Response } from "express";
import { CompanyService } from "../services/CompanyService";
import { companySaveValidate } from "../Validators/CompanySaveValidator";
import { ValidationError } from "joi";

export class CompanyController {
  private companyService: CompanyService;

  constructor() {
    this.companyService = new CompanyService();

    this.getAllCompany = this.getAllCompany.bind(this);
    this.updateCompany = this.updateCompany.bind(this);
    this.addCompany = this.addCompany.bind(this);
    this.deleteCompany = this.deleteCompany.bind(this);
  }

  private errorFormat(error: ValidationError) {
    return error.details.map((item) => {
      return {
        type: item.context.label,
        msg: item.message,
      };
    });
  }

  async addCompany(req: Request, res: Response) {
    const { error, value } = companySaveValidate.validate(req.body);
    if (error) {
      let errors = this.errorFormat(error);
      return res.status(400).send({
        success: false,
        value: errors,
      });
    }

    let response = await this.companyService.addCompanyService(req.body);

    return res.json({
      success: true,
      value: response,
    });
  }

  async getAllCompany(req: Request, res: Response) {
    let data = await this.companyService.getAllCompanyService();

    res.json({
      success: true,
      value: data,
    });
  }

  async updateCompany(req: Request, res: Response) {
    try {
      const { _id, ...rest } = req.body;
      const { error, value } = companySaveValidate.validate(rest);
      if (error) {
        return res.status(400).json({
          success: false,
          value: this.errorFormat(error),
        });
      }
  
      
      let data = await this.companyService.updateCompanyService(_id, rest);

      return res.json({
        success: true,
        value: data,
      });
    } catch (err) {
      return res.json({
        success: false,
        value: err.message,
      });
    }
  }

  async deleteCompany(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (id) {
        console.log("req params ==>", req.params);
        let data = await this.companyService.deleteCompanyService(id);
        return res.json({
          success: true,
          values: data,
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        values: err.message,
      });
    }
  }
}
