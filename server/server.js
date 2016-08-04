var express = require('express');
var path = require('path');
var config = require('../webpack.config.js');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var Todos = require('../models/todos');
var Users = require('../models/users');

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
app.use(webpackHotMiddleware(compiler));

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/todo-app");

//////////////REST API/////////////////////
app.get('/', function (req, res) {
    res.sendFile(path.resolve('client/index.html'));
});

app.get('/api/Todos/:userId', function(req, res){
	var query = {user_id: parseInt(req.params.userId)};
	Todos.Todo.find(query, function(err, findResult){
		if(err){
			throw err;
		}
		res.json(findResult);
	}); 
});

app.post('/api/Todos', function(req, res){
	var todoItem = req.body;
	Todos.Todo.create(todoItem, function(err){
		if(err){
			throw err;
		}
		res.json(todoItem);
	});
});

app.get('/api/todos_login/:username', function(req, res){
	console.log("login");
	var username = req.params.username;
	Users.User.findOne({name: username}, function(err, result){
		res.json(result);
	});

});

app.post('/api/Todos/:id', function(req, res){
	var queryId = req.params.id;
	var updatedTodo = req.body;
	Todos.Todo.findOneAndUpdate({id: queryId}, updatedTodo, {}, function(err){
		if(err){
			throw err;
		}
		res.json(updatedTodo);
	});
});

app.post('/api/delete_todo/:id', function(req, res){
	var queryId = req.params.id;
	Todos.Todo.remove({id: queryId}, function(err){
		if(err){
			throw err;
		}
		res.json();
	});
});

////////////////////////////////////////////

var port = 3000;

app.listen(port, function(error) {
  if (error) throw error;
  console.log("Express server listening on port", port);
});
