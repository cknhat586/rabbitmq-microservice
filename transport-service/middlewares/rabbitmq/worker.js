import axios from 'axios';

export function transportOrderWorker(id) {
    axios({
        method: 'post',
        url: `http://localhost:6000/api/transport/${id}`
    }).then(function (res){
        console.log(' [x] Done delivering order!');
    });
}