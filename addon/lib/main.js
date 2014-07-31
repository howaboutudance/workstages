/* (c) 2014 Michael Penhallegon
 */

// import libs
var { ToggleButton } = require('sdk/ui/button/toggle');
var timer = require("sdk/timers");
var tabs = require("sdk/tabs");

// setup work_state hold state of which work is at, set time length
var work_state = 0; /* sets the state for the button: 0 for inactive, 1 for
                    * active and 2 for break
                    */
var timer_length_work= 25 * 60 * 1000; // set to a default of 20 minutes
var timer_length_break= 5 * 60 * 1000; // set to a default of 20 minutes
var icon_active_prefix = "icon-active-";
var icon_inactive_prefix = "icon-";
var icon_break_prefix = "icon-break-";

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

//handler for change
function handleChange(state) {
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
  } if (work_state == 2) {
    button.state("window", {
      icon : {
        "16": "./"+icon_break_prefix+"16.png",
        "32": "./"+icon_break_prefix+"32.png",
        "64": "./"+icon_break_prefix+"64.png"
      }
    });
    work_state = 0;
    timer.setInterval(handleStageEnd, timer_length_break);
  }
}

function handleStageEnd() {
  button.state("window",{
    icon : {
        "16": "./"+icon_inactive_prefix+"16.png",
        "32": "./"+icon_inactive_prefix+"32.png",
        "64": "./"+icon_inactive_prefix+"64.png"
    }
  });
  work_state = 2;
}

