/////////////////////////////////////////////////////////////////
// MODULE DEPENDENCIES //////////////////////////////////////////
/////////////////////////////////////////////////////////////////
var path           = require('path');
var morgan         = require('morgan');
var methodOverride = require('method-override');
var bodyParser     = require('body-parser');

/////////////////////////////////////////////////////////////////
// CONFIGURATION ////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
module.exports = function(app, express) {

  console.log('///////////CONFIGURATION//////////////////');

  app.set('views', __dirname + '/../client/public/');

  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(express.static(path.join(__dirname, '/../client/public/')));
};
