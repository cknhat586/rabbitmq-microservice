import * as rabbitSender from '../middlewares/rabbitmq/sender.js';
import model from '../models/order.model.js';
import sleep from "../utils/sleep.js";

const exchange_name = 'Factory';

export async function working(id, res) {
    let order = await model.findById(id);
    if (!order) {
        return res.status(400).json({
            error: 'Order does not exist'
        });
    }

    if (order.status != 'confirmed') {
        return res.status(400).json({
            error: `Cannot start working order when it is ${order.status}`
        });
    }
    console.log(` [x] ${exchange_name} Service: Working on order...`)

    sleep(3000);
    await model.updateStatus(id, 'worked');

    order.status = 'worked';

    const message = JSON.stringify(order);
    rabbitSender.send(exchange_name, message);

    return res.status(200).json({
        message: message
    });
}