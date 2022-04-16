import express from 'express';
import route from './routes/index.js';
import * as rabbitReceiver from './middlewares/rabbitmq/receiver.js';

const app = express();

app.use(express.json());

rabbitReceiver.factoryReceiver();

route(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Factory Service is running at http://localhost:${PORT}`);
});