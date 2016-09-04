Fsjs = require('./src/server-only/data-services').Fsjs;
Fsjs.FormValidation = require('./src/server-only/server-form-validation').Fsjs.FormValidation;

var express = require('express'),
    exphbs = require('express-handlebars'),
    app;

var homeRoute = require('./src/server-only/home-route');
var formRoute = require('./src/server-only/form-route');

app = express();

app.engine('.hbs', exphbs({defaultLayout: 'main', extname: 'hbs'}));
app.set('view engine', '.hbs');

app.use('/public', express.static('public'));
app.use('/public/common', express.static('src/common'));
app.use('/public/common', express.static('src/client-only'));

app.use('/', homeRoute);
app.use('/form', formRoute);

app.listen(3000, function () {
  console.log('server is listening on port 3000!');
});
