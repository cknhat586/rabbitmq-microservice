import axios from 'axios';

export function confirmOrderWorker(id) {
    axios({
        method: 'post',
        url: `http://localhost:4000/api/order/${id}`
    }).then(function (res) {
        console.log(' [x] Done confirming new order!');
    });
}
