$(document).ready(function() {
  $('#save').click(saveFile);
});

var saveFile = function() {
  $('#savenotify').toggleClass('hidden');
  console.log($('#editor').html());
}