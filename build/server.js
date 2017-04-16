'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _nodeVersionCompare = require('node-version-compare');

var _nodeVersionCompare2 = _interopRequireDefault(_nodeVersionCompare);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _version = require('./data/version');

var _version2 = _interopRequireDefault(_version);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use('/firmware', _express2.default.static('firmware'));
app.get('/hello', function (req, res) {
  return res.send('World!');
});
app.get('/', function (req, res) {
  var _map = ['X-ESP8266-MAC', 'X-ESP8266-DEVICE', 'X-ESP8266-VERSION'].map(function (v) {
    return req.get(v.toLowerCase());
  }),
      _map2 = _slicedToArray(_map, 3),
      reqMac = _map2[0],
      reqDevice = _map2[1],
      reqVersion = _map2[2];

  console.log('[req]', new Date(), reqMac, reqDevice, reqVersion);

  if (reqMac && reqDevice && reqVersion) {
    var _versions$filter = _version2.default.filter(function (v) {
      var _v$origin = v.origin,
          mac = _v$origin.mac,
          device = _v$origin.device,
          version = _v$origin.version,
          min = _v$origin.min,
          max = _v$origin.max;


      if (device !== reqDevice) return false;
      console.log({ mac: mac, reqMac: reqMac });
      if (mac !== '*' && mac !== reqMac) return false;

      var minVersionCompare = (0, _nodeVersionCompare2.default)(min, reqVersion);
      var maxVersionCompare = (0, _nodeVersionCompare2.default)(reqVersion, max);

      if (min !== '*' && minVersionCompare === 1) return false;

      if (max !== '*' && maxVersionCompare > 0) return false;
      return true;
    }),
        _versions$filter2 = _slicedToArray(_versions$filter, 1),
        _versions$filter2$ = _versions$filter2[0],
        resp = _versions$filter2$ === undefined ? {} : _versions$filter2$;

    var _resp$target = resp.target,
        target = _resp$target === undefined ? {} : _resp$target;

    return res.json(target);
  }
  res.json({});
});

app.listen(3000, function () {
  return console.log('Update server listening on port 3000!');
});