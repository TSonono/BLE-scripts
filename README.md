# Node BLE Scripts

This project is where I will store some Node scripts which communicates with my peripherals using BLE. All the projects run on the nRF52840DK.

## Weather station

The weather station serves a simple purpose. The application on the peripheral is implemented in Zephyr OS. The data is sampled from a BME280 sensor. The following data is sampled:

- Humidity
- Temperature
- Air pressure

If there is a BLE connection established to the peripheral, it will sample the sensor every 2.5 seconds.
