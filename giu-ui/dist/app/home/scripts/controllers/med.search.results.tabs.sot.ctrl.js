System.register('app/home/scripts/controllers/med.search.results.tabs.sot.ctrl', ['module-crud-ui/app/scripts/crud.saveable.js'], function (_export) {
  'use strict';

  var Saveable, SearchResultsTabsSotCtrl;
  return {
    setters: [function (_moduleCrudUiAppScriptsCrudSaveableJs) {
      Saveable = _moduleCrudUiAppScriptsCrudSaveableJs['default'];
    }],
    execute: function () {
      SearchResultsTabsSotCtrl = (function (_Saveable) {
        SearchResultsTabsSotCtrl.$inject = ["$injector", "api", "$state", "translateService"];
        babelHelpers.inherits(SearchResultsTabsSotCtrl, _Saveable);

        /*@ngInject*/

        function SearchResultsTabsSotCtrl($injector, api, $state, translateService) {
          babelHelpers.classCallCheck(this, SearchResultsTabsSotCtrl);

          babelHelpers.get(Object.getPrototypeOf(SearchResultsTabsSotCtrl.prototype), 'constructor', this).call(this, {
            injector: $injector,
            endpoint: 'setOfTapesCurrent',
            backToState: ".",
            key: 'id',
            successTitle: 'media.edit.alert.success.title',
            successMessage: 'media.edit.alert.success.message',
            successCreateMessage: 'media.edit.alert.create.success.message',
            successEditMessage: 'common.alert.edit.success.title',
            errorTitle: 'media.edit.alert.error',
            executeGet: false
          });
          this.api = api;
          this.state = $state;
          this.translateService = translateService;
          this.partList = [];
          if (this.state.params.id) {
            this._load();
            this.generatePartList();
          }
        }

        babelHelpers.createClass(SearchResultsTabsSotCtrl, [{
          key: 'generatePartList',
          value: function generatePartList() {
            this.partList = [];
            var aux = parseInt(this.entity.partsTotal);
            while (aux > 0) {
              this.partList.push(aux);
              aux--;
            }
          }
        }, {
          key: '_initEdit',
          value: function _initEdit() {
            this.generatePartList();
          }
        }, {
          key: '_load',
          value: function _load() {
            var _this = this;

            this.isNotVirtualSegment = { value: false };
            this.actions = [{
              roles: 'MMMU',
              tooltip: this.translateService.translate('tooltip.edit'),
              icon: 'edit',
              action: function action() {
                _this.sotEdit = true;_this.isNotVirtualSegment.value = !_this.isNotVirtualSegment.value;
              },
              show: this.isNotVirtualSegment
            }];
            this.get().$promise.then(function (response) {
              _this.isNotVirtualSegment.value = !response.virtualSegment && response.isMediaMaterialEnabled;
            });
          }
        }, {
          key: 'saveAndClose',
          value: function saveAndClose(form) {
            var _this2 = this;

            if (this.entity.virtualSegment !== undefined) {
              delete this.entity.virtualSegment;
            }
            this.save(form).then(function () {
              _this2.sotEdit = false;_this2.isNotVirtualSegment.value = true;
            });
          }
        }, {
          key: 'cancelSot',
          value: function cancelSot() {
            this.sotEdit = false;
            this.isNotVirtualSegment.value = true;
            this._load();
          }
        }]);
        return SearchResultsTabsSotCtrl;
      })(Saveable);

      _export('default', SearchResultsTabsSotCtrl);
    }
  };
});
//# sourceMappingURL=med.search.results.tabs.sot.ctrl.js.map
