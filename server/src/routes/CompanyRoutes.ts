import express from "express";
import { CompanyController } from "../controller/CompanyController";
const companyController: CompanyController = new CompanyController();
const companyRouter = express.Router();

companyRouter.post("/save", companyController.addCompany);
companyRouter.get("/getAll", companyController.getAllCompany);
companyRouter.post("/update", companyController.updateCompany);
companyRouter.delete("/:id", companyController.deleteCompany);
export { companyRouter };
