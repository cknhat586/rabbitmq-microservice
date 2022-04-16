import * as rabbitSender from '../middlewares/rabbitmq/sender.js';
import model from '../models/order.model.js';
import sleep from "../utils/sleep.js";

const exchange_name = 'Order';

export async function confirm(id, res) {
    let order = await model.findById(id);
    if (!order) {
        return res.status(400).json({
            error: 'Order does not exist'
        });
    }

    if (order.status != 'created') {
        return res.status(400).json({
            error: `Cannot confirm order when it is ${order.status}`
        });
    }

    console.log(` [x] ${exchange_name} Service: Confirming new order...`)

    sleep(1000);
    await model.updateStatus(id, 'confirmed');

    order.status = 'confirmed';

    const message = JSON.stringify(order);
    rabbitSender.send(exchange_name, message);

    return res.status(200).json({
        message: message
    });
}