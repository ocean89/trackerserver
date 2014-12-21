var restify = require('restify');
var mysql = require('mysql');



var connection = mysql.createConnection({
  host     : 'mysql://$OPENSHIFT_MYSQL_DB_HOST:$OPENSHIFT_MYSQL_DB_PORT/',
  database : 'nodejs',
  user     : 'admin3EFrlvU',
  password : 'L7zfCc_Se35m',
});


function getAllPaths(req, res, next) {
	connection.connect(function(err) {
		connection.query('SELECT * FROM path', function(err, rows, fields) {
			if (err) throw err;
			
			var paths = [];
			
			for(path in rows){
				paths.push(rows[path].json);
			}
			
			res.send(JSON.stringify(paths));
		});

	});
  
  next();
}

function addPath(req, res, next) {
	var post  = {json: req.body.data};
	var query = connection.query('INSERT INTO path SET ?', post, function(err, result) {
	});
	res.send("");
	next();
}

var server = restify.createServer();

server.use(restify.bodyParser());

server.get('/path', getAllPaths);
server.post('/path', addPath);
server.post('/test', function(req, res, next){
	rest.send("OK");
	next();
});

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});