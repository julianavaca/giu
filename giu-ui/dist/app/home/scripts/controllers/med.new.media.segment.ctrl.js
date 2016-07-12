System.register('app/home/scripts/controllers/med.new.media.segment.ctrl', ['../med.wizard.tab.js'], function (_export) {
  'use strict';
  var WizardTab, NewMediaSegmentCtrl;
  return {
    setters: [function (_medWizardTabJs) {
      WizardTab = _medWizardTabJs['default'];
    }],
    execute: function () {
      NewMediaSegmentCtrl = (function (_WizardTab) {
        NewMediaSegmentCtrl.$inject = ["$injector", "$state", "segmentService", "squeezeService", "segmentTransformerService", "translateService", "$scope", "alertService"];
        babelHelpers.inherits(NewMediaSegmentCtrl, _WizardTab);

        /*@ngInject*/

        function NewMediaSegmentCtrl($injector, $state, segmentService, squeezeService, segmentTransformerService, translateService, $scope, alertService) {
          babelHelpers.classCallCheck(this, NewMediaSegmentCtrl);

          babelHelpers.get(Object.getPrototypeOf(NewMediaSegmentCtrl.prototype), 'constructor', this).call(this, {
            injector: $injector,
            endpoint: 'mediaSegments',
            key: 'id',
            backToState: 'newMedia.summary',
            successTitle: 'media.edit.alert.success.title',
            successMessage: 'media.edit.alert.success.message',
            successCreateMessage: 'media.edit.alert.create.success.message',
            successEditMessage: 'media.edit.alert.success.message',
            errorTitle: 'media.edit.alert.error',
            executeGet: false,
            params: $state.params,
            entityDependencies: [{ api: 'mediaSqueezeCreditsTypes', loading: 'isLoading', model: 'squeezeCreditTypes' }]
          });

          this.segmentTransformerService = segmentTransformerService;
          this.translateService = translateService;
          this.alertService = alertService;
          this.segmentService = segmentService;
          this.squeezeService = squeezeService;
          this.$scope = $scope;
          this._initSegment();
          //this.autoEdit();
        }

        // autoEdit(){
        //    this._onSegmentCreate();
        // }

        babelHelpers.createClass(NewMediaSegmentCtrl, [{
          key: '_initSegment',
          value: function _initSegment() {
            var _this = this;

            this.model = this.newMediaService.getModel();
            this.action = [{
              tooltip: this.translateService.translate('tooltip.create'),
              icon: 'plus',
              action: function action() {
                _this._onSegmentCreate();
              },
              show: { value: true }
            }];
            this.actionSqueezeCredits = [{
              tooltip: this.translateService.translate('tooltip.create'),
              icon: 'plus',
              action: function action() {
                _this._onSqueezeCreate();
              },
              show: { value: true }
            }];
            if (this.$state.params.id) {
              this._execute();
            } else {
              this.entity = { items: [] };
            }
          }
        }, {
          key: '_onSegmentCreate',
          value: function _onSegmentCreate() {
            if (typeof this.entity === 'undefined') {
              this.entity = {
                items: []
              };
            }
            var segAux = {
              segmentNumber: this.entity.items.length,
              lth: "00:00:00:00",
              tCIn: "00:00:00:00",
              tCOut: "00:00:00:00",
              credit: undefined,
              squeezeCredit: [],
              isIngested: false
            };
            if (this.entity.items.length > 0) {
              segAux.tCIn = this.entity.items[this.entity.items.length - 1].tCOut;
            }
            this.entity.items.push(segAux);
            this.changeSegment(segAux);
          }
        }, {
          key: '_execute',
          value: function _execute() {
            var _this2 = this;

            this.get().$promise.then(function (response) {
              _this2.entity = response;
              _this2.segmentTransformerService.segmentsToString(_this2.entity.items);
              _this2.changeSegment(_this2.entity.items[0]);
            });
          }
        }, {
          key: '_onSqueezeCreate',
          value: function _onSqueezeCreate() {
            if (!this.selectedSegment.squeezeCredit) {
              this.selectedSegment.squeezeCredit = [];
            }
            var sqAux = {
              code: { id: undefined },
              TFIn: this.selectedSegment.credit.tCIn,
              TFLen: "00:00:00:00"
            };
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
            }
          }
        }, {
          key: 'changeCreditType',
          value: function changeCreditType(segment) {
            if (!segment.credit.type.id) {
              segment.credit = undefined;
              segment.squeezeCredit = undefined;
            } else {
              this.createCredit(segment);
            }
          }
        }, {
          key: 'createCredit',
          value: function createCredit(segment) {
            if (segment.credit) {
              segment.credit.lth = segment.credit.lth || "00:00:00:00";
              segment.credit.tCIn = segment.credit.tCIn || this.selectedSegment.tCIn;
              segment.credit.tCOut = segment.credit.tCOut || "00:00:00:00";
            }
          }
        }, {
          key: 'deleteEntry',
          value: function deleteEntry(entry) {
            var _this3 = this;

            if (typeof entry === 'undefined') {
              this.deleteItemInArraySqueeze(entry);
            }
            //borramos el registro pedido
            if (entry.isScheduled != undefined && entry.isScheduled == true) {
              this.alertService.dismissable({
                title: this.translateService.translate('results.tabs.segments.scheduled.title'),
                message: this.translateService.translate('results.tabs.segments.scheduled.message')
              }, function () {
                return _this3.deleteSegment(entry);
              });
            } else {
              this.deleteSegment(entry);
            }
          }
        }, {
          key: 'deleteSegment',
          value: function deleteSegment(entry) {
            var _this4 = this;

            var index = this.entity.items.indexOf(entry);
            this.entity.items.splice(index, 1);
            this.entity.items.forEach(function (seg) {
              seg.segmentNumber = _this4.entity.items.indexOf(seg);
            });
          }
        }, {
          key: 'deleteSqueeze',
          value: function deleteSqueeze(sq) {
            if (this.entity.items) {
              var indx = this.selectedSegment.squeezeCredit.indexOf(sq);
              this.selectedSegment.squeezeCredit.splice(indx, 1);
            }
          }
        }, {
          key: 'deleteItemInArraySqueeze',
          value: function deleteItemInArraySqueeze(segment) {
            if (segment) {
              if (segment.credit != null && segment.credit !== undefined) {
                segment.squeezeCredits = [];
              }
            }
          }
        }, {
          key: 'isValid',
          value: function isValid() {
            if (!this.entity.items) {
              return true;
            }

            if (this.entity.items.length < 1) {
              return true;
            }
            if (this.newMediaService.invalidPlusDetail !== false) {
              return false;
            }
            var isValid = this.segmentService.areValid(this.entity.items);
            var isValidFormat = this.segmentService.areFormatValid(this.entity.items);
            var isOverlaped = this.segmentService.areOverlaped(this.entity.items);
            var isCreditValid = this.segmentService.areCreditValid(this.entity.items);
            var isFramesValid = this.segmentService.areFramesValid(this.entity.items, this.model.standard.frames);
            var isValidSqueezeFormat = this.squeezeService.areFormatValid(this.selectedSegment.squeezeCredit);
            var isFramesSqueezeValid = this.segmentService.areFramesValid(this.entity.items, this.model.standard.frames);
            var isValidSqueezes = this.squeezeService.areSqueezesValid(this.selectedSegment.squeezeCredit, this.selectedSegment.credit);
            return isValid && !isOverlaped && isValidFormat && isCreditValid && isValidSqueezeFormat && isFramesValid && isFramesSqueezeValid && isValidSqueezes;
          }
        }, {
          key: 'saveAndNextStep',
          value: function saveAndNextStep(form) {
            var _this5 = this;

            form.$valid = this.isValid();
            if (this.entity.items.length < 1) {
              babelHelpers.get(Object.getPrototypeOf(NewMediaSegmentCtrl.prototype), 'nextStep', this).call(this);
            } else {
              this.segmentTransformerService.segmentsToObject(this.entity.items);
              babelHelpers.get(Object.getPrototypeOf(NewMediaSegmentCtrl.prototype), 'saveAndNextStepWithCallback', this).call(this, form, function () {
                return _this5._execute();
              });
            }
          }
        }, {
          key: 'saveAndExit',
          value: function saveAndExit(form) {
            form.$valid = this.isValid();
            this.segmentTransformerService.segmentsToObject(this.entity.items);
            babelHelpers.get(Object.getPrototypeOf(NewMediaSegmentCtrl.prototype), 'saveAndExit', this).call(this, form);
          }
        }, {
          key: 'nextStep',
          value: function nextStep() {
            var segmentLength = this.newMediaService.getFromModel('materialByMedia');
            segmentLength.segments = { length: this.entity.items.length };
            this.setResourceOnModel('mediaSegments', 'mediaSegments');
            this.newMediaService.invalidSegment = false;
            babelHelpers.get(Object.getPrototypeOf(NewMediaSegmentCtrl.prototype), 'nextStep', this).call(this);
          }
        }, {
          key: 'setResourceOnModel',
          value: function setResourceOnModel(endpoint, keyForModel, attr) {
            var _this6 = this;

            this.api[endpoint].get({ 'id': this.newMediaService.mediaId }).$promise.then(function (response) {
              if (attr) {
                _this6.newMediaService.setToModel(keyForModel, response[attr]);
              } else {
                _this6.newMediaService.setToModel('timeCodein', response.items[0].timeCodeIn);
                _this6.newMediaService.setToModel('timeCodeOut', response.items[0].timeCodeOut);
              }
            });
          }
        }, {
          key: 'checkSegmentTheme',
          value: function checkSegmentTheme() {
            if (this.newMediaService.model.mediaSegments === undefined) {
              return;
            }
            if (this.newMediaService.model.mediaSegments.items.length === 0) {
              return;
            }
            if (this.newMediaService.model.mediaSegments.theme != undefined && this.newMediaService.model.mediaSegments.theme.duration != undefined) {
              var segmentZero = this.entity.items.find(function (segment) {
                return segment.segmentNumber === 0;
              });
              var _length = this.segmentTransformerService.segmentToObject(angular.copy(segmentZero)).length;
              return _length.second != this.newMediaService.model.mediaSegments.theme.duration;
            }
          }
        }]);
        return NewMediaSegmentCtrl;
      })(WizardTab);

      _export('default', NewMediaSegmentCtrl);
    }
  };
});
//# sourceMappingURL=med.new.media.segment.ctrl.js.map
