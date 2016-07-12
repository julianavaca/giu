System.register('app/home/scripts/controllers/med.material.detail.chapter.ratings.ctrl', ['module-crud-ui/app/scripts/crud.saveable.js', 'module-crud-ui/app/scripts/crud.pageable.js'], function (_export) {
  /* global angular */

  'use strict';

  var Saveable, Pageable, MaterialDetailChapterRatingsCtrl;
  return {
    setters: [function (_moduleCrudUiAppScriptsCrudSaveableJs) {
      Saveable = _moduleCrudUiAppScriptsCrudSaveableJs['default'];
    }, function (_moduleCrudUiAppScriptsCrudPageableJs) {
      Pageable = _moduleCrudUiAppScriptsCrudPageableJs['default'];
    }],
    execute: function () {
      MaterialDetailChapterRatingsCtrl = (function (_Saveable) {
        MaterialDetailChapterRatingsCtrl.$inject = ["$state", "translateService", "$injector"];
        babelHelpers.inherits(MaterialDetailChapterRatingsCtrl, _Saveable);

        /*@ngInject*/

        function MaterialDetailChapterRatingsCtrl($state, translateService, $injector) {
          var _this = this;

          babelHelpers.classCallCheck(this, MaterialDetailChapterRatingsCtrl);

          babelHelpers.get(Object.getPrototypeOf(MaterialDetailChapterRatingsCtrl.prototype), 'constructor', this).call(this, {
            injector: $injector,
            endpoint: 'materialChapterRatings',
            key: 'chapterId',
            backToState: 'materialDetail',
            params: { materialId: $state.params.materialId }
          });

          this.state = $state;
          this.translateService = translateService;

          //TODO: Fix actions from card
          this.actions = [{
            tooltip: translateService.translate('tooltip.search'),
            action: function action() {
              _this.state.go('materialDetail', _this.state.params);
            },
            icon: 'arrow-left'
          }];
        }

        return MaterialDetailChapterRatingsCtrl;
      })(Saveable);

      _export('default', MaterialDetailChapterRatingsCtrl);
    }
  };
});
//# sourceMappingURL=med.material.detail.chapter.ratings.ctrl.js.map
