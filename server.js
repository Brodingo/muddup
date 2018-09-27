// Setup express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function(){
  console.log('Server listening at port %d', port);
});

sassMiddleware = require("node-sass-middleware");

app.use(sassMiddleware({
  src: __dirname + '/public',
  dest: '/tmp',
  //debug: true,
  //outputStyle: 'compressed',
}));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(express.static('/tmp'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  // When the client emits 'new command', this listens and executes
  socket.on('new command', function (data) {
    
    var command = data.command;
    
    console.log('Command received: ' + command);
    // We tell the client to execute 'echo'
    socket.emit('echo', {
      echo: command
    });
    
    socket.emit('output', {
      output: 'Command to send to thing: ' + command
    });
    
  });

  
});