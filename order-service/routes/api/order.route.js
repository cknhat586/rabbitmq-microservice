import express from "express";
import * as orderService from "../../services/order.service.js";

const router = express.Router();

// Confirm Order
router.post('/:id', async function (req, res) {
    const id = req.params.id || 0;
    try {
        await orderService.confirm(id, res);
    } catch (err) {
        res.status(500).json({
            message: 'Failed to confirm new order',
            //error: err.toString()
        });
    }
});

export default router;