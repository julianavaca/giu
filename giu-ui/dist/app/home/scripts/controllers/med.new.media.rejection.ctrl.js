System.register('app/home/scripts/controllers/med.new.media.rejection.ctrl', ['../med.wizard.tab.js'], function (_export) {
  'use strict';
  var WizardTab, NewMediaRejectionCtrl;
  return {
    setters: [function (_medWizardTabJs) {
      WizardTab = _medWizardTabJs['default'];
    }],
    execute: function () {
      NewMediaRejectionCtrl = (function (_WizardTab) {
        NewMediaRejectionCtrl.$inject = ["translateService", "$injector", "rejectionService", "rejectionTransformerService", "api", "$state"];
        babelHelpers.inherits(NewMediaRejectionCtrl, _WizardTab);

        /*@ngInject*/

        function NewMediaRejectionCtrl(translateService, $injector, rejectionService, rejectionTransformerService, api, $state) {
          var _this = this;

          babelHelpers.classCallCheck(this, NewMediaRejectionCtrl);

          babelHelpers.get(Object.getPrototypeOf(NewMediaRejectionCtrl.prototype), 'constructor', this).call(this, {
            injector: $injector,
            endpoint: 'mediaRejections',
            key: 'id',
            backToState: 'newMedia.summary',
            successTitle: 'media.edit.alert.success.title',
            successMessage: 'media.edit.alert.success.message',
            successCreateMessage: 'media.edit.alert.create.success.message',
            successEditMessage: 'common.alert.edit.success.title',
            errorTitle: 'media.edit.alert.error',
            executeGet: false,
            params: $state.params
          });

          this.translateService = translateService;
          this.rejectionService = rejectionService;

          this.api = api;
          this.rejectionTransformerService = rejectionTransformerService;

          this.entity = {
            items: [],
            standard: {
              frames: undefined
            }
          }; // para que no tiren error las validations

          this.rejectionsEdit = { value: true };
          this.rejectionsEditShow = { value: false };
          this.actions = [{
            tooltip: this.translateService.translate('tooltip.edit'),
            icon: 'edit',
            action: function action() {
              _this._onRejectionEdit();
            },
            show: this.rejectionsEditShow
          }, {
            tooltip: this.translateService.translate('tooltip.create'),
            icon: 'plus',
            action: function action() {
              _this._onRejectionCreate();
            },
            show: this.rejectionsEdit
          }];
        }

        //autoEdit(){
        //   this._onRejectionCreate();
        // }

        babelHelpers.createClass(NewMediaRejectionCtrl, [{
          key: '_onRejectionCreate',
          value: function _onRejectionCreate() {
            if (typeof this.entity.items === 'undefined') {
              this.entity.items = [];
            }
            var rejAux = {
              tCInStr: this.entity.mediaMaterialTimeFrameInStr,
              tCOutStr: this.entity.mediaMaterialTimeFrameOutStr,
              quality: { observations: 'Enter observations here.' }
            };
            this.rejectionService.updateTCLen(rejAux, this.entity.standard.frames);

            this.entity.items.push(rejAux);
          }
        }, {
          key: 'deleteEntry',
          value: function deleteEntry(entry) {
            var index = this.entity.items.indexOf(entry);
            this.deleteRejection(index);
          }
        }, {
          key: 'deleteRejection',
          value: function deleteRejection(index) {
            this.entity.items.splice(index, 1);
          }
        }, {
          key: '_onRejectionEdit',
          value: function _onRejectionEdit() {
            this.rejectionsEdit.value = !this.rejectionsEdit.value;
            this.rejectionsEditShow.value = !this.rejectionsEditShow.value;
          }
        }, {
          key: 'isValid',
          value: function isValid() {
            // TODO: hacer mas elegante
            if (!angular.isDefined(this.entity.items)) {
              return true;
            }

            var isValidFormat = this.rejectionService.areFormatValid(this.entity.items);
            var isFramesValid = this.rejectionService.areFramesValid(this.entity.items, this.entity.standard.frames);
            var areInsideMaterial = this.rejectionService.areInsideMaterial(this.entity.items, this.entity.mediaMaterialTimeFrameInStr, this.entity.mediaMaterialTimeFrameOutStr);

            return isValidFormat && isFramesValid && areInsideMaterial;
          }
        }, {
          key: 'validateAndSave',
          value: function validateAndSave(form) {
            form.$valid = this.isValid();
            this.isLoading = true;
            this.rejectionTransformerService.rejectionsToObject(this.entity.items);

            delete this.entity.mediaMaterialTimeFrameInStr;
            delete this.entity.mediaMaterialTimeFrameOutStr;
            delete this.entity.virtualSegment;
          }
        }, {
          key: 'getTechnicalQualities',
          value: function getTechnicalQualities(rejection) {
            this.getQualities(rejection);
          }
        }, {
          key: 'changeTechnicalQualities',
          value: function changeTechnicalQualities(rejection) {
            this.getQualities(rejection);
            rejection.quality.severity = undefined;
            rejection.quality.id = undefined;
            rejection.severity = undefined;
            rejection.comments = undefined;
          }
        }, {
          key: 'getQualities',
          value: function getQualities(rejection) {
            var _this2 = this;

            var response = undefined;
            if (rejection.quality.type !== undefined) {

              response = this.api.technicalQualities.get({ 'typeId': rejection.quality.type.id });
              response.$promise.then(function (response) {
                rejection.qualities = response.content;
              }, function (error) {
                _this2.isLoading = false;
              });
            }
          }
        }, {
          key: 'findSeverityComments',
          value: function findSeverityComments(rejection) {
            if (!rejection.qualities) {
              return false;
            }
            rejection.quality = angular.copy(rejection.qualities.find(function (it) {
              return it.id == rejection.quality.id;
            }));
            rejection.comments = rejection.quality.observations;
            rejection.severity = rejection.quality.severity;
          }
        }, {
          key: '_execute',
          value: function _execute() {
            var self = this;
            self.isLoading = true;
            this.get().$promise.then(function (response) {

              self.rejectionTransformerService.rejectionsToString(response.items);
              self.entity.mediaMaterialTimeFrameInStr = self.rejectionTransformerService.timeBaseTransformerService._toString(response.mediaMaterialTimeFrameIn);
              self.entity.mediaMaterialTimeFrameOutStr = self.rejectionTransformerService.timeBaseTransformerService._toString(response.mediaMaterialTimeFrameOut);
              self.audit = {
                enabled: response && response.audit,
                entity: { audit: response.audit }
              };
              //this.autoEdit();
            });
          }
        }, {
          key: '_onTabLoad',
          value: function _onTabLoad() {

            this.entityAux = this.newMediaService.getModel();
            this.params.id = this.newMediaService.getFromModel('media').id; //FIB1-TX-1324560-148068-21

            this.entity = {
              standard: {
                frames: this.newMediaService.getFromModel('standard').frames
              }
            };

            this.entity.mediaMaterialTimeFrameIn = this.newMediaService.getFromModel('timeCodeIn');
            this.entity.mediaMaterialTimeFrameOut = this.newMediaService.getFromModel('timeCodeOut');

            this.rejectionTypes = this.api.rejectionTypes.get();

            if (this.params.id) {
              this._execute();
            }
          }
        }, {
          key: 'saveAndNextStep',
          value: function saveAndNextStep(form) {
            this.validateAndSave(form);
            this.deleteQualities();
            babelHelpers.get(Object.getPrototypeOf(NewMediaRejectionCtrl.prototype), 'saveAndNextStep', this).call(this, form);
            this.remakeQualities();
          }
        }, {
          key: 'saveAndExit',
          value: function saveAndExit(form) {
            this.validateAndSave(form);
            this.deleteQualities();
            babelHelpers.get(Object.getPrototypeOf(NewMediaRejectionCtrl.prototype), 'saveAndExit', this).call(this, form);
            this.remakeQualities();
          }
        }, {
          key: 'deleteQualities',
          value: function deleteQualities() {
            this.entity.items.forEach(function (it) {
              delete it.qualities;
            });
          }
        }, {
          key: 'remakeQualities',
          value: function remakeQualities() {
            var _this3 = this;

            this.entity.items.forEach(function (rej) {
              if (rej.quality.type) {
                _this3.getQualities(rej);
              }
            });
          }
        }]);
        return NewMediaRejectionCtrl;
      })(WizardTab);

      _export('default', NewMediaRejectionCtrl);
    }
  };
});
//# sourceMappingURL=med.new.media.rejection.ctrl.js.map
