var express = require('express');
var router = express.Router();
// shortid de sinh ngau nhien id cua sach
const shortid = require('shortid');

var db = require('../db');

router.get('/',(req, res)=>{
    res.render('users/index',{
        users:db.get('users').value()
    })
})
router.get('/create' , (req,res)=>{
    res.render('users/create');
})
router.get('/edit/:id' ,(req,res)=>{
    var id = req.params.id;
    res.render('users/edit',{
        user: db.get('users').find({id:id}).value()
    })
})
router.get('/delete/:id' , (req, res)=>{
    var id = req.params.id;
    db.get('users').remove({id:id}).write();
    res.redirect('/users');
})


router.post('/create',(req,res)=>{
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
})
router.post('/edit/:id' , (req,res)=>{
    var id = req.params.id;
    var name = req.body.name;
    var user = db.get('users').find({id:id}).value();
    user.name = name;
    res.redirect('/users');
})


module.exports = router;