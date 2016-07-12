System.register('app/home/scripts/controllers/med.search.results.tabs.rejections.ctrl', ['module-crud-ui/app/scripts/crud.saveable.js'], function (_export) {
  'use strict';

  var Saveable, SearchResultsTabsRejectionsCtrl;
  return {
    setters: [function (_moduleCrudUiAppScriptsCrudSaveableJs) {
      Saveable = _moduleCrudUiAppScriptsCrudSaveableJs['default'];
    }],
    execute: function () {
      SearchResultsTabsRejectionsCtrl = (function (_Saveable) {
        SearchResultsTabsRejectionsCtrl.$inject = ["translateService", "$injector", "rejectionService", "rejectionTransformerService", "api"];
        babelHelpers.inherits(SearchResultsTabsRejectionsCtrl, _Saveable);

        /*@ngInject*/

        function SearchResultsTabsRejectionsCtrl(translateService, $injector, rejectionService, rejectionTransformerService, api) {
          babelHelpers.classCallCheck(this, SearchResultsTabsRejectionsCtrl);

          //noinspection JSAnnotator
          babelHelpers.get(Object.getPrototypeOf(SearchResultsTabsRejectionsCtrl.prototype), 'constructor', this).call(this, {
            injector: $injector,
            endpoint: 'mediaRejections',
            backToState: ".",
            key: 'id',
            successTitle: 'media.edit.alert.success.title',
            successMessage: 'media.edit.alert.success.message',
            successCreateMessage: 'media.edit.alert.create.success.message',
            successEditMessage: 'common.alert.edit.success.title',
            errorTitle: 'media.edit.alert.error',
            executeGet: false
          });

          this.translateService = translateService;
          this.rejectionService = rejectionService;
          this.api = api;
          this.rejectionTransformerService = rejectionTransformerService;
          this._load();
        }

        babelHelpers.createClass(SearchResultsTabsRejectionsCtrl, [{
          key: '_load',
          value: function _load() {
            var _this = this;

            if (!this.$state.params.id) {
              return false;
            }
            this.audit = {
              enabled: false,
              entity: { audit: '' }
            };
            this._execute();
            this.rejectionsEdit = { value: false };
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
            this.rejectionTypes = this.api.rejectionTypes.get();
          }
        }, {
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
            var _this2 = this;

            this.rejectionsEdit.value = !this.rejectionsEdit.value;
            this.rejectionsEditShow.value = !this.rejectionsEditShow.value;
            if (this.entity.items.length === 0) {
              this._onRejectionCreate();
            } else {
              this.entity.items.forEach(function (rej) {
                if (rej.quality.type) {
                  _this2.getQualities(rej);
                }
              });
            }
          }
        }, {
          key: 'isValid',
          value: function isValid() {
            // TODO: hacer mas elegante
            if (!this.$state.params.id) {
              return false;
            }
            if (!angular.isDefined(this.entity.items)) {
              return true;
            }

            var isValidFormat = this.rejectionService.areFormatValid(this.entity.items);
            var isFramesValid = this.rejectionService.areFramesValid(this.entity.items, this.entity.standard.frames);
            var areInsideMaterial = this.rejectionService.areInsideMaterial(this.entity.items, this.entity.mediaMaterialTimeFrameInStr, this.entity.mediaMaterialTimeFrameOutStr);
            var areTCINvsTCOUTValid = this.rejectionService.areTCInVsTCOutValid(this.entity.items);
            var severitiesExist = this.entity.items.every(function (it) {
              return it.severity !== null && it.severity !== undefined;
            });
            return isValidFormat && isFramesValid && areInsideMaterial && areTCINvsTCOUTValid && severitiesExist;
          }
        }, {
          key: 'validateAndSave',
          value: function validateAndSave(form) {
            var _this3 = this;

            form.$valid = this.isValid();
            this.reload();
            this.rejectionTransformerService.rejectionsToObject(this.entity.items);
            this.entity.items.forEach(function (it) {
              delete it.qualities;
            });
            delete this.entity.mediaMaterialTimeFrameInStr;
            delete this.entity.mediaMaterialTimeFrameOutStr;
            if (this.entity.virtualSegment !== undefined) {
              delete this.entity.virtualSegment;
            }
            this.save(form).then(function () {
              return _this3.reload();
            }).then(function () {
              return _this3._execute();
            });
          }
        }, {
          key: 'reload',
          value: function reload() {
            this.rejectionsEdit.value = false;
            this.rejectionsEditShow.value = true;
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
            var _this4 = this;

            var response = undefined;
            if (rejection.quality.type !== undefined) {
              this.isLoading = true;
              response = this.api.technicalQualities.get({ 'typeId': rejection.quality.type.id });
              response.$promise.then(function (response) {
                rejection.qualities = response.content;
                _this4.isLoading = false;
              }, function (error) {
                _this4.isLoading = false;
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
          key: 'rejectionCancel',
          value: function rejectionCancel() {
            this.reload();
            this._execute();
          }
        }, {
          key: '_execute',
          value: function _execute() {
            var self = this;
            self.isLoading = true;
            this.get().$promise.then(function (response) {
              self.rejectionsEditShow.value = !response.isVirtualSegment && response.isMediaMaterialEnabled;
              self.rejectionTransformerService.rejectionsToString(self.entity.items);
              self.entity.mediaMaterialTimeFrameInStr = self.rejectionTransformerService.timeBaseTransformerService._toString(self.entity.mediaMaterialTimeFrameIn);
              self.entity.mediaMaterialTimeFrameOutStr = self.rejectionTransformerService.timeBaseTransformerService._toString(self.entity.mediaMaterialTimeFrameOut);
              self.audit.enabled = response && response.audit;
              self.audit.entity.audit = response.audit;
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
            return this.audit;
          }
        }]);
        return SearchResultsTabsRejectionsCtrl;
      })(Saveable);

      _export('default', SearchResultsTabsRejectionsCtrl);
    }
  };
});
//# sourceMappingURL=med.search.results.tabs.rejections.ctrl.js.map
