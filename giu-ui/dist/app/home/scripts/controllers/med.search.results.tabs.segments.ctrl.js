System.register('app/home/scripts/controllers/med.search.results.tabs.segments.ctrl', ['module-crud-ui/app/scripts/crud.saveable.js', './med.segments.base.ctrl.js'], function (_export) {

  /* global console */

  'use strict';var Saveable, SegmentsBase, SearchResultsTabsSegmentsCtrl;
  return {
    setters: [function (_moduleCrudUiAppScriptsCrudSaveableJs) {
      Saveable = _moduleCrudUiAppScriptsCrudSaveableJs['default'];
    }, function (_medSegmentsBaseCtrlJs) {
      SegmentsBase = _medSegmentsBaseCtrlJs['default'];
    }],
    execute: function () {
      SearchResultsTabsSegmentsCtrl = (function (_Saveable) {
        SearchResultsTabsSegmentsCtrl.$inject = ["$injector", "segmentService", "squeezeService", "segmentTransformerService", "translateService", "$state", "$mdDialog", "alertService", "$scope"];
        babelHelpers.inherits(SearchResultsTabsSegmentsCtrl, _Saveable);

        /*@ngInject*/

        function SearchResultsTabsSegmentsCtrl($injector, segmentService, squeezeService, segmentTransformerService, translateService, $state, $mdDialog, alertService, $scope) {
          var _this = this;

          babelHelpers.classCallCheck(this, SearchResultsTabsSegmentsCtrl);

          //noinspection JSAnnotator
          babelHelpers.get(Object.getPrototypeOf(SearchResultsTabsSegmentsCtrl.prototype), 'constructor', this).call(this, {
            injector: $injector,
            endpoint: 'mediaSegments',
            backToState: ".",
            key: 'id',
            successTitle: 'media.edit.alert.success.title',
            successMessage: 'media.edit.alert.success.message',
            successCreateMessage: 'media.edit.alert.create.success.message',
            successEditMessage: 'common.alert.edit.success.title',
            errorTitle: 'media.edit.alert.error',
            executeGet: false,
            entityDependenciesExecuteGet: false,
            entityDependencies: [{ api: 'mediaSqueezeCreditsTypes', loading: 'isLoading', model: 'squeezeCreditTypes' }, { api: 'networkResource', loading: 'isLoading', model: 'networkData' }, { api: 'mediaTypeResource', loading: 'isLoading', model: 'types' }]
          });
          this.segmentsBase = new SegmentsBase(segmentService, squeezeService, segmentTransformerService, translateService, $state, $mdDialog, alertService, $scope);

          this.$state = $state;
          this.mdDialog = $mdDialog;
          this.alertService = alertService;
          this.segmentTransformerService = segmentTransformerService;
          this.translateService = translateService;
          this.segmentService = segmentService;
          this.squeezeService = squeezeService;

          if (!this.$state.params.id) {
            this.isLoading = false;
            return;
          }
          this.segmentsBase.segmentEdit = { value: false };
          this.segmentsBase.segmentEditShow = { value: false };
          this.segmentsBase.squeezeCreate = { value: false };
          this.showContextMenu = { value: false };
          this.segmentsBase.action = [{
            tooltip: this.translateService.translate('tooltip.edit'),
            icon: 'edit',
            action: function action() {
              _this._onSegmentEdit();
            },
            show: this.segmentsBase.segmentEditShow
          }, {
            tooltip: this.translateService.translate('tooltip.create'),
            icon: 'plus',
            action: function action() {
              _this._onSegmentCreate();
            },
            show: this.segmentsBase.segmentEdit
          }];
          this.segmentsBase.squeezeCreditsEdit = { value: false };
          this.viewVirtualSegmentFlag = { value: false };
          this.segmentsBase.actionSqueezeCredits = [{
            tooltip: this.translateService.translate('tooltip.create'),
            icon: 'plus',
            action: function action() {
              _this._onSqueezeCreate();
            },
            show: this.segmentsBase.squeezeCreate
          }];

          this.segmentsBase.contextMenu = [{
            label: this.translateService.translate('results.tabs.segments.create.virtual.segment'),
            action: function action() {
              _this.openCreateVirtualSegment();
            },
            show: this.showContextMenu
          }, {
            label: this.translateService.translate('results.tabs.segments.view.virtual.segment'),
            action: function action() {
              _this.$state.go('viewVirtualSegment', { id: _this.$state.params.id });
            },
            show: this.viewVirtualSegmentFlag
          }];

          this.getFormats();
          this._getEntityDependencies();
          this.getMediaMaterial();
          this.getMedia();
          this._execute();
        }

        babelHelpers.createClass(SearchResultsTabsSegmentsCtrl, [{
          key: 'getMediaMaterial',
          value: function getMediaMaterial() {
            var _this2 = this;

            this.response = this.api['mediaMaterials'].get({ 'id': this.$state.params.id });
            this.response.isLoading = true;
            var objectData = this.response;

            this.response.$promise.then(function (response) {

              objectData.isLoading = false;
              objectData.valid = true;
              _this2.mediaMaterial = response;
            }, function (error) {
              // Si nos devuelve un 404, no queremos que se muestre el recurso, pero tampoco que nos tire error
              if (error.status == 404) {
                objectData.valid = false;
                objectData.isLoading = false;
              }
            });
          }
        }, {
          key: 'getMedia',
          value: function getMedia() {
            var _this3 = this;

            this.response = this.api['medias'].get({ 'currentId': this.$state.params.currentId });
            this.response.isLoading = true;
            var objectData = this.response;

            this.response.$promise.then(function (response) {

              objectData.isLoading = false;
              objectData.valid = true;
              _this3.media = response;
            }, function (error) {
              // Si nos devuelve un 404, no queremos que se muestre el recurso, pero tampoco que nos tire error
              if (error.status == 404) {
                objectData.valid = false;
                objectData.isLoading = false;
              }
            });
          }

          /*
          * Esto es un horror, hay que refactorizarlo. Perdón, pero tenemos que terminar de cerrar otras cosas.
          * */
        }, {
          key: 'getFormats',
          value: function getFormats() {
            var _this4 = this;

            this.response = this.api['mediaFormatResource'].get({ 'virtualSegmented': false });
            this.response.isLoading = true;
            var objectData = this.response;

            this.response.$promise.then(function (response) {

              objectData.isLoading = false;
              objectData.valid = true;
              _this4.formats = response.content;
              _this4.getFormatsForLFID(response.content);
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
          value: function getFormatsForLFID(formats) {
            var _this5 = this;

            var self = this;
            this.response = this.api['mediaFormatResource'].get({ 'virtualSegmented': true });
            this.response.isLoading = true;
            var objectData = this.response;

            this.response.$promise.then(function (response) {

              objectData.isLoading = false;
              objectData.valid = true;
              _this5.formatsLfId = response.content;

              var originFormat = response.content.concat(formats).find(function (format) {
                return format.id == self.media.format;
              });

              _this5.formatsLfId = self.formatsLfId.filter(function (format) {
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
          key: 'updateAspectRatioList',
          value: function updateAspectRatioList() {
            if (this.copy.media.type && this.copy.media.format) {
              this.getAspectRatios(this.copy.media.format.concat('-').concat(this.copy.media.type).concat('-').concat(1));
            }
          }
        }, {
          key: 'getAspectRatios',
          value: function getAspectRatios(media) {
            var _this6 = this;

            this.response = this.api['aspectsRatioMedias'].get({ 'id': media });
            this.response.isLoading = true;
            var objectData = this.response;

            this.response.$promise.then(function (response) {

              objectData.isLoading = false;
              objectData.valid = true;
              _this6.aspectRatios = response.content;
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
          key: '_getEntityDependencies',
          value: function _getEntityDependencies() {
            var _this7 = this;

            this.entityDependencies.forEach(function (it) {
              _this7.api[it.api].get(it.params).$promise.then(function (response) {
                _this7[it.model] = response.content;
              });
            });
          }
        }, {
          key: 'getTitle',
          value: function getTitle() {
            return this.translateService.translate('results.tabs.segments.mainTitle');
          }
        }, {
          key: 'inspectAspectRatio',
          value: function inspectAspectRatio() {
            if (this.copy && this.copy.aspectRatio && this.copy.aspectRatio.id == 'undefined') {
              delete this.copy.aspectRatio.id;
            }
          }
        }, {
          key: 'clone',
          value: function clone() {
            var _this8 = this;

            var promise = this.api['mediamateriallfid'].save({ 'id': this.$state.params.id }, this.copy).$promise;
            promise.then(function (response) {
              _this8.alertService.success({
                title: _this8.translate(_this8.successTitle),
                message: _this8.translate(_this8.successCreateMessage)
              });
              _this8.$state.go('viewVirtualSegment', { id: _this8.$state.params.id, 'editFirst': true });

              _this8.mdDialog.hide();
            }, function (err) {
              _this8.alertService.error({
                title: _this8.translate(_this8.errorTitle),
                message: err.data.message
              });
            });
          }
        }, {
          key: '_getPosition',
          value: function _getPosition(str, m, i) {
            return str.split(m, i).join(m).length;
          }
        }, {
          key: 'openCreateVirtualSegment',
          value: function openCreateVirtualSegment(ev) {
            var self = this;
            this.mdDialog.show({
              controller: function controller($scope, $mdDialog) {
                $scope.vm = self;
              },
              templateUrl: 'home/views/med.search.results.detail.segments.new.virtual.segment.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: false
            });
          }
        }, {
          key: 'shouldSelectAspectRatioForLFID',
          value: function shouldSelectAspectRatioForLFID() {
            return !this.mediaMaterial.aspectRatio && this.isAspectRatioRequired() || this.isNewFormatLFID();
          }
        }, {
          key: 'isAspectRatioRequired',
          value: function isAspectRatioRequired() {
            var _this9 = this;

            if (!this.copy || !this.copy.media) {
              return false;
            }
            return this.types.find(function (it) {
              return it.id == _this9.copy.media.type && it.mandatoryAspectRatio;
            });
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
            var currentFormat = this.getFormat(this.media.format);
            var newFormat = this.getFormat(this.copy.media.format);
            return currentFormat.definition !== newFormat.definition;
          }
        }, {
          key: 'closeModal',
          value: function closeModal() {
            this.mdDialog.hide();
          }
        }, {
          key: 'getSegmentBase',
          value: function getSegmentBase() {
            return this.segmentsBase;
          }
        }, {
          key: 'getSegmentBaseProperty',
          value: function getSegmentBaseProperty(property) {
            return this.segmentsBase[property];
          }
        }, {
          key: '_initSegment',
          value: function _initSegment() {
            this.segmentsBase._initSegment();
          }
        }, {
          key: '_onSegmentCreate',
          value: function _onSegmentCreate() {
            this.segmentsBase._onSegmentCreate();
          }
        }, {
          key: '_checkInitialSegment',
          value: function _checkInitialSegment() {
            this.segmentsBase._checkInitialSegment();
          }
        }, {
          key: '_onSegmentEdit',
          value: function _onSegmentEdit() {
            this.segmentsBase._onSegmentEdit();
          }
        }, {
          key: '_onSqueezeCreate',
          value: function _onSqueezeCreate() {
            this.segmentsBase._onSqueezeCreate();
          }
        }, {
          key: '_execute',
          value: function _execute() {
            var _this10 = this;

            var self = this;
            this.get().$promise.then(function (response) {
              _this10.viewVirtualSegmentFlag.value = !_this10.entity.isVirtualSegment && _this10.entity.isMediaMaterialEnabled;
              _this10.showContextMenu.value = _this10.entity.isMediaMaterialEnabled;
              _this10.segmentsBase.segmentEditShow.value = _this10.entity.isMediaMaterialEnabled;
              _this10.segmentsBase.entity = _this10.entity;
              _this10.segmentTransformerService.segmentsToString(_this10.entity.items);
              _this10.segmentsBase.segments = _this10.entity.items;
              _this10.changeSegment(_this10.segmentsBase.segments[0]);

              _this10.segmentsBase.audit = {
                enabled: response && response.audit,
                entity: { audit: response.audit }
              };
            });
          }
        }, {
          key: 'getAudit',
          value: function getAudit() {
            if (!this.entity) {
              return false;
            }
            if (!this.entity.audit) {
              return false;
            }
            return this.segmentsBase.audit;
          }
        }, {
          key: 'changeSegment',
          value: function changeSegment(segment) {
            this.segmentsBase.changeSegment(segment);
          }
        }, {
          key: '_allowCreateSqueeze',
          value: function _allowCreateSqueeze() {
            this.segmentsBase._allowCreateSqueeze();
          }
        }, {
          key: 'deleteEntry',
          value: function deleteEntry(entry) {
            this.segmentsBase.deleteEntry(entry);
          }
        }, {
          key: 'deleteSegment',
          value: function deleteSegment(index) {
            this.segmentsBase.deleteSegment(index);
          }
        }, {
          key: 'segmentCancel',
          value: function segmentCancel() {
            this.segmentsBase.segmentCancel(this);
          }
        }, {
          key: 'reload',
          value: function reload() {
            this.segmentsBase.reload();
          }
        }, {
          key: 'isValid',
          value: function isValid() {
            return this.segmentsBase.isValid();
          }
        }, {
          key: 'validateAndSave',
          value: function validateAndSave(form) {
            var _this11 = this;

            form.$valid = this.isValid();
            this.segmentTransformerService.segmentsToObject(this.segmentsBase.segments);

            this.save(form).then(function () {
              return _this11.$state.go(_this11.$state.current, {}, { reload: true });
            });
          }
        }, {
          key: 'changeCreditType',
          value: function changeCreditType(segment) {
            this.segmentsBase.changeCreditType(segment);
          }
        }, {
          key: 'createCredit',
          value: function createCredit(segment) {
            this.segmentsBase.createCredit(segment);
          }
        }, {
          key: 'deleteSqueeze',
          value: function deleteSqueeze(squeeze) {
            this.segmentsBase.deleteSqueeze(squeeze);
          }
        }, {
          key: 'ingestIDChange',
          value: function ingestIDChange(segment) {
            if (!segment.ingestID) {
              segment.isIngested = false;
            }
          }
        }]);
        return SearchResultsTabsSegmentsCtrl;
      })(Saveable);

      _export('default', SearchResultsTabsSegmentsCtrl);
    }
  };
});
//# sourceMappingURL=med.search.results.tabs.segments.ctrl.js.map
