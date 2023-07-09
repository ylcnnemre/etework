import { Request, Response } from "express";
import { DashboardService } from "../services/DashboardService";

export class DashboardController {
  private readonly dashboardService: DashboardService;

  constructor() {
    this.dashboardService = new DashboardService();
    this.getData = this.getData.bind(this);
  }

  async getData(req: Request, res: Response) {
    try {
      let data = await this.dashboardService.getCompanyAndProductCount();
      return res.status(200).json({
        success: true,
        value: data,
      });
    } catch (err) {
      return res.status(400).json({
        success: true,
        value: err.message,
      });
    }
  }
}
