System.register('app/home/scripts/controllers/med.search.results.detail.resources.graphics.ctrl', ['module-crud-ui/app/scripts/crud.selectable.js', 'module-crud-ui/app/scripts/crud.pageable.js'], function (_export) {
  'use strict';

  var Selectable, Pageable, SearchResultsDetailCtrl;
  return {
    setters: [function (_moduleCrudUiAppScriptsCrudSelectableJs) {
      Selectable = _moduleCrudUiAppScriptsCrudSelectableJs['default'];
    }, function (_moduleCrudUiAppScriptsCrudPageableJs) {
      Pageable = _moduleCrudUiAppScriptsCrudPageableJs['default'];
    }],
    execute: function () {
      SearchResultsDetailCtrl = (function () {

        /*@ngInject*/

        SearchResultsDetailCtrl.$inject = ["api", "$state", "$injector", "translateService"];
        function SearchResultsDetailCtrl(api, $state, $injector, translateService) {
          babelHelpers.classCallCheck(this, SearchResultsDetailCtrl);

          this.api = api;
          this.state = $state;
          this.isNotVirtualSegment = { 'value': false };
          this.graphicsPageable = new Pageable({
            injector: $injector,
            endpoint: 'mediaMaterialsGraphics',
            params: $state.params,
            selectable: {
              itemKey: 'id',
              enabled: true,
              allowMultiSelect: false
            },
            executeGet: false
          });
          this.translateService = translateService;
          this._init();
        }

        babelHelpers.createClass(SearchResultsDetailCtrl, [{
          key: '_init',
          value: function _init() {
            var _this = this;

            if (!this.state.params.id) {
              return;
            }
            this.actions = [{
              roles: 'MMMU',
              tooltip: this.translateService.translate('tooltip.edit'),
              icon: 'edit',
              action: function action() {
                _this.onGraphicsEdit();
              },
              show: this.isNotVirtualSegment
            }];
            this.graphicsPageable.get().$promise.then(function (response) {
              _this.isNotVirtualSegment.value = !response.isVirtualSegment && response.isMediaMaterialEnabled;
              _this.audit = {
                enabled: response && response.audit,
                isRemote: false,
                entity: { audit: response.audit }
              };
            });
          }
        }, {
          key: 'getAudit',
          value: function getAudit() {
            if (!this.graphicsPageable.page) {
              return false;
            }

            if (!this.graphicsPageable.page.audit) {
              return false;
            }
            return this.audit;
          }
        }, {
          key: 'onGraphicsEdit',
          value: function onGraphicsEdit() {
            this.state.go('searchResults.detail.mediaGraphicEdit', { id: this.state.params.id, resourceType: 'graph' });
          }
        }, {
          key: 'isEditable',
          value: function isEditable(pageable) {
            return pageable.page && pageable.page.isEditable;
          }
        }]);
        return SearchResultsDetailCtrl;
      })();

      _export('default', SearchResultsDetailCtrl);
    }
  };
});
//# sourceMappingURL=med.search.results.detail.resources.graphics.ctrl.js.map
