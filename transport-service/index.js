import express from 'express';
import route from './routes/index.js';
import * as rabbitReceiver from './middlewares/rabbitmq/receiver.js';

const app = express();

app.use(express.json());

rabbitReceiver.transportReceiver();

route(app);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`Transport Service is running at http://localhost:${PORT}`);
});