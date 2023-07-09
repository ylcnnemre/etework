import express from "express"
import { DashboardController } from "../controller/DasboardController"

const dashboardRouter = express.Router()
const dashboardController : DashboardController = new DashboardController()

dashboardRouter.get("/get",dashboardController.getData)

export {
    dashboardRouter
}