var async = require('async');

var BluetoothBulb = require('./index');

var pairKey = 0x01;
var red     = 0;
var green   = 100;
var blue    = 0;
var white   = 0;

BluetoothBulb.discover(function(bluetoothBulb) {
  async.series([
    function(callback) {
      console.log('connect');
      bluetoothBulb.connect(callback);
    },
    function(callback) {
      console.log('pair');
      bluetoothBulb.pair(pairKey, callback);
    },
    function(callback) {
      bluetoothBulb.getDeviceName(function(value) {
        console.log('device name = ' + value);
        callback();
      });
    },
    function(callback) {
      bluetoothBulb.getModelNumber(function(value) {
        console.log('model number = ' + value);
        callback();
      });
    },
    function(callback) {
      bluetoothBulb.getFirmwareRevision(function(value) {
        console.log('firmware revision = ' + value);
        callback();
      });
    },
    function(callback) {
      bluetoothBulb.getHardwareRevision(function(value) {
        console.log('hardware revision = ' + value);
        callback();
      });
    },
    function(callback) {
      bluetoothBulb.getManufacturerName(function(value) {
        console.log('manufacturer number = ' + value);
        callback();
      });
    },
    function(callback) {
      console.log('set green brightness');
      bluetoothBulb.setGreenBrightness(green, callback);
    },
    function(callback) {
      bluetoothBulb.getGreenBrightness(function(value) {
        console.log('green brightness = ' + value);
        callback();
      });
    },
    function(callback) {
      console.log('set red brightness');
      bluetoothBulb.setRedBrightness(red, callback);
    },
    function(callback) {
      bluetoothBulb.getRedBrightness(function(value) {
        console.log('red brightness = ' + value);
        callback();
      });
    },
    function(callback) {
      console.log('set white brightness');
      bluetoothBulb.setWhiteBrightness(white, callback);
    },
    function(callback) {
      bluetoothBulb.getWhiteBrightness(function(value) {
        console.log('white brightness = ' + value);
        callback();
      });
    },
    function(callback) {
      console.log('set blue brightness');
      bluetoothBulb.setBlueBrightness(blue, callback);
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
    // function(callback) {
    //   setTimeout(callback, 1000);
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
