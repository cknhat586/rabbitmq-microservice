import express from "express";
import * as transportService from "../../services/transport.service.js";

const router = express.Router();

// Deliver Order
router.post('/:id', async function (req, res) {
    try {
        const id = req.params.id || 0;
        await transportService.delivering(id, res);
    } catch (err) {
        res.status(500).json({
            message: 'Failed to start delivering order',
            //error: err.toString()
        });
    }
});

export default router;