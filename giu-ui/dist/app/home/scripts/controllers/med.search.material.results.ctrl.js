System.register('app/home/scripts/controllers/med.search.material.results.ctrl', ['module-crud-ui/app/scripts/crud.pageable.js'], function (_export) {
  'use strict';

  var Pageable, SearchMaterialResultsCtrl;
  return {
    setters: [function (_moduleCrudUiAppScriptsCrudPageableJs) {
      Pageable = _moduleCrudUiAppScriptsCrudPageableJs['default'];
    }],
    execute: function () {
      SearchMaterialResultsCtrl = (function (_Pageable) {
        SearchMaterialResultsCtrl.$inject = ["$injector", "$state", "translateService"];
        babelHelpers.inherits(SearchMaterialResultsCtrl, _Pageable);

        /*@ngInject*/

        function SearchMaterialResultsCtrl($injector, $state, translateService) {
          var _this = this;

          babelHelpers.classCallCheck(this, SearchMaterialResultsCtrl);

          babelHelpers.get(Object.getPrototypeOf(SearchMaterialResultsCtrl.prototype), 'constructor', this).call(this, {
            injector: $injector,
            endpoint: 'materialmedias',
            selectable: {
              itemKey: 'cid',
              enabled: true,
              params: {}
            }
          });

          this.state = $state;
          this.translateService = translateService;
          this.showContextMenu = { value: false };

          //TODO: Fix actions from card
          this.actions = [{
            tooltip: translateService.translate('tooltip.search'),
            action: function action() {
              _this.state.go('search', _this.state.params);
            },
            icon: 'arrow-left'
          }];
          this.contextMenu = [{
            label: this.translateService.translate('med.materials.details'),
            action: function action() {
              _this.state.go('materialDetail', { 'materialId': _this.page.content[_this.selected].material.id, 'chapterId': _this.page.content[_this.selected].material.chapter.id }, { reload: true });
            },
            show: this.showContextMenu
          }, {
            label: this.translateService.translate('results.detail.material.programming'),
            action: function action() {
              _this.goDailyprogramming();
            },
            show: this.showContextMenu
          }];

          this.search = {
            enabled: true,
            param: { chapterId: this.state.params.chapterId },
            paramName: 'chapterId',
            placeholder: this.translateService.translate('results.material.search.placeholder'),
            submit: function submit() {
              _this.get();
            },
            close: function close() {
              _this.removeSpecificParamsAndResetPage(['chapterId']).get();
            }
          };

          this.params = this.search.param;
        }

        babelHelpers.createClass(SearchMaterialResultsCtrl, [{
          key: 'selectedChange',
          value: function selectedChange(index, item) {
            this.itemSelected = item;
            this.selected = index;
            if (this.itemSelected != undefined) {
              this.showContextMenu.value = true;
            } else {
              this.showContextMenu.value = false;
            }
          }
        }, {
          key: 'goDailyprogramming',
          value: function goDailyprogramming() {
            if (!this.itemSelected) {
              return false;
            }
            var params = {
              materialId: this.itemSelected.material.id,
              chapterId: this.itemSelected.chapter.id
            };
            this.state.go('materialProgramming', params);
          }
        }]);
        return SearchMaterialResultsCtrl;
      })(Pageable);

      _export('default', SearchMaterialResultsCtrl);
    }
  };
});
//# sourceMappingURL=med.search.material.results.ctrl.js.map
