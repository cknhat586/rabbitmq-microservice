import amqp from 'amqplib/callback_api.js';

const message_queue = 'amqp://localhost';

export function send(exchange_name, message) {
    amqp.connect(message_queue, function (err0, connection) {
        if (err0) {
            throw err0;
        }

        connection.createChannel(function (err1, channel) {
            if (err1) {
                throw err1;
            }

            channel.assertExchange(exchange_name, 'fanout', {
                durable: false
            });

            channel.publish(exchange_name, '', Buffer.from(message));

            console.log(` [x] ${exchange_name} Service: Sent: ${message}`);
        });

        setTimeout(function () {
            connection.close();
        }, 500);
    });
}