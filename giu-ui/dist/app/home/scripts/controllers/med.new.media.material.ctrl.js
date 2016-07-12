System.register('app/home/scripts/controllers/med.new.media.material.ctrl', ['../med.wizard.tab.js'], function (_export) {
  'use strict';
  var WizardTab, NewMediaMaterialCtrl;
  return {
    setters: [function (_medWizardTabJs) {
      WizardTab = _medWizardTabJs['default'];
    }],
    execute: function () {
      NewMediaMaterialCtrl = (function (_WizardTab) {
        NewMediaMaterialCtrl.$inject = ["$injector", "$state", "$scope"];
        babelHelpers.inherits(NewMediaMaterialCtrl, _WizardTab);

        /*@ngInject*/

        function NewMediaMaterialCtrl($injector, $state, $scope) {
          var _this = this;

          babelHelpers.classCallCheck(this, NewMediaMaterialCtrl);

          babelHelpers.get(Object.getPrototypeOf(NewMediaMaterialCtrl.prototype), 'constructor', this).call(this, {
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
            entityDependencies: [{ api: 'technicalsState', loading: 'isLoadingTechnicalsState', model: 'etcs' }]
          });
          this.state = $state;
          this.scope = $scope;
          this.entity = {};
          this.entity.media = {};
          this.entity.material = {};
          this.entity.material.chapter = {};
          this.tabla = [{ label: 'Id', key: 'id' }, { label: 'Description', key: 'description' }];

          var self = this;
          this.scope.$watch(function () {
            return _this.entity.chapterList;
          }, function (newValue) {
            if (newValue) {
              self.chapterList = angular.copy(self.entity.chapterList);
              self.chapterList.sort(function (a, b) {
                return a.id - b.id;
              });
              self.entity.chapterList = undefined;
            }
          });
        }

        babelHelpers.createClass(NewMediaMaterialCtrl, [{
          key: 'materialsPermitedExceeded',
          value: function materialsPermitedExceeded() {
            if (this.getFromModel('media')) {
              return !(this.getFromModel('media').maximumMediaMaterials > this.getFromModel('media').materialsAccount);
            }
            return false;
          }
        }, {
          key: 'nextStep',
          value: function nextStep() {
            this.setResourceOnModel('aspectsRatio', 'aspectRatios', 'content');
            this.setResourceOnModel('setOfTapesCurrent', 'setOfTapes');
            this.setResourceOnModel('mediaSegments', 'mediaSegments');
            this.getMediaMaterialCreated();
            this.setToServiceModel("defaultTechnicalStateId", this.entity.technicalState.id);
            this.newMediaService.invalidMaterial = false;
            babelHelpers.get(Object.getPrototypeOf(NewMediaMaterialCtrl.prototype), 'nextStep', this).call(this);
          }
        }, {
          key: 'updateTechnicalState',
          value: function updateTechnicalState() {
            if (!this.existsKey("technicalState")) {
              this.setToServiceModel("technicalState", this.entity.technicalState);
            }
          }
        }, {
          key: 'setResourceOnModel',
          value: function setResourceOnModel(endpoint, keyForModel, attr) {
            var _this2 = this;

            this.api[endpoint].get({ 'id': this.newMediaService.mediaId }).$promise.then(function (response) {
              if (attr) {
                _this2.newMediaService.setToModel(keyForModel, response[attr]);
              } else {
                _this2.newMediaService.setToModel(keyForModel, response);
              }
            });
          }
        }, {
          key: 'getMediaMaterialCreated',
          value: function getMediaMaterialCreated() {
            var _this3 = this;

            this.api.mediaMaterials.get({ 'id': this.newMediaService.mediaId }).$promise.then(function (response) {
              _this3.newMediaService.setToModel("mediaMaterials", response);
              _this3.entity.cid = response.cid;
              var materialByMedia = _this3.getFromModel('materialByMedia');
              materialByMedia.material = _this3.entity;
            });
          }
        }, {
          key: 'saveAndExit',
          value: function saveAndExit(form) {
            this.entity.media.id = this.getMediaId();
            if (this.materialsPermitedExceeded()) {
              this.$state.go(this.backToState.state, { 'id': this.getMediaId() }, { reload: true });
            } else {
              babelHelpers.get(Object.getPrototypeOf(NewMediaMaterialCtrl.prototype), 'saveAndExit', this).call(this, form);
            }
          }
        }, {
          key: 'saveAndNextStep',
          value: function saveAndNextStep(form) {
            this.entity.media.id = this.getMediaId();
            babelHelpers.get(Object.getPrototypeOf(NewMediaMaterialCtrl.prototype), 'saveAndNextStep', this).call(this, form);
          }
        }, {
          key: 'callbackfunction',
          value: function callbackfunction(model) {
            var _this4 = this;

            model.entity.material.title = this.target.title;
            model.entity.material.chapter = {};
            model.entity.material.chapter.title = this.target.chapterTitle;
            model.entity.material.chapter.episode = { 'id': this.target.episodeId };
            model.entity.material.id = this.target.id;
            model.entity.material.chapter.id = parseInt(this.target.chapterId);

            if (model.entity.material != undefined && model.entity.material.id != undefined) {
              (function () {
                var params = { 'materialId': model.entity.material.id,
                  'mediaId': model.newMediaService.mediaId };
                var response = _this4.api.chapters.get(params);
                response.isLoading = true;

                response.$promise.then(function (response) {
                  model.entity.chapterList = response.content;
                }, function (error) {
                  response.isLoading = false;
                });
              })();
            }
          }
        }, {
          key: 'changefunction',
          value: function changefunction(model) {
            var _this5 = this;

            model.entity.material.title = undefined;
            model.entity.material.chapter = {};
            model.entity.material.chapter.episode = {};
            model.entity.material.id = this.target.id;
            var params = { 'materialId': model.entity.material.id,
              'mediaId': model.newMediaService.mediaId };
            if (model.entity.material.id !== undefined) {
              (function () {
                var response = _this5.api.chapters.get(params);
                var responseMaterialDetail = _this5.api.materials.get(params);

                response.isLoading = true;
                responseMaterialDetail.$promise.then(function (response) {
                  model.entity.material.title = response.title;
                });
                response.$promise.then(function (response) {
                  model.entity.chapterList = response.content;
                }, function (error) {
                  response.isLoading = false;
                });
              })();
            }
          }
        }, {
          key: 'updateMaterialForm',
          value: function updateMaterialForm() {
            var chapterNumber = parseInt(this.entity.material.chapter.id);
            var selectedChapter = this.chapterList.find(function (item) {
              return item.id === chapterNumber;
            });
            if (selectedChapter != undefined) {
              this.entity.material.chapter = {};
              this.entity.material.chapter.title = selectedChapter.title;
              this.entity.material.chapter.episode = { 'id': selectedChapter.episode.id };
              this.entity.material.chapter.id = parseInt(selectedChapter.id);
              if (selectedChapter.hasRelatedMedias) {
                swal({
                  title: this.translate('new.media.material.hasRelatedMedias.title'),
                  text: this.translate('new.media.material.hasRelatedMedias.message'),
                  showCancelButton: false,
                  confirmButtonText: 'Ok',
                  type: 'warning',
                  closeOnConfirm: true,
                  showLoaderOnConfirm: true
                });
              }
            }
          }
        }]);
        return NewMediaMaterialCtrl;
      })(WizardTab);

      _export('default', NewMediaMaterialCtrl);
    }
  };
});
//# sourceMappingURL=med.new.media.material.ctrl.js.map
