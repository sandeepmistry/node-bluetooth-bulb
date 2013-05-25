var async = require('async');

var BluetoothBulb = require('./index');

BluetoothBulb.discover(function(bluetoothBulb) {
  async.series([
    function(callback) {
      console.log('connect');
      bluetoothBulb.connect(callback);
    },
    function(callback) {
      console.log('discoverServices');
      bluetoothBulb.discoverServices(callback);
    },
    function(callback) {
      console.log('discoverCharacteristics');
      bluetoothBulb.discoverCharacteristics(callback);
    },
    function(callback) {
      console.log('pair');
      bluetoothBulb.pair(0x01, callback);
    },
    function(callback) {
      console.log('set green');
      bluetoothBulb.setGreen(0, callback);
    },
    function(callback) {
      bluetoothBulb.getGreen(function(value) {
        console.log('green = ' + value);
        callback();
      });
    },
    function(callback) {
      console.log('set red');
      bluetoothBulb.setRed(0, callback);
    },
    function(callback) {
      bluetoothBulb.getRed(function(value) {
        console.log('red = ' + value);
        callback();
      });
    },
    function(callback) {
      console.log('set white');
      bluetoothBulb.setWhite(125, callback);
    },
    function(callback) {
      bluetoothBulb.getWhite(function(value) {
        console.log('white = ' + value);
        callback();
      });
    },
    function(callback) {
      console.log('set blue');
      bluetoothBulb.setBlue(0, callback);
    },
    function(callback) {
      bluetoothBulb.getBlue(function(value) {
        console.log('blue = ' + value);
        callback();
      });
    },
    function(callback) {
      console.log('disconnect');
      bluetoothBulb.disconnect(callback);
    }
  ],
  function() {
    process.exit(0);
  });
});
