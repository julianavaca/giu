System.register('app/home/scripts/services/med.segment.srv', ['./med.time.code.srv.js'], function (_export) {
  'use strict';

  var TimeCodeService, SegmentService;
  return {
    setters: [function (_medTimeCodeSrvJs) {
      TimeCodeService = _medTimeCodeSrvJs['default'];
    }],
    execute: function () {
      SegmentService = (function (_TimeCodeService) {
        SegmentService.$inject = ["timeBaseTransformerService"];
        babelHelpers.inherits(SegmentService, _TimeCodeService);

        /*@ngInject*/

        function SegmentService(timeBaseTransformerService) {
          babelHelpers.classCallCheck(this, SegmentService);

          babelHelpers.get(Object.getPrototypeOf(SegmentService.prototype), 'constructor', this).call(this, timeBaseTransformerService);
          this.timeBaseTransformer = timeBaseTransformerService;
        }

        babelHelpers.createClass(SegmentService, [{
          key: 'updateTCOut',
          value: function updateTCOut(segment, frames) {
            if (this._areFormatsValid(segment)) {
              segment.tCOut = this._plus(segment.tCIn, segment.lth, frames);
            }
          }
        }, {
          key: 'notDuplicateIngestedId',
          value: function notDuplicateIngestedId(segments) {
            var _this = this;

            return segments.filter(function (seg) {
              return _this.isDuplicatedIngestedId(seg, segments);
            }).length === 0;
          }
        }, {
          key: 'isDuplicatedIngestedId',
          value: function isDuplicatedIngestedId(seg, segments) {
            if (seg.ingestID === null || seg.ingestID === undefined || seg.ingestID === '') {
              return false;
            }
            return segments.filter(function (it) {
              return it.segmentNumber !== seg.segmentNumber && seg.ingestID === it.ingestID;
            }).length !== 0;
          }
        }, {
          key: 'areFramesValid',
          value: function areFramesValid(segments, frames) {
            var _this2 = this;

            return typeof segments.find(function (seg) {
              return !_this2._areFramesValid(seg, frames);
            }) === 'undefined';
          }
        }, {
          key: '_areFramesValid',
          value: function _areFramesValid(segment, frames) {
            var _this3 = this;

            var toValidate = [segment.tCIn, segment.lth];
            if (segment.credit) {
              toValidate.push(segment.credit.tCIn);
              toValidate.push(segment.credit.lth);
            }
            return typeof toValidate.find(function (it) {
              return !_this3.isFramesValid(it, frames);
            }) === 'undefined';
          }
        }, {
          key: 'areFormatValid',
          value: function areFormatValid(segments) {
            var _this4 = this;

            return typeof segments.find(function (seg) {
              return !_this4._areFormatsValid(seg);
            }) === 'undefined';
          }
        }, {
          key: 'areValid',
          value: function areValid(segments) {
            var _this5 = this;

            return typeof segments.find(function (seg) {
              return !_this5._areValid(seg);
            }) === 'undefined';
          }
        }, {
          key: '_areValid',
          value: function _areValid(segment) {
            var toValidate = [segment.tCIn, segment.lth, segment.tCOut];
            return toValidate.filter(function (it) {
              return angular.isUndefined(it);
            }).length === 0;
          }
        }, {
          key: 'areOverlaped',
          value: function areOverlaped(segments) {
            var _this6 = this;

            return segments.filter(function (seg) {
              return _this6.isOverlaped(seg, segments);
            }).length !== 0;
          }
        }, {
          key: 'isOverlaped',
          value: function isOverlaped(currentSegment, segments) {
            var _this7 = this;

            if (!currentSegment || currentSegment.segmentNumber < 2) {
              return false;
            } else {
              var overlappedItems = segments.filter(function (it) {
                return _this7._isOverlaped(currentSegment, it);
              });
              return overlappedItems.length !== 0;
            }
          }
        }, {
          key: 'areCreditValid',
          value: function areCreditValid(segments) {
            var _this8 = this;

            return typeof segments.find(function (seg) {
              return !_this8.isCreditValid(seg);
            }) === 'undefined';
          }
        }, {
          key: 'isCreditValid',
          value: function isCreditValid(segment) {
            if (!segment.credit) {
              return true;
            }
            if (!segment.credit.tCOut || !segment.credit.tCIn) {
              return true;
            }
            return this._isBiggerOrEqual(segment.credit.tCIn, segment.tCIn) && this._isBiggerOrEqual(segment.tCOut, segment.credit.tCOut);
          }
        }, {
          key: '_isOverlaped',
          value: function _isOverlaped(segment, anotherSegment) {
            return anotherSegment.segmentNumber < segment.segmentNumber && anotherSegment.segmentNumber !== 0 && !this._isBiggerOrEqual(segment.tCIn, anotherSegment.tCOut);
          }
        }, {
          key: '_areFormatsValid',
          value: function _areFormatsValid(segment) {
            var _this9 = this;

            var toValidate = [segment.tCIn, segment.lth];
            if (segment.credit) {
              toValidate.push(segment.credit.tCIn);
              toValidate.push(segment.credit.lth);
            }
            return typeof toValidate.find(function (it) {
              return !_this9.isFormatValid(it);
            }) === 'undefined';
          }
        }]);
        return SegmentService;
      })(TimeCodeService);

      _export('default', SegmentService);
    }
  };
});
//# sourceMappingURL=med.segment.srv.js.map
