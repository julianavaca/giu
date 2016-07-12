System.register('app/home/scripts/services/med.rejection.srv', ['./med.time.code.srv.js'], function (_export) {
  'use strict';

  var TimeCodeService, RejectionService;
  return {
    setters: [function (_medTimeCodeSrvJs) {
      TimeCodeService = _medTimeCodeSrvJs['default'];
    }],
    execute: function () {
      RejectionService = (function (_TimeCodeService) {
        RejectionService.$inject = ["timeBaseTransformerService"];
        babelHelpers.inherits(RejectionService, _TimeCodeService);

        /*@ngInject*/

        function RejectionService(timeBaseTransformerService) {
          babelHelpers.classCallCheck(this, RejectionService);

          babelHelpers.get(Object.getPrototypeOf(RejectionService.prototype), 'constructor', this).call(this, timeBaseTransformerService);
          this.timeBaseTransformer = timeBaseTransformerService;
        }

        babelHelpers.createClass(RejectionService, [{
          key: 'updateTCLen',
          value: function updateTCLen(rejection, frames) {
            if (this._areFormatsValid(rejection) && this.isTCInVsTCOutValid(rejection)) {
              rejection.tcLenStr = this._minus(rejection.tCOutStr, rejection.tCInStr, frames);
            }
          }
        }, {
          key: 'areFramesValid',
          value: function areFramesValid(rejections, frames) {
            var _this = this;

            return typeof rejections.find(function (rej) {
              return !_this._areFramesValid(rej, frames);
            }) === 'undefined';
          }
        }, {
          key: '_areFramesValid',
          value: function _areFramesValid(rejection, frames) {
            var _this2 = this;

            var toValidate = [rejection.tCInStr, rejection.tcLenStr];

            return typeof toValidate.find(function (it) {
              return !_this2.isFramesValid(it, frames);
            }) === 'undefined';
          }
        }, {
          key: 'areFormatValid',
          value: function areFormatValid(rejections) {
            var _this3 = this;

            return typeof rejections.find(function (rej) {
              return !_this3._areFormatsValid(rej);
            }) === 'undefined';
          }
        }, {
          key: '_areFormatsValid',
          value: function _areFormatsValid(rejection) {
            var _this4 = this;

            var toValidate = [rejection.tCInStr, rejection.tCOutStr];

            return typeof toValidate.find(function (it) {
              return !_this4.isFormatValid(it);
            }) === 'undefined';
          }
        }, {
          key: 'isInsideMaterial',
          value: function isInsideMaterial(tc, tcMin, tcMax) {
            return this._isBiggerOrEqual(tc, tcMin) && this._isBiggerOrEqual(tcMax, tc);
          }
        }, {
          key: 'areInsideMaterial',
          value: function areInsideMaterial(rejections, tcMin, tcMax) {
            var _this5 = this;

            return typeof rejections.find(function (rej) {
              return !_this5.isInsideMaterial(rej.tCInStr, tcMin, tcMax) || !_this5.isInsideMaterial(rej.tCOutStr, tcMin, tcMax);
            }) === 'undefined';
          }
        }, {
          key: 'isTCInVsTCOutValid',
          value: function isTCInVsTCOutValid(rejection) {
            return this._isBiggerOrEqual(rejection.tCOutStr, rejection.tCInStr);
          }
        }, {
          key: 'areTCInVsTCOutValid',
          value: function areTCInVsTCOutValid(rejections) {
            var _this6 = this;

            return typeof rejections.find(function (rej) {
              return !_this6.isTCInVsTCOutValid(rej);
            }) === 'undefined';
          }
        }]);
        return RejectionService;
      })(TimeCodeService);

      _export('default', RejectionService);
    }
  };
});
//# sourceMappingURL=med.rejection.srv.js.map
