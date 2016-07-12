System.register('app/home/scripts/controllers/med.search.material.ctrl', ['./med.search.media.ctrl.js'], function (_export) {
  /**
   * Created by julian on 16/02/16.
   */

  "use strict";
  var SearchMediaCtrl, SearchMaterialCtrl;
  return {
    setters: [function (_medSearchMediaCtrlJs) {
      SearchMediaCtrl = _medSearchMediaCtrlJs['default'];
    }],
    execute: function () {
      SearchMaterialCtrl = (function (_SearchMediaCtrl) {
        SearchMaterialCtrl.$inject = ["$state", "api", "alertService"];
        babelHelpers.inherits(SearchMaterialCtrl, _SearchMediaCtrl);

        /*@ngInject*/

        function SearchMaterialCtrl($state, api, alertService) {
          babelHelpers.classCallCheck(this, SearchMaterialCtrl);

          babelHelpers.get(Object.getPrototypeOf(SearchMaterialCtrl.prototype), 'constructor', this).call(this, $state, api, alertService);
        }

        babelHelpers.createClass(SearchMaterialCtrl, [{
          key: '_goTo',
          value: function _goTo() {
            this.state.go('searchMaterialResults', this.entity);
          }
        }, {
          key: 'disableField',
          value: function disableField() {
            if (this.entity.materialId === undefined || this.entity.materialId === '') {
              this.disable = true;
            } else {
              this.disable = false;
            }
          }
        }, {
          key: 'updateChapterTo',
          value: function updateChapterTo() {
            if (this.entity.fromChapter) {
              this.entity.toChapter = this.entity.fromChapter;
            }
          }
        }]);
        return SearchMaterialCtrl;
      })(SearchMediaCtrl);

      _export('default', SearchMaterialCtrl);
    }
  };
});
//# sourceMappingURL=med.search.material.ctrl.js.map
