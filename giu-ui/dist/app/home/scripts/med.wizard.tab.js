System.register('app/home/scripts/med.wizard.tab', ['module-crud-ui/app/scripts/crud.saveable.js'], function (_export) {
  /**
   * Created by luke on 06/04/16.
    getAspectRatios() {
      let response = this.api['aspectsRatio'].get({'id': this.getMediaId().concat('-').concat(this.entity.material.number).concat('-').concat(this.entity.material.chapterNumber)});
  
      return response;
    }
  
   */
  'use strict';
  var Saveable, WizardTab;
  return {
    setters: [function (_moduleCrudUiAppScriptsCrudSaveableJs) {
      Saveable = _moduleCrudUiAppScriptsCrudSaveableJs['default'];
    }],
    execute: function () {
      WizardTab = (function (_Saveable) {
        WizardTab.$inject = ["config"];
        babelHelpers.inherits(WizardTab, _Saveable);

        /*@ngInject*/

        function WizardTab(config) {
          babelHelpers.classCallCheck(this, WizardTab);

          babelHelpers.get(Object.getPrototypeOf(WizardTab.prototype), 'constructor', this).call(this, config);
        }

        /**
         * Se agregan los injector propios de esta clase. Lo llama CrudAble
         *
         * @private
         */
        babelHelpers.createClass(WizardTab, [{
          key: '_addInjector',
          value: function _addInjector() {

            this.$state = this.$injector.get('$state');
            this.translate = this.$injector.get('$filter')('translate');
            this.alertService = this.$injector.get('alertService');
            this.newMediaService = this.$injector.get('newMediaService');

            this.newMediaService.tabsCtrl.push(this);
          }
        }, {
          key: '_onTabLoad',
          value: function _onTabLoad() {}
        }, {
          key: 'nextStep',
          value: function nextStep() {
            this.newMediaService.nextStep();
          }
        }, {
          key: 'saveAndNextStep',
          value: function saveAndNextStep(form) {
            if (form.$pristine) {
              this.nextStep();
            } else {
              return this.save(form, true);
            }
          }
        }, {
          key: 'saveAndNextStepWithCallback',
          value: function saveAndNextStepWithCallback(form, fn) {
            if (form.$pristine) {
              this.nextStep();
            } else {
              this.save(form, true).then(fn);
            }
          }
        }, {
          key: 'saveAndExit',
          value: function saveAndExit(form) {
            if (form.$pristine) {
              this.$state.go(this.backToState.state, { 'id': this.getMediaId() }, { reload: true });
              this.cleanService();
            } else {
              this.save(form, false);
            }
          }
        }, {
          key: 'save',
          value: function save(form, nextStep) {
            var _this = this;

            //Si tiene error no hace el submit
            if (form.$valid) {
              var promise = undefined;

              if (this._isNew() || this._isNotMediaMaterial()) {
                //POST
                delete this.state.params.id;
                promise = this.api[this.endpoint].save(this.$state.params, this.entity).$promise;
              } else {
                //PUT
                promise = this.api[this.endpoint].update(this._getPathParams(), this.entity).$promise;
              }

              promise.then(function (response) {
                _this.$log.info('then', response);

                if (_this._isNotMediaMaterial()) {
                  var lastIndex = response.url.lastIndexOf('/');
                  _this.newMediaService.mediaId = response.url.substring(lastIndex + 1);
                }

                _this.$log.info('back to state', _this.backToState.state, _this.backToState.params);

                _this.alertService.success({
                  title: _this.translate(_this.successTitle),
                  message: _this._isNew() ? _this.translate(_this.successCreateMessage) : _this.translate(_this.successEditMessage)
                });
                form.$setPristine();
                if (nextStep) {
                  _this.nextStep();
                } else {
                  _this.$state.go(_this.backToState.state, { 'id': _this.getMediaId() }, { reload: true });
                  _this.cleanService();
                }
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

              return promise;
            } else {

              this.$log.info('form invalid');

              return undefined;
            }
          }
        }, {
          key: 'goToBackState',
          value: function goToBackState() {
            this.newMediaService.goToBackState();
          }
        }, {
          key: '_isNew',
          value: function _isNew() {
            return !this.newMediaService.mediaId;
          }
        }, {
          key: '_getPathParams',
          value: function _getPathParams() {
            return this.newMediaService.mediaId ? { 'id': this.newMediaService.mediaId } : undefined;
          }
        }, {
          key: 'getMediaId',
          value: function getMediaId() {
            return this.newMediaService.mediaId;
          }
        }, {
          key: '_isNotMediaMaterial',
          value: function _isNotMediaMaterial() {
            if (this.newMediaService.mediaId == undefined) {
              return true;
            }
            return (this.newMediaService.mediaId.match(/-/g) || []).length != 4;
          }
        }, {
          key: 'getServiceModel',
          value: function getServiceModel() {
            return this.newMediaService.model;
          }
        }, {
          key: 'existsKey',
          value: function existsKey(key) {
            return this.newMediaService.getFromModel(key) != undefined;
          }
        }, {
          key: 'getFromModel',
          value: function getFromModel(key) {
            return this.newMediaService.getFromModel(key);
          }
        }, {
          key: 'setToServiceModel',
          value: function setToServiceModel(key, value) {
            this.newMediaService.setToModel(key, value);
          }
        }, {
          key: 'setMediaId',
          value: function setMediaId(value) {
            this.newMediaService.mediaId = value;
          }
        }, {
          key: 'getMediaId',
          value: function getMediaId() {
            var ids = this.newMediaService.mediaId.split('-');
            return ids[0].concat('-').concat(ids[1]).concat('-').concat(ids[2]);
          }
        }, {
          key: 'cleanService',
          value: function cleanService() {
            this.newMediaService.mediaId = undefined;
            this.newMediaService.model = {};
            this.newMediaService.invalidMaterial = true;
            this.newMediaService.invalidPlusDetail = true;
            this.newMediaService.invalidSegment = true;
          }
        }]);
        return WizardTab;
      })(Saveable);

      _export('default', WizardTab);
    }
  };
});
//# sourceMappingURL=med.wizard.tab.js.map
