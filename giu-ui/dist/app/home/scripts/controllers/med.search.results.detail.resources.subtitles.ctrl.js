System.register('app/home/scripts/controllers/med.search.results.detail.resources.subtitles.ctrl', ['module-crud-ui/app/scripts/crud.pageable.js'], function (_export) {
  'use strict';

  var Pageable, SearchResultsDetailCtrl;
  return {
    setters: [function (_moduleCrudUiAppScriptsCrudPageableJs) {
      Pageable = _moduleCrudUiAppScriptsCrudPageableJs['default'];
    }],
    execute: function () {
      SearchResultsDetailCtrl = (function () {

        /*@ngInject*/

        SearchResultsDetailCtrl.$inject = ["$state", "$injector", "translateService"];
        function SearchResultsDetailCtrl($state, $injector, translateService) {
          babelHelpers.classCallCheck(this, SearchResultsDetailCtrl);

          this.state = $state;
          this.isNotVirtualSegment = { 'value': false };
          this.subtitlesPageable = new Pageable({
            injector: $injector, endpoint: 'mediaMaterialsSubtitles', params: $state.params, selectable: {
              itemKey: 'id', enabled: true, allowMultiSelect: false
            }, executeGet: false
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
                _this.onSubtitleEdit();
              },
              show: this.isNotVirtualSegment
            }];
            this.subtitlesPageable.get().$promise.then(function (response) {
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
            if (!this.subtitlesPageable.page) {
              return false;
            }
            if (!this.subtitlesPageable.page.audit) {
              return false;
            }
            return this.audit;
          }
        }, {
          key: 'onSubtitleEdit',
          value: function onSubtitleEdit() {
            this.state.go('searchResults.detail.mediaSubtitlesEdit', { id: this.state.params.id, resourceType: 'subtitle' });
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
//# sourceMappingURL=med.search.results.detail.resources.subtitles.ctrl.js.map
