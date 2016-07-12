System.register('app/home/scripts/services/med.segment.transformer.srv', ['./med.time.base.transformer.srv.js'], function (_export) {
  'use strict';

  var TimeBaseTransformer, SegmentTransformerService;
  return {
    setters: [function (_medTimeBaseTransformerSrvJs) {
      TimeBaseTransformer = _medTimeBaseTransformerSrvJs['default'];
    }],
    execute: function () {
      SegmentTransformerService = (function () {
        //extends TimeBaseTransformer {

        /*@ngInject*/

        SegmentTransformerService.$inject = ["$injector"];
        function SegmentTransformerService($injector) {
          babelHelpers.classCallCheck(this, SegmentTransformerService);

          //super();
          this.squeezeTransformerService = $injector.get('squeezeTransformerService');
          this.hotStartTransformerService = $injector.get('hotStartTransformerService');
        }

        babelHelpers.createClass(SegmentTransformerService, [{
          key: 'segmentsToString',
          value: function segmentsToString(segments) {
            var _this = this;

            segments.map(function (it) {
              return _this._segmentToString(it);
            });
          }
        }, {
          key: '_segmentToString',
          value: function _segmentToString(segment) {
            segment = this.elementToString(segment);
            if (segment.ingestID == null) {
              segment.ingestID = undefined;
            }
            if (segment.credit !== null && segment.credit !== undefined) {
              segment.credit = this.elementToString(segment.credit);
            }
            if (segment.squeezeCredit !== null && segment.squeezeCredit !== undefined) {
              this.squeezeTransformerService.squeezesToString(segment.squeezeCredit);
            }
            if (segment.hotStart !== null && segment.hotStart !== undefined) {
              this.hotStartTransformerService.hotStartToString(segment.hotStart);
            }
            return segment;
          }
        }, {
          key: 'elementToString',
          value: function elementToString(element) {
            element.tCIn = this._toString(element.timeCodeIn);
            element.lth = this._toString(element.length);
            element.tCOut = this._toString(element.timeCodeOut);
            return element;
          }
        }, {
          key: 'segmentsToObject',
          value: function segmentsToObject(segments) {
            var _this2 = this;

            segments.map(function (it) {
              return _this2.segmentToObject(it);
            });
          }
        }, {
          key: 'segmentToObject',
          value: function segmentToObject(segment) {

            segment = this.elementToObject(segment);
            if (segment.credit !== null && segment.credit !== undefined) {
              segment.credit = this.elementToObject(segment.credit);
            }
            if (segment.squeezeCredit !== null && segment.squeezeCredit !== undefined) {
              this.squeezeTransformerService.squeezesToObject(segment.squeezeCredit);
            }
            if (segment.hotStart !== null && segment.hotStart !== undefined) {
              this.hotStartTransformerService.hotStartToObject(segment.hotStart);
            }
            return segment;
          }
        }, {
          key: 'elementToObject',
          value: function elementToObject(element) {
            element.timeCodeIn = this._toObject(element.tCIn);
            delete element.tCIn;
            element.length = this._toObject(element.lth);
            delete element.lth;
            element.timeCodeOut = this._toObject(element.tCOut);
            delete element.tCOut;
            return element;
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
        return SegmentTransformerService;
      })();

      _export('default', SegmentTransformerService);
    }
  };
});
//# sourceMappingURL=med.segment.transformer.srv.js.map
