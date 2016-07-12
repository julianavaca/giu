System.register('app/home/scripts/services/med.rejection.transformer.srv', [], function (_export) {
  'use strict';

  var RejectionTransformerService;
  return {
    setters: [],
    execute: function () {
      RejectionTransformerService = (function () {

        /*@ngInject*/

        RejectionTransformerService.$inject = ["timeBaseTransformerService"];
        function RejectionTransformerService(timeBaseTransformerService) {
          babelHelpers.classCallCheck(this, RejectionTransformerService);

          this.timeBaseTransformerService = timeBaseTransformerService;
        }

        babelHelpers.createClass(RejectionTransformerService, [{
          key: 'rejectionsToString',
          value: function rejectionsToString(rejections) {
            var _this = this;

            rejections.map(function (it) {
              return _this._rejectionToString(it);
            });
          }
        }, {
          key: '_rejectionToString',
          value: function _rejectionToString(rejection) {
            rejection = this.elementToString(rejection);

            return rejection;
          }
        }, {
          key: 'elementToString',
          value: function elementToString(element) {
            element.tCInStr = this.timeBaseTransformerService._toString(element.tCIn);
            element.tcLenStr = this.timeBaseTransformerService._toString(element.length);
            element.tCOutStr = this.timeBaseTransformerService._toString(element.tCOut);
            return element;
          }
        }, {
          key: 'rejectionsToObject',
          value: function rejectionsToObject(rejections) {
            var _this2 = this;

            rejections.map(function (it) {
              return _this2.rejectionToObject(it);
            });
          }
        }, {
          key: 'rejectionToObject',
          value: function rejectionToObject(rejection) {

            rejection = this.elementToObject(rejection);

            return rejection;
          }
        }, {
          key: 'elementToObject',
          value: function elementToObject(element) {
            element.tCIn = this.timeBaseTransformerService._toObject(element.tCInStr);
            delete element.tCInStr;
            element.length = this.timeBaseTransformerService._toObject(element.tcLenStr);
            delete element.tcLenStr;
            element.tCOut = this.timeBaseTransformerService._toObject(element.tCOutStr);
            delete element.tCOutStr;

            delete element.technicalQualities;
            return element;
          }
        }]);
        return RejectionTransformerService;
      })();

      _export('default', RejectionTransformerService);
    }
  };
});
//# sourceMappingURL=med.rejection.transformer.srv.js.map
