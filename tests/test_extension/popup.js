var INTERVAL = 0.25;
var URL='http://127.1.1.1:8080/latest/';
testdate = 1395005507277;
$(document).ready( function () {
  $("#start").click(function(ev) {
    startTimeStamp = Date.now();
    data = {
      "interval":INTERVAL,
      "startTimeStamp":startTimeStamp,
      "type":"work"
    };
    $.post(URL,data, function() {$('#result').text("start request success");});
  });
  $("#retrieve").click(function(){
    
    timenow = Date.now;
    $.ajax({
      type:"GE",
      url: URL,
      dataType: 'json',
      success: function(data) {
        endtime = new Date(data.properties.end_time)
       $('#result').text("current stage ends at: "+endtime.toLocaleTimeString());
      }
    });
  });
});