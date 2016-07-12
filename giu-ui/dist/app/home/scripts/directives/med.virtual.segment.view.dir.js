System.register('app/home/scripts/directives/med.virtual.segment.view.dir', ['../../../home/scripts/controllers/med.segments.base.ctrl.js'], function (_export) {
  'use strict';

  var SegmentsBase, ViewVirtualSegmentControllerDir, VirtualSegmentDirective;
  return {
    setters: [function (_homeScriptsControllersMedSegmentsBaseCtrlJs) {
      SegmentsBase = _homeScriptsControllersMedSegmentsBaseCtrlJs['default'];
    }],
    execute: function () {
      ViewVirtualSegmentControllerDir = (function () {

        /*@ngInject*/

        ViewVirtualSegmentControllerDir.$inject = ["$mdDialog", "$state", "$window", "segmentTransformerService", "translateService", "segmentService", "squeezeService", "api", "alertService", "$scope"];
        function ViewVirtualSegmentControllerDir($mdDialog, $state, $window, segmentTransformerService, translateService, segmentService, squeezeService, api, alertService, $scope) {
          var _this = this;

          babelHelpers.classCallCheck(this, ViewVirtualSegmentControllerDir);

          this.api = api;
          this.alertService = alertService;
          this.translateService = translateService;
          this.segmentService = segmentService;
          this.squeezeService = squeezeService;
          this.segmentTransformerService = segmentTransformerService;
          this.$state = $state;
          this.window = $window;
          this.mediaId = this.$state.params.id;

          this.segmentsBase = new SegmentsBase(segmentService, squeezeService, segmentTransformerService, translateService, $state, $mdDialog, alertService, $scope);

          this.segmentsBase.entity = this.mediaMaterial.segments;
          this.editFirst = this.editFirst || false;
          this.segmentsBase.segmentEdit = { value: false };
          this.segmentsBase.segmentEditShow = { value: true };
          this.segmentsBase.squeezeCreate = { value: false };
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
          this.segmentsBase.actionSqueezeCredits = [{
            tooltip: this.translateService.translate('tooltip.create'),
            icon: 'plus',
            action: function action() {
              _this._onSqueezeCreate();
            },
            show: this.segmentsBase.squeezeCreate
          }];

          this.getSqueezeCreditTypes();

          this._execute();
          if (this.editFirst && this.cardNumber == 0) {
            this._onSegmentEdit();
          }
        }

        babelHelpers.createClass(ViewVirtualSegmentControllerDir, [{
          key: 'getTitle',
          value: function getTitle() {
            return this.translateService.translate(' ' + this.mediaMaterial.mediaMaterial.id);
          }
        }, {
          key: 'actionTitle',
          value: function actionTitle() {
            var mediaMaterialIds = this.title.split('-');

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
          key: 'getSqueezeCreditTypes',
          value: function getSqueezeCreditTypes() {
            var _this2 = this;

            this.response = this.api['mediaSqueezeCreditsTypes'].get();
            this.response.isLoading = true;
            var objectData = this.response;

            this.response.$promise.then(function (response) {

              objectData.isLoading = false;
              objectData.valid = true;
              _this2.squeezeCreditTypes = response.content;
            }, function (error) {
              // Si nos devuelve un 404, no queremos que se muestre el recurso, pero tampoco que nos tire error
              if (error.status == 404) {
                objectData.valid = false;
                objectData.isLoading = false;
              }
            });
          }
        }, {
          key: '_execute',
          value: function _execute() {
            var self = this;
            this.segmentsBase.segments = [];
            this.segmentsBase.entity.items.forEach(function (seg) {
              self.segmentsBase.segments.push(Object.assign({}, seg));
            });
            this.segmentTransformerService.segmentsToString(this.segmentsBase.segments);
            this.segmentsBase.changeSegment(this.segmentsBase.segments[0]);
            this.segmentsBase.audit = {
              enabled: this.segmentsBase.entity && this.segmentsBase.entity.audit,
              entity: { audit: this.segmentsBase.entity.audit }
            };
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
            var _this3 = this;

            form.$valid = this.isValid();
            //TODO: Hacer un clone mas lindo;
            this.segmentsBase.entity.items = [];
            this.segmentsBase.segments.forEach(function (seg) {
              _this3.segmentsBase.entity.items.push(Object.assign({}, seg));
            });
            this.segmentTransformerService.segmentsToObject(this.segmentsBase.entity.items);

            this.api['mediaSegments'].update({ 'id': this.mediaMaterial.mediaMaterial.id }, this.segmentsBase.entity).$promise.then(function () {
              return _this3.$state.go(_this3.$state.current, {}, { reload: true });
            }, function (error) {
              _this3.onResponseError(error);
            }).then(function () {
              return _this3._execute();
            });
          }
        }, {
          key: 'onResponseError',
          value: function onResponseError(error) {
            var _this4 = this;

            if (error.status === 422) {
              (function () {
                var msj = 'Error in: ';
                error.data.forEach(function (err) {
                  msj = msj + ' ' + err.field;
                });
                _this4.alertService.error({
                  title: _this4.translateService.translate('results.tabs.segments.error.message.IngestId.duplicate'),
                  message: msj
                });
              })();
            }
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
        }]);
        return ViewVirtualSegmentControllerDir;
      })();

      VirtualSegmentDirective = (function () {
        function VirtualSegmentDirective() {
          babelHelpers.classCallCheck(this, VirtualSegmentDirective);

          this.restrict = 'E';
          this.replace = false;
          this.template = '<div style="padding:10px;" layout="column" flex><ng-include src="\'home/views/med.search.results.tabs.segments.html\'"></ng-include></div>';
          this.scope = {};
          this.bindToController = {
            'mediaMaterial': '=',
            'collapsable': '=',
            'editFirst': '=',
            'cardNumber': '='
          };

          this.controller = ViewVirtualSegmentControllerDir;
          this.controllerAs = 'vm';
        }

        babelHelpers.createClass(VirtualSegmentDirective, null, [{
          key: 'directiveFactory',
          value: function directiveFactory() {
            var instance = new VirtualSegmentDirective();
            return instance;
          }
        }]);
        return VirtualSegmentDirective;
      })();

      _export('default', VirtualSegmentDirective);
    }
  };
});
//# sourceMappingURL=med.virtual.segment.view.dir.js.map
