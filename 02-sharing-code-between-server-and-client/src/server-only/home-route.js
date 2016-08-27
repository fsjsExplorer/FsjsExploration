var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', {Title: "Form-app - home page"});
});

module.exports = router;