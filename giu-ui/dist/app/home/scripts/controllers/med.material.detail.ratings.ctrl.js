System.register('app/home/scripts/controllers/med.material.detail.ratings.ctrl', ['module-crud-ui/app/scripts/crud.saveable.js', 'module-crud-ui/app/scripts/crud.pageable.js'], function (_export) {
  /* global angular */

  'use strict';

  var Saveable, Pageable, MaterialDetailRatingsCtrl;
  return {
    setters: [function (_moduleCrudUiAppScriptsCrudSaveableJs) {
      Saveable = _moduleCrudUiAppScriptsCrudSaveableJs['default'];
    }, function (_moduleCrudUiAppScriptsCrudPageableJs) {
      Pageable = _moduleCrudUiAppScriptsCrudPageableJs['default'];
    }],
    execute: function () {
      MaterialDetailRatingsCtrl = (function (_Saveable) {
        MaterialDetailRatingsCtrl.$inject = ["$state", "translateService", "$injector"];
        babelHelpers.inherits(MaterialDetailRatingsCtrl, _Saveable);

        /*@ngInject*/

        function MaterialDetailRatingsCtrl($state, translateService, $injector) {
          var _this = this;

          babelHelpers.classCallCheck(this, MaterialDetailRatingsCtrl);

          babelHelpers.get(Object.getPrototypeOf(MaterialDetailRatingsCtrl.prototype), 'constructor', this).call(this, {
            injector: $injector,
            endpoint: 'materialRatings',
            key: 'materialId',
            backToState: 'materialDetail'
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

        return MaterialDetailRatingsCtrl;
      })(Saveable);

      _export('default', MaterialDetailRatingsCtrl);
    }
  };
});
//# sourceMappingURL=med.material.detail.ratings.ctrl.js.map
