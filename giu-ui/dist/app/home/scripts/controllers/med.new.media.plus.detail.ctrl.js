System.register('app/home/scripts/controllers/med.new.media.plus.detail.ctrl', ['../med.wizard.tab.js'], function (_export) {
  'use strict';
  var WizardTab, NewMediaPlusDetailCtrl;
  return {
    setters: [function (_medWizardTabJs) {
      WizardTab = _medWizardTabJs['default'];
    }],
    execute: function () {
      NewMediaPlusDetailCtrl = (function (_WizardTab) {
        NewMediaPlusDetailCtrl.$inject = ["$injector", "$state"];
        babelHelpers.inherits(NewMediaPlusDetailCtrl, _WizardTab);

        /*@ngInject*/

        function NewMediaPlusDetailCtrl($injector, $state) {
          babelHelpers.classCallCheck(this, NewMediaPlusDetailCtrl);

          babelHelpers.get(Object.getPrototypeOf(NewMediaPlusDetailCtrl.prototype), 'constructor', this).call(this, {
            injector: $injector,
            endpoint: 'mediaMaterials',
            key: 'id',
            backToState: 'newMedia.summary',
            successTitle: 'media.edit.alert.success.title',
            successMessage: 'media.edit.alert.success.message',
            successCreateMessage: 'media.edit.alert.create.success.message',
            successEditMessage: 'media.edit.alert.success.message',
            errorTitle: 'media.edit.alert.error',
            executeGet: false,
            params: $state.params,
            entityDependencies: [{ api: 'photoTypes', loading: 'isLoadingPhotoTypes', model: 'photoTypes' }, { api: 'materialTypesResource', loading: 'isLoadingMaterialTypesResource', model: 'materialTypes' }, { api: 'mediaFormatResource', loading: 'isLoadingMediaFormatResource', model: 'mediaFormat' }, { api: 'videoStandards', loading: 'isLoadingStandard', model: 'standards' }, { api: 'editedby', loading: 'isLoadingEditedby', model: 'editedBy' }]
          });
          this.setOfTapes = {};
          this.setOfTapes.partNumber = 1;
          this.setOfTapes.partsTotal = 1;
          this.entity = { standard: { id: 'NTSC' } };
          //Todo: revisar esto this.warning = false;
          //Todo: revisar esto this.newMediaService.invalidPlusDetail = false;
        }

        babelHelpers.createClass(NewMediaPlusDetailCtrl, [{
          key: 'setStandardFrame',
          value: function setStandardFrame(item) {
            //Todo:No deberia usar el "console.log" console.log(item.code);
          }
        }, {
          key: 'isValidsetOfTapes',
          value: function isValidsetOfTapes() {
            return Number.parseInt(this.setOfTapes.partNumber) <= Number.parseInt(this.setOfTapes.partsTotal);
          }
        }, {
          key: 'isValidTapSet',
          value: function isValidTapSet() {
            if (this.setOfTapes.partsTotal < 2) {
              return true;
            }
            return typeof this.setOfTapes.currentTapeSet.id !== 'undefined';
          }
        }, {
          key: 'nextStep',
          value: function nextStep() {
            var _this = this;

            var id = this.entity.standard.id;
            var standard = this.standards.find(function (it) {
              return it.id === id;
            });
            this.newMediaService.setToModel('standard', standard);
            var promise = this.api.setOfTapesCurrent.update({ 'id': this.newMediaService.mediaId }, this.setOfTapes).$promise;
            promise.then(function (response) {
              _this.$log.info('then', response);

              _this.$log.info('back to state', _this.backToState.state, _this.backToState.params);

              _this.alertService.success({
                title: _this.translate(_this.successTitle),
                message: _this._isNew() ? _this.translate(_this.successCreateMessage) : _this.translate(_this.successEditMessage)
              });
              _this.newMediaService.invalidPlusDetail = false;
              _this.newMediaService.nextStep();
            }, function (err) {

              if (err.status === 422) {
                err.data.forEach(function (data) {
                  form[data.field].$error = { backendError: true };
                  form[data.field].backenMessage = data.message;
                });
              } else {
                _this.alertService.error({
                  title: _this.translate(_this.errorTitle),
                  message: err.data.message
                });
              }
            });
          }
        }, {
          key: 'updateTechnicalState',
          value: function updateTechnicalState() {

            var aspectRatioId = this.entity.aspectRatio.id;
            var aspectRatio = this.getFromModel('aspectRatios').find(function (aspectRatio) {
              return aspectRatio.id == aspectRatioId;
            });
            if (aspectRatio != undefined && aspectRatio.technicalState != null && aspectRatio.technicalState != undefined) {
              this.getFromModel("technicalState").id = aspectRatio.technicalState.id;
              this.entity.technicalState = { 'id': aspectRatio.technicalState.id };
              this.warning = true;
            } else {
              this.getFromModel("technicalState").id = this.getFromModel("defaultTechnicalStateId");
              delete this.entity.technicalState;
              this.warning = false;
            }
          }
        }, {
          key: 'saveAndNextStep',
          value: function saveAndNextStep(form) {
            if (this.entity.originMedia != undefined && this.entity.originMedia.selected != undefined) {
              delete this.entity.originMedia.selected;
            }
            if (this.entity.rootMedia != undefined && this.entity.rootMedia.selected != undefined) {
              delete this.entity.rootMedia.selected;
            }
            babelHelpers.get(Object.getPrototypeOf(NewMediaPlusDetailCtrl.prototype), 'saveAndNextStep', this).call(this, form);
          }
        }, {
          key: 'saveAndExit',
          value: function saveAndExit(form) {
            if (this.entity.originMedia != undefined && this.entity.originMedia.selected != undefined) {
              delete this.entity.originMedia.selected;
            }
            if (this.entity.rootMedia != undefined && this.entity.rootMedia.selected != undefined) {
              delete this.entity.rootMedia.selected;
            }
            babelHelpers.get(Object.getPrototypeOf(NewMediaPlusDetailCtrl.prototype), 'saveAndExit', this).call(this, form);
          }
        }]);
        return NewMediaPlusDetailCtrl;
      })(WizardTab);

      _export('default', NewMediaPlusDetailCtrl);
    }
  };
});
//# sourceMappingURL=med.new.media.plus.detail.ctrl.js.map
