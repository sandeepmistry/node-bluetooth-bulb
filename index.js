var events = require('events');
var util = require('util');

var noble = require('noble');

/*
handle = 0x0002, char properties = 0x0a, char value handle = 0x0003, uuid = 00002a00-0000-1000-8000-00805f9b34fb
handle = 0x0005, char properties = 0x02, char value handle = 0x0006, uuid = 00002a24-0000-1000-8000-00805f9b34fb
handle = 0x0007, char properties = 0x02, char value handle = 0x0008, uuid = 00002a26-0000-1000-8000-00805f9b34fb
handle = 0x0009, char properties = 0x02, char value handle = 0x000a, uuid = 00002a27-0000-1000-8000-00805f9b34fb
handle = 0x000b, char properties = 0x02, char value handle = 0x000c, uuid = 00002a29-0000-1000-8000-00805f9b34fb


handle = 0x0002, char properties = 0x0a, char value handle = 0x0003, uuid = 00002a00-0000-1000-8000-00805f9b34fb
handle = 0x0005, char properties = 0x02, char value handle = 0x0006, uuid = 00002a24-0000-1000-8000-00805f9b34fb
handle = 0x0007, char properties = 0x02, char value handle = 0x0008, uuid = 00002a26-0000-1000-8000-00805f9b34fb
handle = 0x0009, char properties = 0x02, char value handle = 0x000a, uuid = 00002a27-0000-1000-8000-00805f9b34fb
handle = 0x000b, char properties = 0x02, char value handle = 0x000c, uuid = 00002a29-0000-1000-8000-00805f9b34fb

handle: 0x000e, char properties: 0x06, char value handle: 0x000f, uuid: 426c7565-746f-6f74-6820-42756c620100 (Red brightness)
handle: 0x0011, char properties: 0x06, char value handle: 0x0012, uuid: 426c7565-746f-6f74-6820-42756c620101 (Green brightness)
handle: 0x0014, char properties: 0x06, char value handle: 0x0015, uuid: 426c7565-746f-6f74-6820-42756c620102 (Blue brightness)
handle: 0x0017, char properties: 0x06, char value handle: 0x0018, uuid: 426c7565-746f-6f74-6820-42756c620103 (White brightness)
handle: 0x001a, char properties: 0x06, char value handle: 0x001b, uuid: 426c7565-746f-6f74-6820-42756c620200 (Friendly name)
handle: 0x001d, char properties: 0x02, char value handle: 0x001e, uuid: 426c7565-746f-6f74-6820-42756c620201 (Pair counter)
handle: 0x0020, char properties: 0x04, char value handle: 0x0021, uuid: 426c7565-746f-6f74-6820-42756c620202 (Remove Pairs)
handle: 0x0023, char properties: 0x04, char value handle: 0x0024, uuid: 426c7565-746f-6f74-6820-42756c620203 (Disconnect Workaround)
handle: 0x0026, char properties: 0x04, char value handle: 0x0027, uuid: 426c7565-746f-6f74-6820-42756c620204 (Pairing Key)
handle: 0x0029, char properties: 0x02, char value handle: 0x002a, uuid: 426c7565-746f-6f74-6820-42756c620205 (Bulb state)
*/

// services
var CONTROL_SERVICE_UUID             = '426c7565746f6f74682042756c620000';

// // characteristics
// var DEVICE_NAME_UUID                 = '2a00';
// var MODEL_NUMBER_UUID                = '2a24';
// var FIRMWARE_REVISION_UUID           = '2a26';
// var HARDWAR_REVISION_UUID            = '2a27';
// var MANUFACTURER_NAME_UUID           = '2a29';

// var GREEN_BRIGHTNESS_UUID            = '426c7565746f6f74682042756c620100';
// var RED_BRIGHTNESS_UUID              = '426c7565746f6f74682042756c620101';
// var WHITE_BRIGHTNESS_UUID            = '426c7565746f6f74682042756c620102';
// var BLUE_BRIGHTNESS_UUID             = '426c7565746f6f74682042756c620103';

// var FRIENDLY_NAME_UUID               = '426c7565746f6f74682042756c620200';
// var PAIR_COUNTER_UUID                = '426c7565746f6f74682042756c620201';
// var REMOVE_PAIRS_UUID                = '426c7565746f6f74682042756c620202';
// var DISCONNECT_WORKAROUND_UUID       = '426c7565746f6f74682042756c620203';
// var PAIR_KEY_UUID                    = '426c7565746f6f74682042756c620204';
// var BULB_STATE_UUID                  = '426c7565746f6f74682042756c620205';

// handles
var DEVICE_NAME_HANDLE               = 0x0003;
var MODEL_NUMBER_HANDLE              = 0x0006;
var FIRMWARE_REVISION_HANDLE         = 0x0008;
var HARDWAR_REVISION_HANDLE          = 0x000a;
var MANUFACTURER_NAME_HANDLE         = 0x000c;

var GREEN_BRIGHTNESS_HANDLE          = 0x000f;
var RED_BRIGHTNESS_HANDLE            = 0x0012;
var WHITE_BRIGHTNESS_HANDLE          = 0x0015;
var BLUE_BRIGHTNESS_HANDLE           = 0x0018;

var FRIENDLY_NAME_HANDLE             = 0x001b;
var PAIR_COUNTER_HANDLE              = 0x001e;
var REMOVE_PAIRS_HANDLE              = 0x0021;
var DISCONNECT_WORKAROUND_HANDLE     = 0x0024;
var PAIR_KEY_HANDLE                  = 0x0027;
var BULB_STATE_HANDLE                = 0x002a;

function BluetoothBulb(peripheral) {
  this._peripheral = peripheral;
}

util.inherits(BluetoothBulb, events.EventEmitter);

BluetoothBulb.discover = function(callback) {
  noble.once('stateChange', function() {
    noble.once('discover', function(peripheral) {
      if (peripheral.advertisement.serviceUuids.indexOf(CONTROL_SERVICE_UUID) !== -1) {
        noble.stopScanning();
        var bluetoothBulb = new BluetoothBulb(peripheral);

        callback(bluetoothBulb);
      }
    });
    noble.startScanning([CONTROL_SERVICE_UUID]);
  });
};

BluetoothBulb.prototype.connect = function(callback) {
  this._peripheral.connect(callback);
};

BluetoothBulb.prototype.disconnect = function(callback) {
  this._peripheral.disconnect(callback);
};

BluetoothBulb.prototype.readHandle = function(handle, callback) {
  this._peripheral.readHandle(handle, function(error, data) {
    callback(data);
  });
};

BluetoothBulb.prototype.readStringHandle = function(handle, callback) {
  this.readHandle(handle, function(data) {
    callback(data.toString());
  });
};

BluetoothBulb.prototype.writeHandle = function(handle, data, callback) {
  this._peripheral.writeHandle(handle, data, true, callback);
};

BluetoothBulb.prototype.pair = function(key, callback) {
  this.writeHandle(PAIR_KEY_HANDLE, new Buffer([key]), callback);
};

BluetoothBulb.prototype.getDeviceName = function(callback) {
  this.readStringHandle(DEVICE_NAME_HANDLE, callback);
};

BluetoothBulb.prototype.getModelNumber = function(callback) {
  this.readStringHandle(MODEL_NUMBER_HANDLE, callback);
};

BluetoothBulb.prototype.getFirmwareRevision = function(callback) {
  this.readStringHandle(FIRMWARE_REVISION_HANDLE, callback);
};

BluetoothBulb.prototype.getHardwareRevision = function(callback) {
  this.readStringHandle(HARDWAR_REVISION_HANDLE, callback);
};

BluetoothBulb.prototype.getManufacturerName = function(callback) {
  this.readStringHandle(MANUFACTURER_NAME_HANDLE, callback);
};

BluetoothBulb.prototype.getBrightness = function(handle, callback) {
  this.readHandle(handle, function(data) {
    // TODO: what is the 1st byte for ???
    callback(data.readUInt8(1));
  });
};

BluetoothBulb.prototype.setBrightness = function(handle, value, callback) {
  // TODO: what is the 1st byte for ???
  this.writeHandle(handle, new Buffer([0x00, value]), callback);
};

BluetoothBulb.prototype.getGreenBrightness = function(callback) {
  this.getBrightness(GREEN_BRIGHTNESS_HANDLE, callback);
};

BluetoothBulb.prototype.setGreenBrightness = function(value, callback) {
  this.setBrightness(GREEN_BRIGHTNESS_HANDLE, value, callback);
};

BluetoothBulb.prototype.getRedBrightness = function(callback) {
  this.getBrightness(RED_BRIGHTNESS_HANDLE, callback);
};

BluetoothBulb.prototype.setRedBrightness = function(value, callback) {
  this.setBrightness(RED_BRIGHTNESS_HANDLE, value, callback);
};

BluetoothBulb.prototype.getWhiteBrightness = function(callback) {
  this.getBrightness(WHITE_BRIGHTNESS_HANDLE, callback);
};

BluetoothBulb.prototype.setWhiteBrightness = function(value, callback) {
  this.setBrightness(WHITE_BRIGHTNESS_HANDLE, value, callback);
};

BluetoothBulb.prototype.getBlueBrightness = function(callback) {
  this.getBrightness(BLUE_BRIGHTNESS_HANDLE, callback);
};

BluetoothBulb.prototype.setBlueBrightness = function(value, callback) {
  this.setBrightness(BLUE_BRIGHTNESS_HANDLE, value, callback);
};

BluetoothBulb.prototype.getFriendlyName = function(callback) {
  this.readHandle(FRIENDLY_NAME_HANDLE, function(data) {
    callback(data.toString());
  });
};

BluetoothBulb.prototype.getPairCounter = function(callback) {
  this.readHandle(PAIR_COUNTER_HANDLE, function(data) {
    callback(data.readUInt8(0));
  });
};

BluetoothBulb.prototype.removePairs = function(callback) {
  this.writeHandle(REMOVE_PAIRS_HANDLE, new Buffer([0x01]), callback);
};

BluetoothBulb.prototype.disconnectWorkaround = function(callback) {
  this.writeHandle(DISCONNECT_WORKAROUND_HANDLE, new Buffer([0x01]), callback);
};

BluetoothBulb.prototype.getBulbState = function(callback) {
  this.readHandle(BULB_STATE_HANDLE, function(data) {
    callback(data.readUInt8(0));
  });
};

module.exports = BluetoothBulb;
