import { Router } from "express";
import { getFinancial, postFinancial, postSumFinancial } from "../controllers/financialController.js";

const financialRouter = Router()


financialRouter.post("/financial-events", postFinancial)
financialRouter.get("/financial-events", getFinancial)
financialRouter.post("/financial-events/sum", postSumFinancial)

export default financialRouter;