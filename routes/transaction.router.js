var express  = require('express');
var router = express.Router();

var db = require('../db');

router.get('/' , (req, res)=>{
    res.render('transaction/transaction');
})
router.get('/create',(req,res)=>{
    res.render('transaction/create');
})


router.post('/' , (req ,res)=>{
    db.get('transaction').push(req.body).write();
    res.redirect('/transaction');
})

module.exports = router;
