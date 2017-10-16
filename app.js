var http = require('http');
var express = require('express');
var path = require('path');
var debug = require('debug')('todos-api:server');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');

var port = normalizePort(process.env.PORT || '3000');
var index = require('./routes/index');
var todos = require('./routes/todos');

var app = express();
var upload = multer();
var server = http.createServer(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// using middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(upload.array());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
//console.log('Server listening at port : %s' + server.address().port);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort (val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError (error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening () {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}


// handling requests

app.use('/', index);
app.get('/todos', todos);
app.post('/todos', todos);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
