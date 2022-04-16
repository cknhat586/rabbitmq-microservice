import * as rabbitSender from '../middlewares/rabbitmq/sender.js';
import model from '../models/order.model.js';
import sleep from "../utils/sleep.js";

const exchange_name = 'Transport';

export async function delivering(id, res) {
    let order = await model.findById(id);
    if (!order) {
        return res.status(400).json({
            error: 'Order does not exist'
        });
    }

    if (order.status != 'worked') {
        return res.status(400).json({
            error: `Cannot start delivering order when it is ${order.status}`
        });
    }

    console.log(` [x] ${exchange_name} Service: Delivering order...`)

    sleep(2000);
    await model.updateStatus(id, 'delivered');

    order.status = 'delivered';

    const message = JSON.stringify(order);
    rabbitSender.send(exchange_name, message);

    return res.status(200).json({
        message: message
    });
}