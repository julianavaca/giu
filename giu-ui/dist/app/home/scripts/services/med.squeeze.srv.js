System.register('app/home/scripts/services/med.squeeze.srv', ['./med.segment.srv.js'], function (_export) {
  'use strict';

  var SegmentService, SqueezeService;
  return {
    setters: [function (_medSegmentSrvJs) {
      SegmentService = _medSegmentSrvJs['default'];
    }],
    execute: function () {
      SqueezeService = (function (_SegmentService) {
        SqueezeService.$inject = ["timeBaseTransformerService"];
        babelHelpers.inherits(SqueezeService, _SegmentService);

        /*@ngInject*/

        function SqueezeService(timeBaseTransformerService) {
          babelHelpers.classCallCheck(this, SqueezeService);

          babelHelpers.get(Object.getPrototypeOf(SqueezeService.prototype), 'constructor', this).call(this, timeBaseTransformerService);
        }

        babelHelpers.createClass(SqueezeService, [{
          key: 'areSqueezesValid',
          value: function areSqueezesValid(squeezes, credit) {
            var _this = this;

            return typeof squeezes.find(function (sq) {
              return !_this.isSqueezeValid(sq, credit) || !_this.isCodeSelected(sq);
            }) === 'undefined';
          }
        }, {
          key: 'isSqueezeValid',
          value: function isSqueezeValid(squeeze, credit) {
            if (!squeeze.TFIn || !squeeze.TFOut) {
              return true;
            }
            return this._isBiggerOrEqual(squeeze.TFIn, credit.tCIn) && this._isBiggerOrEqual(credit.tCOut, squeeze.TFOut);
          }
        }, {
          key: 'isCodeSelected',
          value: function isCodeSelected(squeeze) {
            if (this.isFormatValid(squeeze.TFIn) && this.isFormatValid(squeeze.TFOut)) return squeeze.code;
            return true;
          }
        }, {
          key: 'updateTCOut',
          value: function updateTCOut(squeeze, frames) {
            if (this._areFormatsValid(squeeze)) {
              squeeze.TFOut = this._plus(squeeze.TFIn, squeeze.TFLen, frames);
            }
          }
        }, {
          key: '_areFormatsValid',
          value: function _areFormatsValid(squeeze) {
            var _this2 = this;

            return typeof [squeeze.TFIn, squeeze.TFLen].find(function (it) {
              return !_this2.isFormatValid(it);
            }) === 'undefined';
          }
        }, {
          key: 'areFramesValid',
          value: function areFramesValid(squeezes, frames) {
            var _this3 = this;

            return typeof squeezes.find(function (squeeze) {
              return !_this3._areFramesValid(squeeze, frames);
            }) === 'undefined';
          }
        }, {
          key: '_areFramesValid',
          value: function _areFramesValid(squeeze, frames) {
            var _this4 = this;

            return typeof [squeeze.TFIn, squeeze.TFLen].find(function (it) {
              return !_this4.isFramesValid(it, frames);
            }) === 'undefined';
          }
        }, {
          key: 'areSqueezeFramesFromSegmentsValid',
          value: function areSqueezeFramesFromSegmentsValid(segments, maxFrame) {
            var self = this;
            return segments.every(function (segment) {

              if (segment.squeezeCredit.length == 0) {
                return true;
              }
              return self.areFramesValid(segment.squeezeCredit, maxFrame);
            });
          }
        }]);
        return SqueezeService;
      })(SegmentService);

      _export('default', SqueezeService);
    }
  };
});
//# sourceMappingURL=med.squeeze.srv.js.map
