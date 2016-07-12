System.register('app/home/scripts/controllers/med.new.media.ctrl', ['../med.wizard.tab.js'], function (_export) {
  'use strict';
  var WizardTab, NewMediaCtrl;
  return {
    setters: [function (_medWizardTabJs) {
      WizardTab = _medWizardTabJs['default'];
    }],
    execute: function () {
      NewMediaCtrl = (function (_WizardTab) {
        NewMediaCtrl.$inject = ["$injector", "$state", "$location"];
        babelHelpers.inherits(NewMediaCtrl, _WizardTab);

        /*@ngInject*/

        function NewMediaCtrl($injector, $state, $location) {
          babelHelpers.classCallCheck(this, NewMediaCtrl);

          babelHelpers.get(Object.getPrototypeOf(NewMediaCtrl.prototype), 'constructor', this).call(this, {
            injector: $injector,
            endpoint: 'medias',
            key: 'currentId',
            backToState: 'newMedia.summary',
            successTitle: 'media.edit.alert.success.title',
            successMessage: 'media.edit.alert.success.message',
            successCreateMessage: 'media.edit.alert.create.success.message',
            successEditMessage: 'media.edit.alert.success.message',
            errorTitle: 'media.edit.alert.error',
            executeGet: false,
            params: $state.params,
            entityDependencies: [{ api: 'status', loading: 'isLoading', model: 'statusList' }, { api: 'transmission', loading: 'isLoading', model: 'transmissions' }]
          });
          this.state = $state;
          var mediaId = this.state.params.currentId;
          if (mediaId) {
            this.setMediaId(mediaId);
            this.get();
            this.setToServiceModel('materialByMedia', { 'media': this.getMediaId() });
          }
          // this.newMediaService.invalidMedia = false;
          // this.newMediaService.invalidMaterial = false;
          // this.newMediaService.invalidPlusDetail = false;
          // this.newMediaService.invalidSegment = false;
          // this.newMediaService.mediaId="FIB1-TX-1324560-148068-21"
        }

        babelHelpers.createClass(NewMediaCtrl, [{
          key: 'nextStep',
          value: function nextStep() {
            var _this = this;

            this.api['medias'].get({ 'currentId': this.getMediaId() }).$promise.then(function (response) {
              _this.setToServiceModel('media', response);
            });
            this.setToServiceModel('materialByMedia', { 'media': this.getMediaId() });
            this.newMediaService.invalidMedia = false;
            babelHelpers.get(Object.getPrototypeOf(NewMediaCtrl.prototype), 'nextStep', this).call(this);
          }
        }, {
          key: 'saveAndNextStep',
          value: function saveAndNextStep(form) {
            if (this._isNew()) {
              babelHelpers.get(Object.getPrototypeOf(NewMediaCtrl.prototype), 'saveAndNextStep', this).call(this, form);
            } else {
              this.nextStep();
            }
          }
        }, {
          key: '_getPathParams',
          value: function _getPathParams() {
            var pathParams = this.params;
            angular.extend(pathParams, this._addParams());
            return pathParams;
          }
        }, {
          key: 'validType',
          value: function validType(that) {
            if (!this) {
              that.entity.type = undefined;
              return false;
            }
            if (!this.itemSelected) {
              that.entity.type = undefined;
              return false;
            }
            if (!this.itemSelected.id) {
              that.entity.type = undefined;
              return false;
            }
            var self = this;
            var mediaType = this.elements.content.find(function (it) {
              return it.id === self.itemSelected.id;
            });
            that.entity.transmitionEnabled = mediaType.mandatoryTranssimisionEnable;
            that.entity.type = self.itemSelected.id;
          }
        }, {
          key: 'bindFormat',
          value: function bindFormat(that) {
            if (!this) {
              that.entity.format = undefined;
              return false;
            }
            if (!this.itemSelected.id) {
              that.entity.format = undefined;
              return false;
            }
            that.entity.format = this.itemSelected.id;
          }
        }, {
          key: 'formIsEmpty',
          value: function formIsEmpty(form) {
            if (!this.entity) {
              return true;
            }
            if (!this.entity.format || !this.entity.type || !this.typeInput || !this.formatInput) {
              return true;
            }
          }
        }, {
          key: 'expression',
          value: function expression(item) {
            return item.id + ' - ' + item.description;
          }
        }, {
          key: 'condition',
          value: function condition(item, query) {
            return item.id.indexOf(query.toUpperCase()) > -1 || item.description.indexOf(query.toUpperCase()) > -1;
          }
        }]);
        return NewMediaCtrl;
      })(WizardTab);

      _export('default', NewMediaCtrl);
    }
  };
});
//# sourceMappingURL=med.new.media.ctrl.js.map
