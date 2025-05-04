import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  CashPaymentController,
  paymentController,
  webhookStripe,
  getOrdersDetailsController,
} from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.post("/cash-on-delivery", auth, CashPaymentController);
orderRouter.post("/checkout", auth, paymentController);
orderRouter.post("/webhook", webhookStripe);
orderRouter.get("/order-list", auth, getOrdersDetailsController);

export default orderRouter;
