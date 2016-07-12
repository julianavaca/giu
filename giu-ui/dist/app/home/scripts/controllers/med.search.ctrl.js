System.register('app/home/scripts/controllers/med.search.ctrl', [], function (_export) {
  'use strict';

  var SearchCtrl;
  return {
    setters: [],
    execute: function () {
      SearchCtrl = (function () {

        /*@ngInject*/

        SearchCtrl.$inject = ["$state"];
        function SearchCtrl($state) {
          babelHelpers.classCallCheck(this, SearchCtrl);

          this.state = $state;
          this._init();
        }

        babelHelpers.createClass(SearchCtrl, [{
          key: '_init',
          value: function _init() {
            this.activeTab = this.state.params.searchTab === '1' ? 1 : 0;
          }
        }]);
        return SearchCtrl;
      })();

      _export('default', SearchCtrl);
    }
  };
});
//# sourceMappingURL=med.search.ctrl.js.map
