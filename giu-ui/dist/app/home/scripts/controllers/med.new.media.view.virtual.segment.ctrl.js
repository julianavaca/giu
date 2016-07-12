System.register('app/home/scripts/controllers/med.new.media.view.virtual.segment.ctrl', ['module-crud-ui/app/scripts/crud.saveable.js', './med.segments.base.ctrl.js'], function (_export) {
  'use strict';
  var Saveable, SegmentsBase, ViewVirtualSegment;
  return {
    setters: [function (_moduleCrudUiAppScriptsCrudSaveableJs) {
      Saveable = _moduleCrudUiAppScriptsCrudSaveableJs['default'];
    }, function (_medSegmentsBaseCtrlJs) {
      SegmentsBase = _medSegmentsBaseCtrlJs['default'];
    }],
    execute: function () {
      ViewVirtualSegment = (function (_Saveable) {
        ViewVirtualSegment.$inject = ["$injector", "$state", "$window", "segmentTransformerService", "translateService", "segmentService", "squeezeService", "$mdDialog"];
        babelHelpers.inherits(ViewVirtualSegment, _Saveable);

        /*@ngInject*/

        function ViewVirtualSegment($injector, $state, $window, segmentTransformerService, translateService, segmentService, squeezeService, $mdDialog) {
          babelHelpers.classCallCheck(this, ViewVirtualSegment);

          babelHelpers.get(Object.getPrototypeOf(ViewVirtualSegment.prototype), 'constructor', this).call(this, {
            injector: $injector,
            endpoint: 'lfidsegments',
            backToState: '.',
            key: 'id',
            successTitle: 'media.edit.alert.success.title',
            successMessage: 'media.edit.alert.success.message',
            successCreateMessage: 'media.edit.alert.create.success.message',
            successEditMessage: 'media.edit.alert.success.message',
            errorTitle: 'media.edit.alert.error',
            executeGet: false,
            params: $state.params,
            entityDependencies: [{ api: 'networkResource', loading: 'isLoading', model: 'networkData' }, { api: 'mediaFormatResource', loading: 'isLoading', model: 'formats', params: { 'virtualSegmented': false } }, { api: 'mediaTypeResource', loading: 'isLoading', model: 'types' }]
          });

          this.translateService = translateService;
          this.segmentTransformerService = segmentTransformerService;
          this.state = $state;
          this.window = $window;
          this.mediaId = this.state.params.id;
          this.warning = false;
          this.mdDialog = $mdDialog;

          this.segmentsBase = new SegmentsBase(segmentService, squeezeService, segmentTransformerService, translateService, $state, $mdDialog);

          this.editFirst = this.state.params.editFirst === "true" ? true : false;
          this.getMedia();
          this.getMediaMaterial();
          this.getAspectRatios();
          this._execute();
        }

        babelHelpers.createClass(ViewVirtualSegment, [{
          key: 'goToParent',
          value: function goToParent() {
            var mediaMaterialIds = this.$state.params.id.split('-');

            var parentParams = {
              mediaFormat: mediaMaterialIds[0],
              mediaType: mediaMaterialIds[1],
              mediaId: mediaMaterialIds[2],
              materialId: mediaMaterialIds[3],
              chapterFrom: mediaMaterialIds[4],
              chapterTo: mediaMaterialIds[4]
            };

            this.state.go('searchResults', parentParams);
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
          key: 'closeModal',
          value: function closeModal() {
            this.mdDialog.hide();
          }

          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        }, {
          key: 'getAspectRatios',
          value: function getAspectRatios() {
            var _this = this;

            this.response = this.api['aspectsRatioMedias'].get({ 'id': this.getMediaIdFromMediaMaterialId() });
            this.response.isLoading = true;
            var objectData = this.response;

            this.response.$promise.then(function (response) {

              objectData.isLoading = false;
              objectData.valid = true;
              _this.aspectRatios = response.content;
            }, function (error) {
              // Si nos devuelve un 404, no queremos que se muestre el recurso, pero tampoco que nos tire error
              if (error.status == 404) {
                objectData.valid = false;
                objectData.isLoading = false;
              }
            });
          }
        }, {
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
          key: 'getMediaIdFromMediaMaterialId',
          value: function getMediaIdFromMediaMaterialId() {
            var mediaMaterialId = this.state.params.id.split('-');
            return mediaMaterialId[0].concat('-').concat(mediaMaterialId[1]).concat('-').concat(mediaMaterialId[2]);
          }
        }, {
          key: 'getMedia',
          value: function getMedia() {
            var _this3 = this;

            this.response = this.api['medias'].get({ 'currentId': this.getMediaIdFromMediaMaterialId() });
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
            var currentFormat = this.getFormat(this.media.format);
            var newFormat = this.getFormat(this.copy.media.format);
            return currentFormat.definition !== newFormat.definition;
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
            var _this4 = this;

            var promise = this.api['mediamateriallfid'].save({ 'id': this.$state.params.id }, this.copy).$promise;
            promise.then(function (response) {
              _this4.alertService.success({
                title: _this4.translate(_this4.successTitle),
                message: _this4.translate(_this4.successCreateMessage)
              });
              _this4.$state.go('viewVirtualSegment', { 'editFirst': true }, { reload: true });

              _this4.mdDialog.hide();
            }, function (err) {
              _this4.alertService.error({
                title: _this4.translate(_this4.errorTitle),
                message: err.data.message
              });
            });
          }
        }, {
          key: 'isAspectRatioRequired',
          value: function isAspectRatioRequired() {
            var _this5 = this;

            if (!this.copy || !this.copy.media) {
              return false;
            }
            return this.types.find(function (it) {
              return it.id == _this5.copy.media.type && it.mandatoryAspectRatio;
            });
          }

          ////////////////////////////////////////////////////////////////////////////////////////////////////

        }, {
          key: 'getTitle',
          value: function getTitle() {
            return this.translateService.translate('view.virtual.segment.title') + ' ' + this.mediaId;
          }
        }, {
          key: '_execute',
          value: function _execute() {
            var _this6 = this;

            var self = this;
            this.get().$promise.then(function (response) {
              _this6.mediaMaterials = [];
              _this6.getFormatsForLFID(response.content);
              if (_this6.entity.content.length == 0) {
                _this6.warning = true;
              } else {
                _this6.entity.content.forEach(function (mediaMaterial) {
                  var mediaMaterialResult = {};
                  var segmentList = [];

                  mediaMaterial.segments.items.forEach(function (seg) {
                    segmentList.push(Object.assign({}, seg));
                  });

                  self.segmentTransformerService.segmentsToString(segmentList);
                  self.segmentsBase.changeSegment(segmentList[0]);

                  var audit = {
                    enabled: mediaMaterial.segments && mediaMaterial.segments.audit,
                    entity: { audit: mediaMaterial.segments.audit }
                  };

                  mediaMaterialResult.segments = segmentList;
                  mediaMaterialResult.audit = audit;

                  self.mediaMaterials.push(mediaMaterialResult);
                });
              }
            });
          }
        }, {
          key: 'getFormatsForLFID',
          value: function getFormatsForLFID(formats) {
            var _this7 = this;

            var self = this;
            this.response = this.api['mediaFormatResource'].get({ 'virtualSegmented': true });
            this.response.isLoading = true;
            var objectData = this.response;

            this.response.$promise.then(function (response) {

              objectData.isLoading = false;
              objectData.valid = true;
              _this7.formatsLfId = response.content;

              var originFormat = _this7.getFormat(self.media.format);

              _this7.formatsLfId = self.formatsLfId.filter(function (format) {
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
        }]);
        return ViewVirtualSegment;
      })(Saveable);

      _export('default', ViewVirtualSegment);
    }
  };
});
//# sourceMappingURL=med.new.media.view.virtual.segment.ctrl.js.map
