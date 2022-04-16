import axios from 'axios';

export async function workOrderWorker(id) {
    await axios({
        method: 'post',
        url: `http://localhost:5000/api/factory/${id}`
    }).then(function (res) {
        console.log(' [x] Done working on order!');
    });
}
