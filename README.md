node-bluetooth-bulb
===================

A node.js library for the [BlueClick Bluetooth Bulb](http://www.bluebulb.com/)

Special thanks to [@mrose17](https://github.com/mrose17) for sending me a bulb!

__Notes__:
  * currently only works on Linux, due to the follow issues with CoreBluetooth on OS X:
      * bulb disconnects during characteristic discover
      * cannot write to hande without response


Install
-------

    npm install bluetooth-bulb

Usage
-----

    var BlueoothBulb = require('bluetooth-bulb');

__Discover__

    BlueoothBulb.discover(callback(bluetoothBulb));

__Connect__

    bluetoothBulb.connect(callback);

__Disconnect__

    bluetoothBulb.disconnect(callback);

__Pair__

    // If pair key has not been set previously, it must be set within 10s of powering the bulb.
    // Otherwise, pair must be called, immediately after connect (otherwise the bulb will terminate the connection)

    bluetoothBulb.pair(key, callback); // key must be 0 - 255

__Get Brightness__

    // value range is: 0 - 125

    bluetoothBulb.getGreenBrightness(callback(value));

    bluetoothBulb.getRedBrightness(callback(value));

    bluetoothBulb.getWhiteBrightness(callback(value));

    bluetoothBulb.getBlueBrightness(callback(value));

__Set Brightness__

    // value range is: 0 - 125

    bluetoothBulb.setGreenBrightness(value, callback);

    bluetoothBulb.setRedBrightness(value, callback);

    bluetoothBulb.setWhiteBrightness(value, callback);

    bluetoothBulb.setBlueBrightness(value, callback);

__Get Friendly Name__

    bluetoothBulb.getFriendlyName(callback(friendlyName));

__Get Pair Counter__

    // how many pair keys are there

    bluetoothBulb.getPairCounter(callback(pairCounter));

__Disconnect Workaround__

    // no-op, keeps connection alive

    bluetoothBulb.disconnectWorkaround(callback);

__Get Bulb State__

    // get the current state of the bulb

    bluetoothBulb.getBulbState(callback(bulbState));

__Remove Pairs__

    // Remove all pair keys from the bulb (will need to set a new pair key after operation)

    bluetoothBulb.removePairs(callback);

__Get Device Name__

    bluetoothBulb.getDeviceName(callback(deviceName));

__Get Model Number__

    bluetoothBulb.getModelNumber(callback(modelNumber));

__Get Firmware Revision__

    bluetoothBulb.getFirmwareRevision(callback(firmwareRevision));

__Get Hardware Revision__

    bluetoothBulb.getHardwareRevision(callback(hardwareRevision));

__Get Manufacturer Name__

    bluetoothBulb.getManufacturerName(callback(manufacturerName));

