/* (c) 2014 Michael Penhallegon
 */

// import libs
var notificatons = require("sdk/notifications");
var tabs = require("sdk/tabs");
var Request = require("sdk/request").Request;
var self = require("sdk/self");
var panel = require("sdk/panel");
var timer = require("sdk/timers");
var { ToggleButton } = require('sdk/ui/button/toggle');

// setup work_state hold state of which work is at, set time length

var work_state = 0; /* sets the state for the button: 0 for inactive, 1 for
                    *  active and 2 for break
                    */

var timer_length_work= 25 * 60 * 1000; // set to a default of 20 minutes
var timer_length_break= 5 * 60 * 1000; // set to a default of 5 minutes
var icon_active_prefix = "icon-active-";
var icon_inactive_prefix = "icon-";
var icon_break_prefix = "icon-break-";

/*     Objects     */

//creats button object
var button = ToggleButton({
  id: "workstage-button",
  label: "Start workstage",
  icon: {
    "16": "./"+icon_inactive_prefix+"16.png",
    "32": "./"+icon_inactive_prefix+"32.png",
    "64": "./"+icon_inactive_prefix+"64.png"
  },
  onChange: handleChange
});

//create a panel

// TODO: properly setup code here

/*    Handlers    */

//handler for change
function handleChange(state) {

  // if checked show panel
  if(state.checked) {
    console.log("panel should be shown TODO");// TODO: need to set up to show
                                              // panel
  }

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
    startWorkStage(1);
  } if (work_state == 2) {
    button.state("window", {
      icon : {
        "16": "./"+icon_break_prefix+"16.png",
        "32": "./"+icon_break_prefix+"32.png",
        "64": "./"+icon_break_prefix+"64.png"
      }
    });
    work_state = 0;
    notifications.notify({
      title:"Break Done!",
      text: "your break is done return to your browser to start a new workstage",
    });
    timer.setInterval(handleStageEnd, timer_length_break);
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
  work_state = 2;
  notfications.notify({
    title: "Stage Done!",
    text: "The workstage you were is done! click the icon again to go on a 5 minute break",
  });

}

// handle panel hiding

function handleHide() {
  button.state('window', {checked:false});
}

//send request to create work stage/break stage
function startWorkStage(type) {
  console.log(Date.now());
}
