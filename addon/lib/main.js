/* (c) 2014 Michael Penhallegon
 */

// import libs
var notifications = require("sdk/notifications");
var tabs = require("sdk/tabs");
var Request = require("sdk/request").Request;
var self = require("sdk/self");
var panels = require("sdk/panel");
var request = require("sdk/request");
var timer = require("sdk/timers");
var { ActionButton } = require('sdk/ui/button/action');

// setup work_state hold state of which work is at, set time length

var work_state = 0; /* sets the state for the button: 0 for inactive, 1 for
                    *  active and 2 for break
                    */

var timer_length_work= .5 * 60 * 1000; // set to a default of 20 minutes
var timer_length_break= .1 * 60 * 1000; // set to a default of 5 minutes
var icon_active_prefix = "icon-active-";
var icon_inactive_prefix = "icon-";
var icon_break_prefix = "icon-break-";

/*     Objects     */

//creats button object
var button = ActionButton({
  id: "workstage-button",
  label: "Start workstage",
  icon: {
    "16": "./"+icon_inactive_prefix+"16.png",
    "32": "./"+icon_inactive_prefix+"32.png",
    "64": "./"+icon_inactive_prefix+"64.png"
  },
  onClick: handleClick
});

/*    Handlers    */

//handler for change
function handleClick(state) {

  // if statements to handle which color to show button 
  if (work_state == 0) {
    button.state("window", {
      icon : {
        "16": "./"+icon_active_prefix+"16.png",
        "32": "./"+icon_active_prefix+"32.png",
        "64": "./"+icon_active_prefix+"64.png"
      }
    });
    work_state = 1;
    timer.setInterval(handleStageEnd, timer_length_work);
    startWorkStage(work_state);
    notifications.notify({
      title:"Stage Started!",
      text: ""
    });
  } if (work_state == 2) {
    button.state("window", {
      icon : {
        "16": "./"+icon_break_prefix+"16.png",
        "32": "./"+icon_break_prefix+"32.png",
        "64": "./"+icon_break_prefix+"64.png"
      }
    });
    timer.setInterval(handleStageEnd, timer_length_break);
    work_state = 0;
    notifications.notify({
      title:"Break Done!",
      text: "your break is done return to your browser to start a new workstage"
    });
  }
}

//triggered when workstage ends
function handleStageEnd() {
  button.state("window",{
    icon : {
        "16": "./"+icon_inactive_prefix+"16.png",
        "32": "./"+icon_inactive_prefix+"32.png",
        "64": "./"+icon_inactive_prefix+"64.png"
    }
  });
  if (work_state == 1) {
    work_state = 2;
    notifications.notify({
      title: "Stage Done!",
      text: "The workstage you were is done! click the icon again to go on a 5 minute break",
    });
  }

}

//send request to create work stage/break stage
function startWorkStage(stage_type) {
  var stage_length = 0;
  if (stage_type == "work"){
    stage_length = timer_length_work/6000;
  } if (stage_type == "break") {
    stage_length == timer_length_break/6000;
  }
  var newStage = Request({
    url:"http://localhost:8080/latest/",
    content: {startTimeStamp: Date.now(),
      type:stage_type,
      interval:stage_length
    },
    contentType: "application/json"
  }).post();

}

