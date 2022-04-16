import express from "express";

const router = express.Router();

router.get('/err', function (req,res) {
    throw new Error('Error!');
});

router.get('/', function(req,res) {
    res.json({
        msg: 'Hello from ExpressJS'
    })
});

router.post('/', function (req,res) {
    res.status(201).json({
        msg: 'Data created'
    });
});

router.use(function (req,res) {
    res.status(404).json({
        error: 'Endpoint not found'
    });
});

router.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500).json({
        error: 'Something wrong'
    });
});

export default router;