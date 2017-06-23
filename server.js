var path = require('path'),
    request = require('request'),
    express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    cors = require('cors');
    mysql = require('mysql');
    pug = require('pug');

var app = express();
app.set('port', (process.env.PORT || 4006));
app.set('view engine', 'pug');
app.use(cors());
app.use(session({ secret: 'anything', resave: true, saveUninitialized: true }));
app.use(passport.initialize()); app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public'))); app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));
app.locals.site = {
  title: 'Home'
};

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

app.post('/login', function(req, res){
  console.log(req.body);
  var html = pug.renderFile('logged.pug',{});
  var userData = getUser(req.body.user,req.body.password);
  if (userData != null) {
      res.send(html);
  }   else {
      res.send(html);
  }

     res.send(res.render('logged'));



});

function getConnection () {
   return mysql.createConnection({
      host     :  'localhost',
      user     :  'root',
      password :  'eve9397',
      database :  'enrouteDB',
   });
}

function getUser (user,pass) {
   var personList = [];
   var user;
   var connection = getConnection();
   connection.connect();

   connection.query('SELECT user,pasword,name,lastname FROM users WHERE user="' + user + '" AND password="' + pass + '";', function (err,rows,fields) {
      if (err) {
      } else {
         user = {
            'user'      :  rows[0].user,
            'password'  :  rows[0].password,
            'name'      :  rows[0].name,
            'lastname'  :  rows[0].lastname,
         }
      }

   });
   connection.end();
   return user;
}
