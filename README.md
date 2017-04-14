## Use
```
yarn

yarn start

```

## Test
```
curl --http1.0 -i -X GET\
 -A 'LockerUpdater'\
 -H "X-ESP8266-MAC:00"\
 -H "X-ESP8266-VERSION:1.5.4"\
 -H "X-ESP8266-DEVICE:SONOFF"\
 http://localhost:3000
```
