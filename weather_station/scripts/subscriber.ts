import noble, { Characteristic } from '@abandonware/noble';

const peripheralId: string = '45c1b486f4e0425dbcd3e6a8d9c300e9';

// Services (currently only one)
const weatherStationUuid: string = '0000fe40cc7a482a984a7f2ed5b3e58f';

// Characteristics
const humidityUUID: string = '0000fe418e2245419d4c21edae82ed19';
const temperatureUUID: string = '0000fe428e2245419d4c21edae82ed19';
const pressureUUID: string = '0000fe438e2245419d4c21edae82ed19';

const handleSensorData = (characteristic: Characteristic, dataType: string) => {
  characteristic.subscribe((error: string) => {
    if (error) {
      console.log('Subscription error: ', error);
    }
  });
  characteristic.on('data', (data: Buffer, isNotification: boolean) => {
    if (isNotification) {
      console.log(`${dataType}: ${data.readInt32LE()}`);
    }
  })
};

// Check if bluetooth is on
noble.on('stateChange', function (state) {
  if (state === 'poweredOn') {
    console.log('scanning...');
    noble.startScanning([], false);
  } else {
    console.log("No bluetooth!");
    process.exit(0);
  }
});

// Connect to the peripheral and interact with it
noble.on('discover', function (peripheral) {
  if (peripheral.id === peripheralId) {
    noble.stopScanning();
  } else {
    return;
  }
  console.log('found peripheral:', peripheral.uuid);

  peripheral.connect(function (err) {
    peripheral.discoverServices([weatherStationUuid], (error, services) => {
      services[0].discoverCharacteristics([humidityUUID, temperatureUUID, pressureUUID], (error, characteristics) => {
        characteristics.forEach((characteristic) => {
          if (characteristic.uuid === humidityUUID) {
            handleSensorData(characteristic, "Humidity");
          }
          if (characteristic.uuid === temperatureUUID) {
            handleSensorData(characteristic, "Temperature");
          }
        })
      })
    })
  });
});
