System.register('app/home/scripts/controllers/med.segments.base.ctrl', [], function (_export) {
  'use strict';

  /* global console */

  var SegmentsBase;
  return {
    setters: [],
    execute: function () {
      SegmentsBase = (function () {

        /*@ngInject*/

        SegmentsBase.$inject = ["segmentService", "squeezeService", "segmentTransformerService", "translateService", "$state", "$mdDialog", "alertService", "$scope"];
        function SegmentsBase(segmentService, squeezeService, segmentTransformerService, translateService, $state, $mdDialog, alertService, $scope) {
          babelHelpers.classCallCheck(this, SegmentsBase);

          this.alertService = alertService;
          this.$state = $state;
          this.$scope = $scope;
          this.mdDialog = $mdDialog;
          this.segmentTransformerService = segmentTransformerService;
          this.translateService = translateService;
          this.segmentService = segmentService;
          this.squeezeService = squeezeService;
        }

        babelHelpers.createClass(SegmentsBase, [{
          key: '_onSegmentCreate',
          value: function _onSegmentCreate() {
            if (typeof this.segments === 'undefined') {
              this.segments = [];
            }
            var segAux = {
              segmentNumber: this.segments.length,
              lth: "00:00:00:00",
              tCIn: "00:00:00:00",
              tCOut: "00:00:00:00",
              credit: undefined,
              squeezeCredit: [],
              isIngested: false
            };
            if (this.segments.length > 1) {
              segAux.tCIn = this.segments[this.segments.length - 1].tCOut;
            }
            this.segments.push(segAux);
            this._checkInitialSegment();
            this.changeSegment(segAux);
            this.squeezeCreditsEdit.value = false;
          }
        }, {
          key: '_checkInitialSegment',
          value: function _checkInitialSegment() {
            if (this.segments.length > 1) {
              this.segments[0].ingestID = undefined;
            }
          }
        }, {
          key: '_onSegmentEdit',
          value: function _onSegmentEdit() {
            this.segmentEdit.value = !this.segmentEdit.value;
            this.segmentEditShow.value = !this.segmentEditShow.value;
            if (this.segments == 0) {
              this._onSegmentCreate();
            }
            this._allowCreateSqueeze();
          }
        }, {
          key: '_onSqueezeCreate',
          value: function _onSqueezeCreate() {
            if (!this.selectedSegment.squeezeCredit) {
              this.selectedSegment.squeezeCredit = [];
            }
            var sqAux = {
              code: undefined,
              TFIn: "00:00:00:00",
              TFLen: "00:00:00:00",
              TFOut: "00:00:00:00"
            };
            if (this.selectedSegment.squeezeCredit.length === 0) {
              sqAux.TFIn = this.selectedSegment.credit.tCIn;
              sqAux.TFLen = this.selectedSegment.credit.lth;
              sqAux.TFOut = this.selectedSegment.credit.tCOut;
            } else {
              sqAux.TFIn = this.selectedSegment.squeezeCredit[this.selectedSegment.squeezeCredit.length - 1].TFOut;
            }
            this.selectedSegment.squeezeCredit.push(sqAux);
          }
        }, {
          key: 'changeSegment',
          value: function changeSegment(segment) {
            if (!segment) {
              return;
            }
            if (!this.selectedSegment) {
              this.selectedSegment = segment;
            }
            if (segment.segmentNumber !== this.selectedSegment.segmentNumber) {
              this.selectedSegment = segment;
              this._allowCreateSqueeze();
            }
          }
        }, {
          key: '_allowCreateSqueeze',
          value: function _allowCreateSqueeze() {
            var hasCredit = typeof this.selectedSegment.credit !== 'undefined' && this.selectedSegment.credit !== null && this.segmentEdit.value;
            this.squeezeCreate.value = hasCredit;
          }
        }, {
          key: 'deleteEntry',
          value: function deleteEntry(entry) {
            var _this = this;

            var self = this;
            var index = this.segments.indexOf(entry);
            if (entry.isScheduled != undefined && entry.isScheduled == true) {
              this.alertService.dismissable({
                title: this.translateService.translate('results.tabs.segments.scheduled.title'),
                message: this.translateService.translate('results.tabs.segments.scheduled.message')
              }, function () {
                return _this.deleteSegment(index, self);
              });
            } else {
              this.deleteSegment(index, self);
            }
          }
        }, {
          key: 'checkSegmentTheme',
          value: function checkSegmentTheme() {

            if (this.entity != undefined && this.entity.theme != undefined && this.entity.theme.duration != undefined) {

              var segmentZero = this.segments.find(function (segment) {
                return segment.segmentNumber === 0;
              });

              var _length = this.segmentTransformerService.segmentToObject(angular.copy(segmentZero)).length;

              //let seconds = this.getPosition(length, ':', 2);

              return _length.second != this.entity.theme.duration;
            }
          }
        }, {
          key: 'getPosition',
          value: function getPosition(str, m, i) {
            return str.split(m, i).join(m).length;
          }
        }, {
          key: 'deleteSegment',
          value: function deleteSegment(index, self) {
            self.segments.splice(index, 1);
            self.segments.forEach(function (seg) {
              seg.segmentNumber = self.segments.indexOf(seg);
            });
            this.$scope.$apply();
          }
        }, {
          key: 'segmentCancel',
          value: function segmentCancel(target) {
            this.segmentEdit.value = !this.segmentEdit.value;
            this.segmentEditShow.value = !this.segmentEditShow.value;
            this.squeezeCreate.value = false;
            this.squeezeCreditsEdit.value = false;
            this.selectedSegment = undefined;
            target._execute();
          }
        }, {
          key: 'reload',
          value: function reload() {
            this.segmentEdit.value = false;
            this.segmentEditShow.value = true;
            this.squeezeCreditsEdit.value = this.segmentEdit.value;
            this.selectedSegment = undefined;
          }
        }, {
          key: 'isValid',
          value: function isValid() {
            if (!this.segments) {
              return false;
            }
            if (this.segments.length < 1) {
              return false;
            }

            var isValid = this.segmentService.areValid(this.segments);
            var isValidFormat = this.segmentService.areFormatValid(this.segments);
            var isOverlaped = this.segmentService.areOverlaped(this.segments);
            var isCreditValid = this.segmentService.areCreditValid(this.segments);
            var isFramesValid = this.segmentService.areFramesValid(this.segments, this.entity.standard.frames);
            var isValidIngestedId = this.segmentService.notDuplicateIngestedId(this.segments);

            var isValidSqueezeFormat = this.squeezeService.areFormatValid(this.selectedSegment.squeezeCredit);
            var isFramesSqueezeValid = this.squeezeService.areSqueezeFramesFromSegmentsValid(this.segments, this.entity.standard.frames);
            var isValidSqueezes = this.squeezeService.areSqueezesValid(this.selectedSegment.squeezeCredit, this.selectedSegment.credit);

            return isValid && !isOverlaped && isValidFormat && isCreditValid && isValidSqueezeFormat && isFramesValid && isFramesSqueezeValid && isValidSqueezes && isValidIngestedId;
          }
        }, {
          key: 'validateAndSave',
          value: function validateAndSave(form) {
            var _this2 = this;

            form.$valid = this.isValid();
            //TODO: Hacer un clone mas lindo;
            this.entity.items = [];
            this.segments.forEach(function (seg) {
              _this2.entity.items.push(Object.assign({}, seg));
            });
            this.segmentTransformerService.segmentsToObject(this.entity.items);
            this.save(form).then(function () {
              return _this2.reload();
            }, function (error) {
              _this2.onResponseError(error);
            }).then(function () {
              return _this2._execute();
            });
          }
        }, {
          key: 'changeCreditType',
          value: function changeCreditType(segment) {
            if (!segment.credit.type.id) {
              segment.credit = undefined;
              segment.squeezeCredit = [];
            } else {
              this.createCredit(segment);
            }
            this._allowCreateSqueeze();
          }
        }, {
          key: 'createCredit',
          value: function createCredit(segment) {
            if (segment.credit) {
              segment.credit.lth = segment.credit.lth || this.selectedSegment.lth;
              segment.credit.tCIn = segment.credit.tCIn || this.selectedSegment.tCIn;
              segment.credit.tCOut = segment.credit.tCOut || this.selectedSegment.tCOut;
            }
          }
        }, {
          key: 'deleteSqueeze',
          value: function deleteSqueeze(squeeze) {
            var index = this.selectedSegment.squeezeCredit.indexOf(squeeze);
            this.selectedSegment.squeezeCredit.splice(index, 1);
          }
        }, {
          key: 'onResponseError',
          value: function onResponseError(error) {
            var _this3 = this;

            if (error.status === 422) {
              (function () {
                var msj = 'Error in: ';
                error.data.forEach(function (err) {
                  msj = msj + ' ' + err.field;
                });
                _this3.alertService.error({
                  title: _this3.translateService.translate('results.tabs.segments.error.message.IngestId.duplicate'),
                  message: msj
                });
              })();
            }
          }
        }]);
        return SegmentsBase;
      })();

      _export('default', SegmentsBase);
    }
  };
});
//# sourceMappingURL=med.segments.base.ctrl.js.map
