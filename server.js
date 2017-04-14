import verCompare from 'node-version-compare';
import express from 'express';
import versions from './data/version';

const app = express();

app.use('/firmware', express.static('firmware'));

app.get('/hello', (req, res) => res.send('World!'));

app.get('/', (req, res) => {
  // console.log(req.headers);

  const [reqMac, reqDevice, reqVersion] = [
    'X-ESP8266-MAC',
    'X-ESP8266-DEVICE',
    'X-ESP8266-VERSION',
  ].map(v => req.get(v.toLowerCase()));

  console.log(reqMac, reqDevice, reqVersion);

  if (reqMac && reqDevice && reqVersion ) {
    const [resp={}] = versions.filter( v => {
      const { mac, device, version, min, max } = v.origin;

      if (device !== reqDevice) return false;
      console.log({mac, reqMac});
      if ((mac !== '*') && (mac !== reqMac)) return false;

      const minVersionCompare= verCompare(min, reqVersion);
      const maxVersionCompare= verCompare(reqVersion, max);

      if ((min !== '*') && (minVersionCompare === 1)) return false

      if ((max !== '*') && (maxVersionCompare > 0 )) return false
      return true;
    });
    const {target={}} = resp
    return res.json(target);
  }
  res.json({});
});

app.listen(3000, () =>  console.log('Update server listening on port 3000!'));
