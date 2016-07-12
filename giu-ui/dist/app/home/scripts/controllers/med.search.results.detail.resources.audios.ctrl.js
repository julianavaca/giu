System.register('app/home/scripts/controllers/med.search.results.detail.resources.audios.ctrl', ['module-crud-ui/app/scripts/crud.pageable.js'], function (_export) {
  'use strict';
  var Pageable, SearchResultsDetailCtrl;
  return {
    setters: [function (_moduleCrudUiAppScriptsCrudPageableJs) {
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
          this.translateService = translateService;
          this.isNotVirtualSegment = { 'value': false };
          this.audioPageable = new Pageable({
            injector: $injector,
            endpoint: 'mediaMaterialsAudios',
            params: $state.params,
            selectable: {
              itemKey: 'id',
              enabled: true,
              allowMultiSelect: false
            },
            executeGet: false
          });
          this._init();
        }

        babelHelpers.createClass(SearchResultsDetailCtrl, [{
          key: 'onAudioEdit',
          value: function onAudioEdit() {
            this.state.go('searchResults.detail.mediaResourcesEdit', { id: this.state.params.id, resourceType: 'audio' });
          }
        }, {
          key: 'isEditable',
          value: function isEditable(pageable) {
            return pageable.page && pageable.page.isEditable;
          }
        }, {
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
                _this.onAudioEdit();
              },
              show: this.isNotVirtualSegment
            }];
            this.audioPageable.get().$promise.then(function (response) {
              _this.isNotVirtualSegment.value = !response.isVirtualSegment && response.isMediaMaterialEnabled;
              _this.audit = {
                enabled: response && response.audit,
                entity: { audit: response.audit }
              };
            });
          }
        }, {
          key: 'getAudit',
          value: function getAudit() {
            if (!this.audioPageable.page) {
              return false;
            }
            if (!this.audioPageable.page.audit) {
              return false;
            }
            return this.audit;
          }
        }]);
        return SearchResultsDetailCtrl;
      })();

      _export('default', SearchResultsDetailCtrl);
    }
  };
});
//# sourceMappingURL=med.search.results.detail.resources.audios.ctrl.js.map
