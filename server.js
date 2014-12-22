var restify = require('restify');
var mysql = require('mysql');

var config = require('./config.json');
console.log(config);


var connection = mysql.createConnection({
    host     : 'localhost',
    database : config['database'],
    user     : config['user'],
    password : config['password']
});


function getAllPaths(req, res, next) {
    console.log("test");
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
    var post  = {
        json: req.body.data
    };
    var query = connection.query('INSERT INTO path SET ?', post, function(err, result) {
    });
    res.send("");
    next();
}

var server = restify.createServer();

server.use(restify.bodyParser());

server.get('/path', getAllPaths);
server.post('/path', addPath);
server.get('/test', function(req, res, next){
    res.send("OK");
    next();
});

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});