$(document).ready( function () {
  console.log("got into script");
  $("#basic").submit(function(ev) {
    var url = '0.0.0.0:8080/test';
   $.getJSON("http://0.0.0.0:8080/test", function(data) {
     $('#result').text(data.message);
     }
    );
   ev.preventDefault();
  });
});