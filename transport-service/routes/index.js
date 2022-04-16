import apiRoute from './api/index.js';
import defaultRoute from './default.route.js';

function route(app) {
    app.use('/api', apiRoute);
    app.use('/', defaultRoute);
}

export default route;