import express from "express";
import orderRoute from "./order.route.js";

const router = express.Router();

router.use('/order', orderRoute);

export default router;