const noble = require('@abandonware/noble');

noble.on('stateChange', async (state) => {
  if (state === 'poweredOn') {
    await noble.startScanningAsync(['f364140000b04240ba5005ca45bf8abc'], false);
  }
});

noble.on('discover', function(peripheral) {
    peripheral.connect(function(error) {
      console.log('connected to peripheral: ' + peripheral.uuid);
      peripheral.discoverServices(['f364140000b04240ba5005ca45bf8abc'], function(error, services) {
        var customService = services[0];
        if (services !== 'undefined')
        {
            console.log('Found custom service with UUID f364140000b04240ba5005ca45bf8abc!');
        }

        customService.discoverCharacteristics(['f364140100b04240ba5005ca45bf8abc'], function(error, characteristics) {
            var customCharecterstic = characteristics[0];
            if (characteristics !== 'undefined')
            {
                console.log('Found custom charecterstic with UUID f364140100b04240ba5005ca45bf8abc!');
            }

            customCharecterstic.read(function(error, data) {
                console.log('Value of customCharecterstic: ', data[0]);
            });

            // Turn on the LED on board
            customCharecterstic.write(new Buffer.alloc(1, 1), true, (error) => {
                if ( error === null)
                {
                    console.log("LED should be turned on");
                }
            });

            // Start listening for the notification which increments a static variable value in the board
            customCharecterstic.on('data', function(data, isNotification) {
                console.log('Value of customCharecterstic: ', data[0]);
            });
            customCharecterstic.notify(true, function(error) {
                console.log('custom notification on');
            });
        });
      });
    });
  });
