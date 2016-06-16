var express    = require('express');
var pug        = require('pug');
var morgan     = require('morgan');
var bodyParser = require('body-parser');
var request    = require('request');
var sql        = require('mssql');
var app        = express();

const PORT     = 3333;

var users = '';
var newPost = '';
var posts = '';

app.use(morgan('combined'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//SQL STUFF
function getPosts() {
  sql.connect("mssql://dmika:Thisismypassword!@localhost/SQLEXPRESS/Node").then(function(){
    new sql.Request().query('select * from dm_Posts').then(function(recordset){
      posts = recordset;
    }).catch(function(err){
      console.log("Something happened... ",err);
    })
  })
}

app.get('/',function(req,res){
  request('http://jsonplaceholder.typicode.com/users',function(error,response,body){
    if(!error && response.statusCode == 200){
      users = JSON.parse(body);
      res.render('home.pug',{"users": users});
    }
  })
});

app.get('/create',function(req,res){
  res.render('create.pug');
})

app.post('/create',function(req,res){
  res.render('bounce.pug',{"status":req.body});
})

app.get('/query',function(req,res){
  getPosts();
  res.send("Call made...",{"posts": posts});
  console.log(posts);
})

var server  = app.listen(PORT,function(){
  console.log("Server listening on http://localhost:" + PORT);
})
