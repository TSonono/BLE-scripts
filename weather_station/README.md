# Weather Station
This README provides a short description of the attributes in the weather station.

## Services

The perepheral has one service with three characteristics. The UUID of the service is 0000fe40cc7a482a984a7f2ed5b3e58f.

## Characteristics
Two of characteristics, you can either subscribe to or read from, and one you can only read from.

### Humidity
The UUID of this characteristic is 0000fe418e2245419d4c21edae82ed19. It allows for subscribing. You will receive a notification every 2.5 seconds as long as you are subscribed and the CCC is enabled for this characteristic.

### Temperature
The UUID of this characteristic is 0000fe428e2245419d4c21edae82ed19. It allows for subscribing. You will receive a notification every 2.5 seconds as long as you are subscribed and the CCC is enabled for this characteristic.

### Air pressure
The UUID of this characteristic is 0000fe438e2245419d4c21edae82ed19. You can only read from it. When you read from it, you will receive the latest sampled air pressure value from the sensor.
