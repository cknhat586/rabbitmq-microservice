import express from "express";
import transportRoute from "./transport.route.js";

const router = express.Router();

router.use('/transport', transportRoute);

export default router;