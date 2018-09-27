// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  //console.log('hello world :o');
  
  var socket = io();
  
  var $command = $('.command');
  var $input = $command.find('input');
  var $scrollback = $('.scrollback');
  var $new = $('.new-connection');
  
  // Sends a command
  var sendCommand = function () {
    var command = $input.val();

    // if there is a non-empty message and a socket connection
    // if (message && connected) {
      $input.val(command);
      $input.select();
      // tell server to execute 'new message' and send along one parameter
      socket.emit('new command', {
        command: command
      });
    // }
  }

  // Main command input
  $input.keydown(function(event) {
    
    // var command = $input.val();
    
    // Enter key
    if (event.which === 13) {
    
      sendCommand();
      
    }
    
  });
  
  $scrollback.on('echo', function(event,echo){
    $('<div class="echo">').text(echo).appendTo($scrollback);
    $scrollback.trigger('updateScroll');
  });
  
  $scrollback.on('output', function(event,output){
    $('<div class="output">').text(output).appendTo($scrollback);
    $scrollback.trigger('updateScroll');
  });
  
  $scrollback.on('updateScroll', function(event){
    $scrollback[0].scrollTop = $scrollback[0].scrollHeight;
  });
  
  $new.on('click',function(e){
    var host = prompt("Please enter a host","");
    alert("host: " + host);
  });
  
  // Whenever the server emits 'echo', check if user wants the echo
  socket.on('echo', function (data) {
    console.log('socket echo');
    $scrollback.trigger('echo',data.echo);
  });

  // Whenever the server emits 'echo', check if user wants the echo
  socket.on('output', function (data) {
    console.log('socket echo');
    $scrollback.trigger('output',data.output);
  });


});
