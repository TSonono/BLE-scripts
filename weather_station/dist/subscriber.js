"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const noble_1 = __importDefault(require("@abandonware/noble"));
const peripheralId = '45c1b486f4e0425dbcd3e6a8d9c300e9';
// Services (currently only one)
const weatherStationUuid = '0000fe40cc7a482a984a7f2ed5b3e58f';
// Characteristics
const humidityUUID = '0000fe418e2245419d4c21edae82ed19';
const temperatureUUID = '0000fe428e2245419d4c21edae82ed19';
const pressureUUID = '0000fe438e2245419d4c21edae82ed19';
const handleSensorData = (characteristic, dataType) => {
    characteristic.subscribe((error) => {
        if (error) {
            console.log('Subscription error: ', error);
        }
    });
    characteristic.on('data', (data, isNotification) => {
        if (isNotification) {
            console.log(`${dataType}: ${data.readInt32LE()}`);
        }
    });
};
// Check if bluetooth is on
noble_1.default.on('stateChange', function (state) {
    if (state === 'poweredOn') {
        console.log('scanning...');
        noble_1.default.startScanning([], false);
    }
    else {
        console.log("No bluetooth!");
        process.exit(0);
    }
});
// Connect to the peripheral and interact with it
noble_1.default.on('discover', function (peripheral) {
    if (peripheral.id === peripheralId) {
        noble_1.default.stopScanning();
    }
    else {
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
                });
            });
        });
    });
});
