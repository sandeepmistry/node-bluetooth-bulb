var async = require('async');

var BluetoothBulb = require('./index');

BluetoothBulb.discover(function(bluetoothBulb) {
  async.series([
    function(callback) {
      console.log('connect');
      bluetoothBulb.connect(callback);
    },
    function(callback) {
      console.log('pair');
      bluetoothBulb.pair(0x01, callback);
    },
    function(callback) {
      console.log('set green brightness');
      bluetoothBulb.setGreenBrightness(0, callback);
    },
    function(callback) {
      bluetoothBulb.getGreenBrightness(function(value) {
        console.log('green brightness = ' + value);
        callback();
      });
    },
    function(callback) {
      console.log('set red brightness');
      bluetoothBulb.setRedBrightness(0, callback);
    },
    function(callback) {
      bluetoothBulb.getRedBrightness(function(value) {
        console.log('red brightness = ' + value);
        callback();
      });
    },
    function(callback) {
      console.log('set white brightness');
      bluetoothBulb.setWhiteBrightness(125, callback);
    },
    function(callback) {
      bluetoothBulb.getWhiteBrightness(function(value) {
        console.log('white brightness = ' + value);
        callback();
      });
    },
    function(callback) {
      console.log('set blue brightness');
      bluetoothBulb.setBlueBrightness(0, callback);
    },
    function(callback) {
      bluetoothBulb.getBlueBrightness(function(value) {
        console.log('blue brightness = ' + value);
        callback();
      });
    },
    function(callback) {
      bluetoothBulb.getFriendlyName(function(name) {
        console.log('friendly name = ' + name);
        callback();
      });
    },
    function(callback) {
      bluetoothBulb.getPairCounter(function(pairCounter) {
        console.log('pair counter = ' + pairCounter);
        callback();
      });
    },
    function(callback) {
      console.log('disconnectWorkaround');
      bluetoothBulb.disconnectWorkaround(callback);
    },
    function(callback) {
      bluetoothBulb.getBulbState(function(bulbState) {
        console.log('bulbState = ' + bulbState);
        callback();
      });
    },
    // function(callback) {
    //   console.log('removePairs');
    //   bluetoothBulb.removePairs(callback);
    // },
    function(callback) {
      console.log('disconnect');
      bluetoothBulb.disconnect(callback);
    }
  ],
  function() {
    process.exit(0);
  });
});
