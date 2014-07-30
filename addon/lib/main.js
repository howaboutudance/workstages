var { ToggleButton } = require('sdk/ui/button/toggle');
var work_state = 0; /* sets the state for the button: 0 for inactive, 1 for
                    * active and 2 for break
                    */
var tabs = require("sdk/tabs");

var button = ToggleButton({
  id: "workstage-button",
  label: "Start workstage",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onChange: handleClick
});

function handleClick(state) {
  if (work_state == 0) {
    button.state("window", {
      icon : {
        "16": "./icon-active-16.png",
        "32": "./icon-active-32.png",
        "64": "./icon-active-64.png"
      }
    });
  }
}
