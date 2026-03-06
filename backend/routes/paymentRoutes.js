import { Router } from "express";
const router = Router();
import { createOrder, verifyPayment } from "../controllers/paymentController";

router.post("/order", createOrder);
router.post("/verify", verifyPayment);

export default router;
