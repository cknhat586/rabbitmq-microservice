import express from "express";
import clientRoute from "./factory.route.js";

const router = express.Router();

router.use('/factory', clientRoute);

export default router;