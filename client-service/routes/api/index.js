import express from "express";
import clientRoute from "./client.route.js";

const router = express.Router();

router.use('/client', clientRoute);

export default router;