System.register('app/home/scripts/controllers/med.search.results.tabs.technical.ctrl', ['module-crud-ui/app/scripts/crud.pageable.js'], function (_export) {
  'use strict';
  var Pageable, SearchResultsTabsTechnicalCtrl;
  return {
    setters: [function (_moduleCrudUiAppScriptsCrudPageableJs) {
      Pageable = _moduleCrudUiAppScriptsCrudPageableJs['default'];
    }],
    execute: function () {
      SearchResultsTabsTechnicalCtrl = (function (_Pageable) {
        SearchResultsTabsTechnicalCtrl.$inject = ["$injector", "api", "$state"];
        babelHelpers.inherits(SearchResultsTabsTechnicalCtrl, _Pageable);

        /*@ngInject*/

        function SearchResultsTabsTechnicalCtrl($injector, api, $state) {
          babelHelpers.classCallCheck(this, SearchResultsTabsTechnicalCtrl);

          babelHelpers.get(Object.getPrototypeOf(SearchResultsTabsTechnicalCtrl.prototype), 'constructor', this).call(this, { injector: $injector, endpoint: 'technicalStateAudit', params: { 'id': $state.params.id }, executeGet: false });

          this.api = api;
          this.state = $state;
          if (this.state.params.id) {
            this.get();
          }
        }

        babelHelpers.createClass(SearchResultsTabsTechnicalCtrl, [{
          key: 'getPathParams',
          value: function getPathParams() {
            return { 'detailCid': this.state.params.id };
          }
        }, {
          key: 'getDetailData',
          value: function getDetailData(endpoint) {
            this.response = this.api[endpoint].get(this.getPathParams());
            this.response.isLoading = true;
            var objectData = this.response;

            this.response.$promise.then(function () {

              objectData.isLoading = false;
              objectData.valid = true;
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
        return SearchResultsTabsTechnicalCtrl;
      })(Pageable);

      _export('default', SearchResultsTabsTechnicalCtrl);
    }
  };
});
//# sourceMappingURL=med.search.results.tabs.technical.ctrl.js.map
