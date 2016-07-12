System.register('app/home/scripts/controllers/med.search.results.detail.resources.ctrl', ['module-crud-ui/app/scripts/crud.selectable.js', 'module-crud-ui/app/scripts/crud.pageable.js'], function (_export) {
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

        SearchResultsDetailCtrl.$inject = ["api", "$state", "$injector"];
        function SearchResultsDetailCtrl(api, $state, $injector) {
          babelHelpers.classCallCheck(this, SearchResultsDetailCtrl);

          this.api = api;
          this.state = $state;

          this.audioPageable = new Pageable({ injector: $injector, endpoint: 'mediaMaterialsAudios', params: $state.params, selectable: {
              itemKey: 'id', enabled: true, allowMultiSelect: false
            }, executeGet: true });

          this.subtitlesPageable = new Pageable({ injector: $injector, endpoint: 'mediaMaterialsSubtitles', params: $state.params, selectable: {
              itemKey: 'id', enabled: true, allowMultiSelect: false
            }, executeGet: true });

          this.graphicsPageable = new Pageable({ injector: $injector, endpoint: 'mediaMaterialsGraphics', params: $state.params, selectable: {
              itemKey: 'id', enabled: true, allowMultiSelect: false
            }, executeGet: true });
        }

        babelHelpers.createClass(SearchResultsDetailCtrl, [{
          key: 'onAudioEdit',
          value: function onAudioEdit() {
            if (this.audioPageable.selectable.itemSelected()) this.state.go('mediaResourcesEdit', { id: this.state.params.id, resourceId: this.audioPageable.selectable.itemSelected().id, resourceType: 'audio' });
          }
        }, {
          key: 'onSubtitleEdit',
          value: function onSubtitleEdit() {
            if (this.subtitlesPageable.selectable.itemSelected()) this.state.go('mediaResourcesEdit', { id: this.state.params.id, resourceId: this.subtitlesPageable.selectable.itemSelected().id, resourceType: 'subtitle' });
          }
        }, {
          key: 'onGraphicsEdit',
          value: function onGraphicsEdit() {
            if (this.graphicsPageable.selectable.itemSelected()) this.state.go('mediaResourcesEdit', { id: this.state.params.id, resourceId: this.graphicsPageable.selectable.itemSelected().id, resourceType: 'graph' });
          }
        }, {
          key: 'isEditable',
          value: function isEditable(pageable) {
            return pageable.page && pageable.page.content && pageable.page.content[0] && pageable.page.content[0].isEditable;
          }
        }]);
        return SearchResultsDetailCtrl;
      })();

      _export('default', SearchResultsDetailCtrl);
    }
  };
});
//# sourceMappingURL=med.search.results.detail.resources.ctrl.js.map
