import express from 'express';
import route from './routes/index.js';
import * as rabbitReceiver from './middlewares/rabbitmq/receiver.js';

const app = express();

app.use(express.json());

rabbitReceiver.orderReceiver();

route(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Order Service is running at http://localhost:${PORT}`);
});