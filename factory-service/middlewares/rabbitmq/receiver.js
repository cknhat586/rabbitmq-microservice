import amqp from "amqplib/callback_api.js";
import * as worker from './worker.js';

const MESSAGE_QUEUE = 'amqp://localhost';
const CLIENT_EXCHANGE_NAME = 'Client';
const ORDER_EXCHANGE_NAME = 'Order';
const FACTORY_EXCHANGE_NAME = 'Factory';
const TRANSPORT_EXCHANGE_NAME = 'Transport';

export function factoryReceiver() {
    amqp.connect(MESSAGE_QUEUE, function (err0, connection) {
        if (err0) {
            throw err0;
        }

        connection.createChannel(function (err1, channel) {
            if (err1) {
                throw err1;
            }

            const subscribed = [ORDER_EXCHANGE_NAME]

            for (let i = 0; i < subscribed.length; i++) {
                channel.assertExchange(subscribed[i], 'fanout', {
                    durable: false
                });

                channel.assertQueue('', {
                    exclusive: true
                }, function (err2, q) {
                    if (err2) {
                        throw err2;
                    }

                    console.log(` [*] Factory waiting for messages in queue: ${q.queue}`);

                    channel.bindQueue(q.queue, subscribed[i], '');

                    channel.consume(q.queue, async function (message) {
                        if (message.content) {
                            const order = JSON.parse(Buffer.from(message.content));
                            console.log(` [x] Factory MQ received: ${JSON.stringify(order)}`);
                            await worker.workOrderWorker(order.order_id)
                        }
                    }, {
                        noAck: true
                    });
                });
            }
        });
    });
}
