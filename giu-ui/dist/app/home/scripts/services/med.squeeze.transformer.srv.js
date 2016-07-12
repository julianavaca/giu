System.register('app/home/scripts/services/med.squeeze.transformer.srv', ['./med.time.base.transformer.srv.js'], function (_export) {
  'use strict';

  var TimeBaseTransformer, SqueezeTransformerService;
  return {
    setters: [function (_medTimeBaseTransformerSrvJs) {
      TimeBaseTransformer = _medTimeBaseTransformerSrvJs['default'];
    }],
    execute: function () {
      SqueezeTransformerService = (function () {
        function SqueezeTransformerService() {
          babelHelpers.classCallCheck(this, SqueezeTransformerService);
        }

        babelHelpers.createClass(SqueezeTransformerService, [{
          key: 'squeezeToString',
          //extends TimeBaseTransformer {

          value: function squeezeToString(squeeze) {
            squeeze.TFIn = this._toString(squeeze.timeFrameIn);
            squeeze.TFLen = this._toString(squeeze.timeFrameLength);
            squeeze.TFOut = this._toString(squeeze.timeFrameOut);
            return squeeze;
          }
        }, {
          key: 'squeezesToString',
          value: function squeezesToString(squeezes) {
            var _this = this;

            squeezes.map(function (it) {
              return _this.squeezeToString(it);
            });
          }
        }, {
          key: 'squeezeToObject',
          value: function squeezeToObject(squeeze) {
            squeeze.timeFrameIn = this._toObject(squeeze.TFIn);
            delete squeeze.TFIn;
            squeeze.timeFrameLength = this._toObject(squeeze.TFLen);
            delete squeeze.TFLen;
            squeeze.timeFrameOut = this._toObject(squeeze.TFOut);
            delete squeeze.TFOut;
            return squeeze;
          }
        }, {
          key: 'squeezesToObject',
          value: function squeezesToObject(squeezes) {
            var _this2 = this;

            squeezes.map(function (it) {
              return _this2.squeezeToObject(it);
            });
          }

          //TODO: angular no injecta el time base transformer

        }, {
          key: 'timeCodeToFrame',
          value: function timeCodeToFrame(tc, frames) {
            var tcArray = tc.split(":").map(function (it) {
              return parseInt(it);
            });
            var result = 0;
            result += tcArray[3];
            result += tcArray[2] * frames;
            result += tcArray[1] * 60 * frames;
            result += tcArray[0] * 3600 * frames;
            return result;
          }
        }, {
          key: 'framesToTimecode',
          value: function framesToTimecode(frames, maxFrames) {
            var tcArray = [0, 0, 0, 0];
            var remFrames = frames;

            var hours = this._framesToObject(remFrames, 3600, maxFrames);
            tcArray[0] = hours;
            remFrames -= this._objectToFrame(hours, 3600, maxFrames);

            var minutes = this._framesToObject(remFrames, 60, maxFrames);
            tcArray[1] = minutes;
            remFrames -= this._objectToFrame(minutes, 60, maxFrames);

            var seconds = this._framesToObject(remFrames, 1, maxFrames);
            tcArray[2] = seconds;
            remFrames -= this._objectToFrame(seconds, 1, maxFrames);

            tcArray[3] = remFrames;

            return this._fillWithZeroes(tcArray.join(":"));
          }
        }, {
          key: '_framesToObject',
          value: function _framesToObject(frames, scale, maxFrames) {
            var object = Math.floor(frames / (scale * maxFrames));
            return object >= 1 ? object : 0;
          }
        }, {
          key: '_objectToFrame',
          value: function _objectToFrame(object, scale, maxFrames) {
            return object * (scale * maxFrames);
          }
        }, {
          key: '_toObject',
          value: function _toObject(timeCode) {
            if (this._isValid(timeCode)) {
              return this._elementToObject(timeCode);
            }
          }
        }, {
          key: '_toString',
          value: function _toString(timeCodeString) {
            if (this._isValid(timeCodeString)) {
              return this._elementToString(timeCodeString);
            }
          }
        }, {
          key: '_elementToObject',
          value: function _elementToObject(timeCode) {
            var splitted = timeCode.split(":");
            return {
              hour: splitted[0],
              minute: splitted[1],
              second: splitted[2],
              frame: splitted[3]
            };
          }
        }, {
          key: '_elementToString',
          value: function _elementToString(object) {
            var stringTC = object.hour + ":" + object.minute + ":" + object.second + ":" + object.frame;
            return this._fillWithZeroes(stringTC);
          }
        }, {
          key: '_fillWithZeroes',
          value: function _fillWithZeroes(stringTC) {
            var _this3 = this;

            return stringTC.split(":").map(function (it) {
              return _this3._fillZeroes(it);
            }).join(':');
          }
        }, {
          key: '_fillZeroes',
          value: function _fillZeroes(stringTC) {
            if (stringTC.length < 2) {
              return '0' + stringTC;
            }
            return stringTC;
          }
        }, {
          key: '_isValid',
          value: function _isValid(element) {
            return typeof element !== 'undefined' && element !== null;
          }
        }, {
          key: '_areValid',
          value: function _areValid(elements) {
            var _this4 = this;

            return elements.filter(function (it) {
              return !_this4._isValid(it);
            }).length === 0;
          }
        }]);
        return SqueezeTransformerService;
      })();

      _export('default', SqueezeTransformerService);
    }
  };
});
//# sourceMappingURL=med.squeeze.transformer.srv.js.map
