import * as rabbitSender from '../middlewares/rabbitmq/sender.js';
import model from '../models/order.model.js';

const exchange_name = 'Client';

export async function create(product_name, res) {
    let order = {
        product_name: product_name,
        status: 'created'
    }

    console.log(` [x] ${exchange_name} Service: Creating new order...`)
    const ret = await model.add(order);

    order = {
        order_id: ret[0],
        ...order
    }

    const message = JSON.stringify(order);
    rabbitSender.send(exchange_name, message);

    return res.status(200).json({
        message: message
    });
}

export async function cancel(id, res) {
    let order = await model.findById(id);
    if (!order) {
        return res.status(400).json({
            error: 'Order does not exist'
        });
    }

    if (order.status != 'created') {
        return res.status(400).json({
            error: `Cannot cancel order when it is ${order.status}`
        });
    }

    await model.updateStatus(id, 'canceled');

    order.status = 'canceled';

    const message = JSON.stringify(order);
    rabbitSender.send(exchange_name, message);

    return res.status(200).json({
        message: message
    });
}