System.register('app/home/scripts/controllers/med.search.results.detail.media.ctrl', ['module-crud-ui/app/scripts/crud.saveable.js'], function (_export) {
  /**
   * Created by julian on 25/02/16.
   */
  'use strict';
  var Saveable, SearchResultsDetailMediaCtrl;
  return {
    setters: [function (_moduleCrudUiAppScriptsCrudSaveableJs) {
      Saveable = _moduleCrudUiAppScriptsCrudSaveableJs['default'];
    }],
    execute: function () {
      SearchResultsDetailMediaCtrl = (function (_Saveable) {
        SearchResultsDetailMediaCtrl.$inject = ["$injector", "$state", "translateService", "alertService", "$mdDialog"];
        babelHelpers.inherits(SearchResultsDetailMediaCtrl, _Saveable);

        /*@ngInject*/

        function SearchResultsDetailMediaCtrl($injector, $state, translateService, alertService, $mdDialog) {
          babelHelpers.classCallCheck(this, SearchResultsDetailMediaCtrl);

          babelHelpers.get(Object.getPrototypeOf(SearchResultsDetailMediaCtrl.prototype), 'constructor', this).call(this, {
            injector: $injector,
            endpoint: 'medias',
            key: 'currentId',
            backToState: '.',
            successTitle: 'media.edit.alert.success.title',
            successMessage: 'media.edit.alert.success.message',
            successCreateMessage: 'media.edit.alert.create.success.message',
            successEditMessage: 'media.edit.alert.success.message',
            errorTitle: 'media.edit.alert.error',
            executeGet: false,
            entityDependenciesExecuteGet: false,
            entityDependencies: [{ api: 'networkResource', loading: 'isLoading', model: 'networkData' }, { api: 'mediaTypeResource', loading: 'isLoading', model: 'types' }]
          });
          this.collapsableId = 'searchResultsDetailMediaCtrl';
          this.state = $state;
          this.translateService = translateService;
          this.mdDialog = $mdDialog;
          this.alertService = alertService;
          this._load();
        }

        babelHelpers.createClass(SearchResultsDetailMediaCtrl, [{
          key: 'getFormats',
          value: function getFormats() {
            var _this = this;

            this.response = this.api['mediaFormatResource'].get({ 'virtualSegmented': false });
            this.response.isLoading = true;
            var objectData = this.response;

            this.response.$promise.then(function (response) {

              objectData.isLoading = false;
              objectData.valid = true;
              _this.formats = response.content;
              _this.getFormatsForLFID();
            }, function (error) {
              // Si nos devuelve un 404, no queremos que se muestre el recurso, pero tampoco que nos tire error
              if (error.status == 404) {
                objectData.valid = false;
                objectData.isLoading = false;
              }
            });
            return this.response;
          }
        }, {
          key: 'getFormatsForLFID',
          value: function getFormatsForLFID() {
            var _this2 = this;

            var self = this;
            this.response = this.api['mediaFormatResource'].get({ 'virtualSegmented': true });
            this.response.isLoading = true;
            var objectData = this.response;

            this.response.$promise.then(function (response) {

              objectData.isLoading = false;
              objectData.valid = true;
              _this2.formatsLfId = response.content;

              var originFormat = self.formatsLfId.concat(self.formats).find(function (format) {
                return format.id == self.entity.format;
              });

              _this2.formatsLfId = self.formatsLfId.filter(function (format) {
                return format.definition == originFormat.definition;
              });
            }, function (error) {
              // Si nos devuelve un 404, no queremos que se muestre el recurso, pero tampoco que nos tire error
              if (error.status == 404) {
                objectData.valid = false;
                objectData.isLoading = false;
              }
            });
            return this.response;
          }
        }, {
          key: 'getMediaMaterial',
          value: function getMediaMaterial() {
            var _this3 = this;

            this.response = this.api['mediaMaterials'].get({ 'id': this.state.params.id });
            this.response.isLoading = true;
            var objectData = this.response;

            this.response.$promise.then(function (response) {

              objectData.isLoading = false;
              objectData.valid = true;
              _this3.mediaMaterial = response;
              _this3.cloneMediaFlag.value = _this3.entity.status.type == 'V' && _this3.mediaMaterial.isEnable;
            }, function (error) {
              // Si nos devuelve un 404, no queremos que se muestre el recurso, pero tampoco que nos tire error
              if (error.status == 404) {
                objectData.valid = false;
                objectData.isLoading = false;
              }
            });
            return this.response;
          }
        }, {
          key: '_load',
          value: function _load() {
            var _this4 = this;

            this.materilId = true;
            if (!this.state.params.id) {
              this.materilId = false;
            }
            if (!this.state.params.currentId) {
              return;
            }
            this.isNotVirtualSegment = { value: false };
            this.mediaEditShow = { value: true };
            this.cloneMediaFlag = { value: false };
            this.mediaDisabled = { value: false };
            this.actions = [{
              roles: 'MMMU',
              tooltip: this.translateService.translate('tooltip.edit'),
              icon: 'edit',
              action: function action() {
                _this4.mediaEdit = !_this4.mediaEdit;
                _this4.mediaEditShow.value = !_this4.mediaEditShow.value;
                _this4.isNotVirtualSegment.value = !_this4.isNotVirtualSegment.value;
                _this4.cloneMediaFlag.value = !_this4.cloneMediaFlag.value;
                _this4.oldValue = _this4.copyList(_this4.entity);
                _this4._load();
              },
              show: this.isNotVirtualSegment
            }, {
              //roles:'MMMU',
              enabled: true,
              tooltip: this.translateService.translate('tooltip.create'),
              action: function action() {
                _this4.state.go('newMedia');
              },
              icon: 'plus',
              show: this.mediaDisabled
            }];
            this.contextMenu = [{
              roles: 'MMMC',
              label: this.translateService.translate('med.clone'),
              action: function action() {
                _this4.openCopyMenu();
              },
              show: this.cloneMediaFlag
            }, {
              roles: 'MMMC',
              label: this.translateService.translate('med.copy.lfid'),
              action: function action() {
                _this4.openCopyLfidMenu();
              },
              show: this.cloneMediaFlag
            }];
            var response = this._getEntity();
            this._getEntityDependencies();
            response.$promise.then(function () {
              _this4.getMediaMaterial();_this4.getFormats();
            });
          }
        }, {
          key: '_getEntity',
          value: function _getEntity() {
            var _this5 = this;

            this.isLoading = true;
            this.response = this.get();
            this.response.$promise.then(function (response) {
              _this5.isNotVirtualSegment.value = !response.isVirtualSegment && response.status.type == 'V';
              _this5.mediaDisabled.value = _this5.entity.status.type == 'V';
              _this5.audit = {
                enabled: true,
                isRemote: true,
                endpoint: 'medias',
                params: { currentId: _this5.state.params.currentId }
              };

              _this5.isLoading = false;
            }, function () {
              _this5.isLoading = false;
            });
            return this.response;
          }
        }, {
          key: '_getEntityDependencies',
          value: function _getEntityDependencies() {
            var _this6 = this;

            this.entityDependencies.forEach(function (it) {
              _this6.api[it.api].get(it.params).$promise.then(function (response) {
                _this6[it.model] = response.content;
              });
            });
          }
        }, {
          key: 'initCreate',
          value: function initCreate() {
            this.entity.media = { network: {}, state: {} };
          }
        }, {
          key: '_initEdit',
          value: function _initEdit() {
            this.initStatusValue = this.entity.status.type;
          }
        }, {
          key: 'save',
          value: function save(form) {
            var _this7 = this;

            if (this.initStatusValue === 'V' && this.entity.status.type !== 'V' && this.entity.programated === 'S') {

              this.alertService.warning({
                title: this.translateService.translate('search.form.media.warning.title'),
                message: this.translateService.translate('search.form.media.warning.description')
              }, function () {
                return _this7._saveAction(form);
              });
            } else {
              this._saveAction(form);
            }
          }
        }, {
          key: '_saveAction',
          value: function _saveAction(form) {
            var _this8 = this;

            babelHelpers.get(Object.getPrototypeOf(SearchResultsDetailMediaCtrl.prototype), 'save', this).call(this, form).then(function () {
              _this8.get().$promise.then(function () {
                if (_this8.entity.status.type == 'A') {
                  _this8.state.go(_this8.state.current, {}, { reload: true });
                }
                _this8.mediaEdit = false;
                _this8.isNotVirtualSegment.value = true;
                _this8._load();
              });
            });
          }
        }, {
          key: '_isNew',
          value: function _isNew() {
            var id = this.$state.params[this.key];
            return !id;
          }
        }, {
          key: 'cloneMedia',
          value: function cloneMedia() {
            this.clone('cloneMedia');
          }
        }, {
          key: 'cloneMediaLfid',
          value: function cloneMediaLfid() {
            this.clone('cloneMediaLfid');
          }
        }, {
          key: 'clone',
          value: function clone(endpoint) {
            var _this9 = this;

            this.isLoading = true;
            var promise = this.api[endpoint].save({ 'mediaId': this.state.params.currentId }, this.copy).$promise;
            promise.then(function (response) {
              _this9.alertService.success({
                title: _this9.translate(_this9.successTitle),
                message: _this9.translate(_this9.successCreateMessage)
              });
              var lastIndex = response.url.lastIndexOf('/');
              var mediaId = response.url.substring(lastIndex + 1);
              var id = mediaId.split('-');

              var parentParams = {
                mediaFormat: id[0],
                mediaType: id[1],
                mediaId: id[2]
              };
              _this9.state.go('searchResults', parentParams);
              _this9.mdDialog.hide();
              _this9.isLoading = false;
            }, function (err) {
              _this9.alertService.error({
                title: _this9.translate(_this9.errorTitle),
                message: err.data.message
              });
              _this9.isLoading = false;
            });
          }
        }, {
          key: 'closeModal',
          value: function closeModal() {
            this.mdDialog.hide();
            this.cloneMediaFlag.value = true;
            this.copy = {};
          }
        }, {
          key: 'updateAspectRatioList',
          value: function updateAspectRatioList() {
            if (this.copy.media.type && this.copy.media.format) {
              this.getAspectRatios(this.copy.media.format.concat('-').concat(this.copy.media.type).concat('-').concat(1));
            }
          }
        }, {
          key: 'getAspectRatios',
          value: function getAspectRatios(media) {
            var _this10 = this;

            this.response = this.api['aspectsRatioMedias'].get({ 'id': media });
            this.response.isLoading = true;
            var objectData = this.response;

            this.response.$promise.then(function (response) {

              objectData.isLoading = false;
              objectData.valid = true;
              _this10.aspectRatios = response.content;
            }, function (error) {
              // Si nos devuelve un 404, no queremos que se muestre el recurso, pero tampoco que nos tire error
              if (error.status == 404) {
                objectData.valid = false;
                objectData.isLoading = false;
              }
            });
            return this.response;
          }
        }, {
          key: 'openCopyMenu',
          value: function openCopyMenu(ev) {
            var templateUrl = 'home/views/med.search.results.detail.media.dialog.clone.media.html';
            this.openCopy(ev, templateUrl);
          }
        }, {
          key: 'openCopyLfidMenu',
          value: function openCopyLfidMenu(ev) {
            var templateUrl = 'home/views/med.search.results.detail.media.dialog.clone.lfid.media.html';
            this.openCopy(ev, templateUrl);
          }
        }, {
          key: 'isNetworkEditable',
          value: function isNetworkEditable() {
            return this.entity.network && !this.entity.network.id && this.entity.network.feed && this.entity.network.feed.id;
          }
        }, {
          key: 'openCopy',
          value: function openCopy(ev, templateUrl) {
            var _this11 = this;

            if (this.entity.status.type == 'V') {
              (function () {
                _this11.cloneMediaFlag.value = false;
                var self = _this11;
                _this11.mdDialog.show({
                  controller: function controller($scope, $mdDialog) {
                    $scope.vm = self;
                  },
                  templateUrl: templateUrl,
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: false
                });
              })();
            }
          }
        }, {
          key: 'inspectAspectRatio',
          value: function inspectAspectRatio() {
            if (this.copy && this.copy.aspectRatio && this.copy.aspectRatio.id == 'undefined') {
              delete this.copy.aspectRatio.id;
            }
          }
        }, {
          key: 'shouldSelectAspectRatio',
          value: function shouldSelectAspectRatio() {
            return !this.mediaMaterial.aspectRatio && this.isAspectRatioRequired() || this.isNewFormat();
          }
        }, {
          key: 'shouldSelectAspectRatioForLFID',
          value: function shouldSelectAspectRatioForLFID() {
            return !this.mediaMaterial.aspectRatio && this.isAspectRatioRequired() || this.isNewFormatLFID();
          }
        }, {
          key: 'isInvalidCopy',
          value: function isInvalidCopy() {
            return !this.copy || !this.copy.media;
          }
        }, {
          key: 'getFormat',
          value: function getFormat(format) {
            var elem = this.formats.find(function (it) {
              return it.id === format;
            });

            if (!elem) {
              return this.formatsLfId.find(function (it) {
                return it.id === format;
              });
            }
            return elem;
          }
        }, {
          key: 'isNewFormatLFID',
          value: function isNewFormatLFID() {
            if (this.isInvalidCopy()) {
              return false;
            }
            var currentFormat = this.getFormat(this.entity.format);
            var newFormat = this.getFormat(this.copy.media.format);
            return currentFormat.definition !== newFormat.definition;
          }
        }, {
          key: 'isNewFormat',
          value: function isNewFormat() {
            if (this.isInvalidCopy()) {
              return false;
            }
            var currentFormat = this.getFormat(this.entity.format);
            var newFormat = this.getFormat(this.copy.media.format);
            return currentFormat.definition !== newFormat.definition;
          }
        }, {
          key: 'isAspectRatioRequired',
          value: function isAspectRatioRequired() {
            var _this12 = this;

            if (!this.copy || !this.copy.media) {
              return false;
            }
            return this.types.find(function (it) {
              return it.id == _this12.copy.media.type && it.mandatoryAspectRatio;
            });
          }
        }, {
          key: 'copyList',
          value: function copyList(value) {
            return angular.copy(value);
          }
        }, {
          key: 'cancelMedia',
          value: function cancelMedia() {
            this.mediaEdit = !this.mediaEdit;
            this.isNotVirtualSegment.value = true;
            this.cloneMediaFlag.value = false;
            this.entity = this.oldValue;
            this._load();
          }
        }]);
        return SearchResultsDetailMediaCtrl;
      })(Saveable);

      _export('default', SearchResultsDetailMediaCtrl);
    }
  };
});
//# sourceMappingURL=med.search.results.detail.media.ctrl.js.map
