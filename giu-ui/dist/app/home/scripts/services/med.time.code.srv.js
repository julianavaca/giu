System.register('app/home/scripts/services/med.time.code.srv', [], function (_export) {
  'use strict';

  var TimeCodeService;
  return {
    setters: [],
    execute: function () {
      TimeCodeService = (function () {

        /*@ngInject*/

        TimeCodeService.$inject = ["timeBaseTransformerService"];
        function TimeCodeService(timeBaseTransformerService) {
          babelHelpers.classCallCheck(this, TimeCodeService);

          this.timeBaseTransformer = timeBaseTransformerService;
        }

        babelHelpers.createClass(TimeCodeService, [{
          key: 'isFormatValid',
          value: function isFormatValid(timeCode) {
            if (!this.timeBaseTransformer._isValid(timeCode)) {
              //Not value to validate
              return true;
            }
            var splittedTime = timeCode.split(':');
            if (splittedTime.length != 4) {
              //Not valid format
              return false;
            }
            return splittedTime.filter(function (elem) {
              return Number.isNaN(elem) || elem.length !== 2;
            }).length === 0;
          }
        }, {
          key: 'isValid',
          value: function isValid(timeCode) {
            return this.timeBaseTransformer._isValid(timeCode);
          }
        }, {
          key: 'isFramesValid',
          value: function isFramesValid(timeCodeString, maxFrames) {
            if (this.timeBaseTransformer._isValid(timeCodeString) && this.isFormatValid(timeCodeString)) {
              return parseInt(timeCodeString.split(':')[3]) < maxFrames;
            }
            return true;
          }
        }, {
          key: '_plus',
          value: function _plus(tc1, tc2, maxFrames) {
            if (this.timeBaseTransformer._areValid([tc1, tc2, maxFrames])) {
              var tc1InFrames = this.timeBaseTransformer.timeCodeToFrame(tc1, maxFrames);
              var tc2InFrames = this.timeBaseTransformer.timeCodeToFrame(tc2, maxFrames);
              return this.timeBaseTransformer.framesToTimecode(tc1InFrames + tc2InFrames, maxFrames);
            }
          }
        }, {
          key: '_minus',
          value: function _minus(tc1, tc2, maxFrames) {
            if (this.timeBaseTransformer._areValid([tc1, tc2, maxFrames])) {
              var tc1InFrames = this.timeBaseTransformer.timeCodeToFrame(tc1, maxFrames);
              var tc2InFrames = this.timeBaseTransformer.timeCodeToFrame(tc2, maxFrames);
              return this.timeBaseTransformer.framesToTimecode(tc1InFrames - tc2InFrames, maxFrames);
            }
          }
        }, {
          key: '_isBiggerOrEqual',
          value: function _isBiggerOrEqual(tc1, tc2) {
            if (this.timeBaseTransformer._areValid([tc1, tc2])) {
              var tc1Number = parseInt(tc1.split(":").join(""));
              var tc2Number = parseInt(tc2.split(":").join(""));
              return tc1Number >= tc2Number;
            }
          }
        }, {
          key: '_isBigger',
          value: function _isBigger(tc1, tc2) {
            var tc1Number = parseInt(tc1.split(":").join(""));
            var tc2Number = parseInt(tc2.split(":").join(""));
            return tc1Number > tc2Number;
          }

          /* Delete */
          /* TODO: Este metodo no lo deberia usar nadie, menos que menos llamarse Lucas
          stringToObjectLucas(stringTC) {
            let arrayTC = stringTC.split(":");
            let objTC = {
              "hour":arrayTC[0],
              "minutes":arrayTC[1],
              "seconds":arrayTC[2],
              "frames":arrayTC[3]
            };
            return objTC;
          }
          */
        }]);
        return TimeCodeService;
      })();

      _export('default', TimeCodeService);
    }
  };
});
//# sourceMappingURL=med.time.code.srv.js.map
