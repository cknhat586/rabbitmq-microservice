import express from "express";
import { readFile } from 'fs/promises';

import validate from '../../middlewares/validate.mdw.js';
import model from "../../models/order.model.js";
import * as clientService from "../../services/client.service.js";

const create_schema = JSON.parse(await readFile(new URL('../../schemas/order/create_order.json', import.meta.url)));
const router = express.Router();

// Get Order By ID
router.get('/:id', async function (req, res) {
    const id = req.params.id || 0;
    const order = await model.findById(id);

    if (order == null) {
        return res.status(204).end();
    }

    res.json(order);
});

// Get All Order
router.get('/', async function (req, res) {
    const list = await model.findAll();
    res.json(list);
});

// Create mew Order
router.post('/', validate(create_schema), async function (req, res) {
    try {
        const {product_name} = req.body;
        await clientService.create(product_name, res);
        console.log(' [x] Done creating new order!');
    } catch (err) {
        res.status(500).json({
            message: 'Failed to create new order',
            //error: err.toString()
        });
    }
});

// Cancel Order
router.delete('/:id', async function (req, res) {
    try {
        const id = req.params.id || 0;
        await clientService.cancel(id, res);
    } catch (err) {
        res.status(500).json({
            message: 'Failed to cancel order',
            error: err.toString()
        });
    }
});

export default router;