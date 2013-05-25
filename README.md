node-bluetooth-bulb
===================

A node.js library for the [blue bulb Bluetooth Bulb(http://www.bluebulb.com/)

Special thanks to [@mrose17](https://github.com/mrose17) for sending me a bulb!

__Notes__:
  * the module is very unstable, the Bluetooth Bulb has very picky timing
  * currently only works on Linux, due to timing issues with CoreBluetooth on OS X (bulb disconnects during characteristic discover)


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

    // If pair code has not been set previously, it must be set within 10s of powering the bulb.
    // Otherwise, pair must be called, immediately after connect (otherwise the bulb will terminate the connection)

    bluetoothBulb.pair(code, callback); // code must be 0 - 255

__Get Lights__

    // value range is: 0 - 125

    bluetoothBulb.getGreen(callback(value));

    bluetoothBulb.getRed(callback(value));

    bluetoothBulb.getWhite(callback(value));

    bluetoothBulb.getBlue(callback(value));

__Set Lights__

    // value range is: 0 - 125

    bluetoothBulb.setGreen(value, callback);

    bluetoothBulb.setRed(value, callback);

    bluetoothBulb.setWhite(value, callback);

    bluetoothBulb.setBlue(value, callback);

__Get Name__

    bbluetoothBulb.getName(callback(name));

__Has Paired__

    // is the bulb paired with any devices (pair codes stored)

    bluetoothBulb.hasPaired(callback(hasPaired));

__Keep Alive__

    // no-op, keeps connected alive

    bluetoothBulb.keepAlive(callback);

__Is Paired__

    // is the bulb pair now (current connection)

    bluetoothBulb.isPaired(callback(isPaired));

__Unpair__

    // remove the current pair code from the bulb (will need to set a new pair code after operation)

    bluetoothBulb.unpair(callback);
