import express from "express";
import * as factoryService from "../../services/factory.service.js";

const router = express.Router();

// Work Order
router.post('/:id', async function (req, res) {
    try {
        const id = req.params.id || 0;
        await factoryService.working(id, res);
    } catch (err) {
        res.status(500).json({
            message: 'Failed to start working order',
            //error: err.toString()
        });
    }
});

export default router;