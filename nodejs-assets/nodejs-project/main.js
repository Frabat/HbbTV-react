// Rename this sample file to main.js to use on your project.
// The main.js file will be overwritten in updates/reinstalls.

var rn_bridge = require('rn-bridge');
var hbbtv = require("./lib/hbbtv");
var HbbTVDialClient = hbbtv.HbbTVDialClient;
var WebSocket = hbbtv.WebSocket;
var hbbTVDialClient = new HbbTVDialClient().on("ready", function(){
  console.log("Hbbtv Dial client is ready");
}).on("stop", function(){
  console.log("Hbbtv Dial Client STOPPED")
}).on("found", function(terminal){
  console.log("HbbTV Terminal", terminal.getFriendlyName()," (", terminal.getAppLaunchURL(), ") found");
  
  
}).on("error", function(err){
  console.error(err);
})

// Echo every message received from react-native.
rn_bridge.channel.on('message', (msg) => {
  try{
    switch(msg){
      case 'start':
        rn_bridge.channel.send(
          "Dial Server starting: " +
          hbbTVDialClient.start()
        );
        break;
        case 'stop': 
        rn_bridge.channel.send(
          "Dial Server stopping : "+
          hbbTVDialClient.stop()
        );
        break;
        default: 
        rn_bridge.channel.send(
          "Unknown request: \n"+
          msg
         );
         break;
    }
  } catch (err)
  {rn_bridge.channel.send("Error: "+JSON.stringify(err) + " => "+err.stack)}
} );

// Inform react-native node is initialized.
rn_bridge.channel.send("Node was initialized.");