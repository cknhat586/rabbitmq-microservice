import generate from './generic.model.js';
import db from '../utils/db.js';

const table_name = 'order';
const id_field = 'order_id';

const model = generate(table_name, id_field);

model.updateStatus = function (id, new_status) {
    return db(table_name).where(id_field, id).update({
        status: new_status
    });
}

export default model;

