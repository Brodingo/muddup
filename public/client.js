// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  //console.log('hello world :o');
  
  var $command = $('.command');
  var $input = $command.find('input');
  var $output = $('.output');
  
  $command.submit(function(event) {
    event.preventDefault();
    var command = $input.val();
    
    $output.trigger('update', command);
    
    $input.val(command);
    $input.select();
  });
  
  $output.on('update', function(event,command){
    $('<div class="echo">').text(command).appendTo($output);
    $output.trigger('updateScroll');
  });
  
  $output.on('updateScroll', function(event){
    $output[0].scrollTop = $output[0].scrollHeight;
  });

});
