var express = require('express'),
    bodyParser = require('body-parser');

var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', function (req, res) {
  var vm = Fsjs.DataServices.defaultPageData('', 'root@localhost.org', 12);
  vm.Title = "Form-app - form page"
  res.render('form', vm);
});

router.post('/', urlencodedParser, function(req, res){
    var responsePageData = Fsjs.DataServices.defaultPageData( req.body.nameField, req.body.emailAddressField, req.body.ageField);

    Fsjs.FormValidation.validateForm(req.body, responsePageData)
        .then(function(valid){
            if (valid){
                res.render('valid-posted-form', responsePageData);
            } else {
                res.render('form', responsePageData);
            }
        });
});

router.get('/emailAddressIsBlacklisted', function(req, res){
    res.json(Fsjs.DataServices.getEmailBlacklist().indexOf(req.query.emailAddress) != -1);
});

module.exports = router;