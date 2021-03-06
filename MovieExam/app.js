/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/////////////////////////////////////////////////db 접속
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'didimdol'
});
 
connection.connect();
////////////////////////////////////////////////////////
var MongoClient = require('mongoDB').MongoClient
//Connection URL 
var url = 'mongodb://localhost:27017/didimdol';
 
var dbObj=null;
MongoClient.connect(url, function(err, db) {
	console.log("Connected correctly to server");
	dbObj=db;
});
//////////////////////////////////////////////////////
app.get('/', function(req, res) {
	connection.query("select * from movie", function(error, results, fields) {
	       if(error) res.send(error);
	       else{
	    	   var movie =dbObj.collection('movie');
	    	   movie.find({}).toArray(function(error,docs){
	    		   if (error) res.send(error);
	    		   else {
	    			   for (var i=0; i<results.length;i++){
	    				   for (var j=0; j<docs.length;j++){
	    					   if (results[i].no==docs[j].no) {
	    						   results[i].review=docs[j].review;
	    						   break;
	    					   }
	    				   }
	    			   }
	    			   res.send(JSON.stringify(results));
	    		   }
	    	   });
	      }
	});
   /*connection.query('select * from movie', 
         function(error, results, fields) {
        if(error) res.send(error);
        else res.send(JSON.stringify(results));
      });*/
});

app.get('/movie', function(req, res) {
	console.log(req.query.no);
   connection.query('select * from movie where no=?', Number(req.query.no),
		   //----------------------------------------		   
         function(error, results, fields) {
        if(error) res.send(error);
        else res.send(JSON.stringify(results));
      });
      //connection.end();
});

app.post('/',function(req,res){
	connection.query("INSERT INTO movie SET ?",
			{
				name : req.body.title/*,
				director: req.body.director*/
			},
			function (error, result) {
		if(error) res.send(error);
		else{
			if (req.body.review !=undefined){
				var movie = dbObj.collection('movie');
				movie.save({
					no:result.insertId,
					review:req.body.review
				}, function(err2,result2){
					res.send(JSON.stringify(result));
				});
			} else {
				res.send(JSON.stringify(result));
			}
		}
	});	
	/*	connection.query('INSERT INTO movie SET ?',
			{
				no:Number(req.body.no),
				name:(req.body.name),
				rate:Number(req.body.rate),
				country:(req.body.country)
			},
			function (error, result) {
		if(error) res.send(error);
		else res.send(JSON.stringify(result));
	});*/
});

app.put('/',function(req,res){
	connection.query("delete from movie",
			function(err,result){
		console.log(req.body.movies);
		var movies=JSON.parse(req.body.movies);
		console.log(movies.length);
		for (var i=0; i<movies.length;i++){
		connection.query("insert into movie set ?",
				movies[i],
				function(err,result){
			});
		}
	});
	
	/*	connection.query("delete from movie",
			function(err,result){
		console.log(req.body.movies);
		var movies=JSON.parse(req.body.movies);
		console.log(movies.length);
		for (var i=0; i<movies.length;i++){
		connection.query("insert into movie set ?",
				movies[i],
				function(err,result){
			});
		}
	});*/
});

app.put('/movie',function(req,res){
	connection.query("UPDATE movie SET ? where no=?",
			[{
				name:(req.body.name),
				rate:Number(req.body.rate),
				country:(req.body.country)
			}, Number(req.body.no)],
			function (error, result) {
		if (error) res.send(error);
		else {
			if (req.body.review!=undefined){
				var movie = dbObj.collection('movie');
				movie.update({no:Number(req.body.no)},
						{'$set':{review:req.body.review}},
						function(err2,result2){
							res.send(JSON.stringify(result));
						});
			} else {
				res.send(JSON.stringify(result));
			}
		}
	});
	/*	connection.query('UPDATE movie SET ? where no=?',
			[{
				name:(req.body.name),
				rate:Number(req.body.rate),
				country:(req.body.country)
			}, Number(req.body.no)],
			function (error, result) {
		if (error) res.send(error);
		else res.send(JSON.stringify(result));
	});*/
});

app.delete('/',function(req,res){
	connection.query('DELETE FROM movie',
			function (error, result) {
		if (error) res.send(error);
		else res.send(JSON.stringify(result));
	});
});

app.delete('/movie',function(req,res){
	connection.query("DELETE FROM movie where no=?",
			Number(req.body.no),
			function (error, result) {
		if (error) res.send(error);
		else {
			var movie=dbObj.collection('movie');
			movie.remove({no:Number(req.body.no)},
					function(err2,result2){
				res.send(JSON.stringify(result));
			});
		}
	});
	
	/*	connection.query('DELETE FROM movie where no=?',
				Number(req.body.no),
			function (error, result) {
		if (error) res.send(error);
		else res.send(JSON.stringify(result));
	});*/
});


//app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
 });