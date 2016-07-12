System.register('app/home/scripts/controllers/med.material.programming.ctrl', ['module-crud-ui/app/scripts/crud.pageable.js', 'module-crud-ui/app/scripts/crud.saveable.js'], function (_export) {
  /* global angular */

  'use strict';
  var Pageable, Saveable, MaterialProgrammingCtrl;
  return {
    setters: [function (_moduleCrudUiAppScriptsCrudPageableJs) {
      Pageable = _moduleCrudUiAppScriptsCrudPageableJs['default'];
    }, function (_moduleCrudUiAppScriptsCrudSaveableJs) {
      Saveable = _moduleCrudUiAppScriptsCrudSaveableJs['default'];
    }],
    execute: function () {
      MaterialProgrammingCtrl = (function (_Pageable) {
        MaterialProgrammingCtrl.$inject = ["$injector", "$state", "$filter", "$window"];
        babelHelpers.inherits(MaterialProgrammingCtrl, _Pageable);

        /*@ngInject*/

        function MaterialProgrammingCtrl($injector, $state, $filter, $window) {
          var _this = this;

          babelHelpers.classCallCheck(this, MaterialProgrammingCtrl);

          babelHelpers.get(Object.getPrototypeOf(MaterialProgrammingCtrl.prototype), 'constructor', this).call(this, {
            injector: $injector,
            endpoint: 'materialmedias',
            params: {
              fromChapter: $state.params.chapterId,
              toChapter: $state.params.chapterId,
              materialId: $state.params.materialId
            },
            selectable: {
              itemKey: 'cid',
              enabled: true,
              allowMultiSelect: false,
              params: {}
            },
            executeGet: true
          });
          this.programmingPageable = new Pageable({
            injector: $injector,
            endpoint: 'dailyProgramming',
            params: {
              chapterId: $state.params.chapterId,
              materialId: $state.params.materialId
            },
            selectable: {
              itemKey: 'id',
              enabled: true,
              allowMultiSelect: false
            },
            executeGet: true
          });
          this.state = $state;
          this.filter = $filter;
          this.window = $window;
          this.actions = [{
            enabled: true,
            tooltip: this.filter('translate')('tooltip.search'),
            action: function action() {
              _this.goToSearchResult();
            },
            icon: 'arrow-left'
          }];
        }

        babelHelpers.createClass(MaterialProgrammingCtrl, [{
          key: '_load',
          value: function _load() {
            var params = {
              materialId: this.state.params.id,
              fromChapter: this.state.params.chapterId,
              toChapter: this.state.params.chapterId
            };
            this.get(params);
          }
        }, {
          key: 'goToSearchResult',
          value: function goToSearchResult() {
            this.state.go('searchResults', this.state.params);
          }
        }]);
        return MaterialProgrammingCtrl;
      })(Pageable);

      _export('default', MaterialProgrammingCtrl);
    }
  };
});
//# sourceMappingURL=med.material.programming.ctrl.js.map
