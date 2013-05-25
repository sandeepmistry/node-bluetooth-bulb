var events = require('events');
var util = require('util');

var noble = require('noble');

// services
var CONTROL_SERVICE_UUID      = '426c7565746f6f74682042756c620000';

// characteristics
var GREEN_LIGHT_UUID          = '426c7565746f6f74682042756c620100';
var RED_LIGHT_UUID            = '426c7565746f6f74682042756c620101';
var WHITE_LIGHT_UUID          = '426c7565746f6f74682042756c620102';
var BLUE_LIGHT_UUID           = '426c7565746f6f74682042756c620103';

var NAME_UUID                 = '426c7565746f6f74682042756c620200';
var HAS_PAIRED_UUID           = '426c7565746f6f74682042756c620201';
var UNPAIR_UUID               = '426c7565746f6f74682042756c620202';
var KEEP_ALIVE_PAIRED_UUID    = '426c7565746f6f74682042756c620203';
var PAIR_CODE_UUID            = '426c7565746f6f74682042756c620204';
var IS_PAIRED_UUID            = '426c7565746f6f74682042756c620205';

function BluetoothBulb(peripheral) {
  this._peripheral = peripheral;

  this._controlService = null;
  this._characteristics = {};
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

BluetoothBulb.prototype.discoverServices = function(callback) {
  this._peripheral.discoverServices([CONTROL_SERVICE_UUID], function(error, services) {
    for (var i in services) {
      if (services[i].uuid === CONTROL_SERVICE_UUID) {
        this._controlService = services[i];
        callback();
      }
    }
  }.bind(this));
};

BluetoothBulb.prototype.discoverCharacteristics = function(callback) {
  this._controlService.discoverCharacteristics([], function(error, characteristics) {
    for(var i in characteristics) {
      var characteristic = characteristics[i];

      this._characteristics[characteristic.uuid] = characteristic;
    }

    callback();
  }.bind(this));
};

BluetoothBulb.prototype.readCharacteristic = function(uuid, callback) {
  this._characteristics[uuid].read(function(error, data) {
    callback(data);
  });
};

BluetoothBulb.prototype.writeCharacteristic = function(uuid, data, callback) {
  this._characteristics[uuid].write(data, false, callback);
};

BluetoothBulb.prototype.pair = function(code, callback) {
  this.writeCharacteristic(PAIR_CODE_UUID, new Buffer([code]), function() {
    // setTimeout(callback, 0);
    callback();
  });
};

BluetoothBulb.prototype.getLight = function(uuid, callback) {
  this.readCharacteristic(uuid, function(data) {
    // TODO: what is the 1st byte for ???
    callback(data.readUInt8(1));
  });
};

BluetoothBulb.prototype.setLight = function(uuid, value, callback) {
  // TODO: what is the 1st byte for ???
  this.writeCharacteristic(uuid, new Buffer([0x00, value]), function(){
    setTimeout(callback, 75); 
  });
};

BluetoothBulb.prototype.getGreen = function(callback) {
  this.getLight(GREEN_LIGHT_UUID, callback);
};

BluetoothBulb.prototype.setGreen = function(value, callback) {
  this.setLight(GREEN_LIGHT_UUID, value, callback);
};

BluetoothBulb.prototype.getRed = function(callback) {
  this.getLight(RED_LIGHT_UUID, callback);
};

BluetoothBulb.prototype.setRed = function(value, callback) {
  this.setLight(RED_LIGHT_UUID, value, callback);
};

BluetoothBulb.prototype.getWhite = function(callback) {
  this.getLight(WHITE_LIGHT_UUID, callback);
};

BluetoothBulb.prototype.setWhite = function(value, callback) {
  this.setLight(WHITE_LIGHT_UUID, value, callback);
};

BluetoothBulb.prototype.getBlue = function(callback) {
  this.getLight(BLUE_LIGHT_UUID, callback);
};

BluetoothBulb.prototype.setBlue = function(value, callback) {
  this.setLight(BLUE_LIGHT_UUID, value, callback);
};

BluetoothBulb.prototype.getName = function(callback) {
  this.readCharacteristic(NAME_UUID, function(data) {
    callback(data.toString());
  });
};

BluetoothBulb.prototype.hasPaired = function(callback) {
  this.readCharacteristic(HAS_PAIRED_UUID, function(data) {
    callback(data.readUInt8(0) ? true : false);
  });
};

BluetoothBulb.prototype.unpair = function(callback) {
  this.writeCharacteristic(UNPAIR_UUID, new Buffer([0x01]), function(){
    setTimeout(callback, 75); 
  });
};

BluetoothBulb.prototype.keepAlive = function(callback) {
  this.writeCharacteristic(KEEP_ALIVE_PAIRED_UUID, new Buffer([0x01]), function(){
    setTimeout(callback, 75); 
  });
};

BluetoothBulb.prototype.isPaired = function(callback) {
  this.readCharacteristic(IS_PAIRED_UUID, function(data) {
    callback(data.readUInt8(0) ? true : false);
  });
};

module.exports = BluetoothBulb;
