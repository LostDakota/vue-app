var express    = require('express');
var pug        = require('pug');
var morgan     = require('morgan');
var bodyParser = require('body-parser');
var request    = require('request');
var sql        = require('mysql');
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
var connection = sql.createConnection({
  host     : 'localhost',
  user     : 'user',
  password : 'password',
  database : 'database'
});

connection.connect(function(err){
  if(!err)
    console.log('Connection successful');
  else
    console.log('Error making connection - ' + err);
});

app.get('/',function(req,res){
  connection.query('SELECT * from dm_Posts', function(err, rows, fields){
    posts = rows;
    res.render('home.pug',{"posts": posts});
  });
});

app.get('/create',function(req,res){
  res.render('create.pug');
})

app.get('/login',function(req,res){
  res.render('login.pug');
})

app.post('/create',function(req,res){
  connection.query('INSERT INTO dm_Posts (title,post) VALUE (?,?)',[req.body.title,req.body.content],
  function(err,result){
    res.redirect('/');
    res.end();
  });
})

app.post('/delete',function(req,res){
  connection.query('DELETE FROM dm_Posts WHERE id=?',[req.body.postId],
  function(err,result){
    res.redirect('/');
    res.end();
  })
})

app.get('/query',function(req,res){
  getPosts();
  res.send("Call made...",{"posts": posts});
  console.log(posts);
})

var server  = app.listen(PORT,function(){
  console.log("Server listening on http://localhost:" + PORT);
})
