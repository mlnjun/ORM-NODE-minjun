var express = require('express');
var router = express.Router();

router.get('/join', function(req, res){
  res.render('member/join');
})

router.get('/entry', function(req, res){
  res.render('member/entry');
})

router.post('/entry', function(req, res){
  
  var newEmail = req.body.email;
  var newPassword = req.body.password;

  res.redirect('/member/join');
})


module.exports = router;