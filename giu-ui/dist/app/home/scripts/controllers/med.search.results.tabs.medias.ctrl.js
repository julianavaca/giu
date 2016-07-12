System.register('app/home/scripts/controllers/med.search.results.tabs.medias.ctrl', ['module-crud-ui/app/scripts/crud.saveable.js'], function (_export) {
  /* global $ */

  'use strict';

  var Saveable, SearchResultsTabsMediasCtrl;
  return {
    setters: [function (_moduleCrudUiAppScriptsCrudSaveableJs) {
      Saveable = _moduleCrudUiAppScriptsCrudSaveableJs['default'];
    }],
    execute: function () {
      SearchResultsTabsMediasCtrl = (function (_Saveable) {
        SearchResultsTabsMediasCtrl.$inject = ["$injector", "api", "$state", "translateService"];
        babelHelpers.inherits(SearchResultsTabsMediasCtrl, _Saveable);

        /*@ngInject*/

        function SearchResultsTabsMediasCtrl($injector, api, $state, translateService) {
          babelHelpers.classCallCheck(this, SearchResultsTabsMediasCtrl);

          babelHelpers.get(Object.getPrototypeOf(SearchResultsTabsMediasCtrl.prototype), 'constructor', this).call(this, {
            injector: $injector,
            endpoint: 'relMedias',
            backToState: ".",
            key: 'id',
            successTitle: 'media.edit.alert.success.title',
            successMessage: 'media.edit.alert.success.message',
            successCreateMessage: 'media.edit.alert.create.success.message',
            successEditMessage: 'common.alert.edit.success.title',
            errorTitle: 'media.edit.alert.error'
          });
          this.api = api;
          this.state = $state;
          this.translateService = translateService;
          this._load();
        }

        babelHelpers.createClass(SearchResultsTabsMediasCtrl, [{
          key: '_load',
          value: function _load() {
            var _this = this;

            if (!this.state.params.id) {
              return false;
            }
            this.isNotVirtualSegment = { value: false };
            this.actions = [{
              tooltip: this.translateService.translate('tooltip.edit'),
              icon: 'edit',
              action: function action() {
                _this.relMediaEdit = true;_this.isNotVirtualSegment.value = !_this.isNotVirtualSegment.value;
              },
              show: this.isNotVirtualSegment
            }];

            this.get().$promise.then(function (response) {
              console.log(response);
              _this.isNotVirtualSegment.value = !response.isVirtualSegment && response.isMediaMaterialEnabled;
            });
          }
        }, {
          key: 'runDirective',
          value: function runDirective(binding) {
            $('.lov-search-container').detach().appendTo('body');
            this[binding] = true;
          }
        }, {
          key: 'saveAndClose',
          value: function saveAndClose(form) {
            var _this2 = this;

            if (this.entity.originMedia) {
              delete this.entity.originMedia.selected;
            }
            if (this.entity.rootMedia) {
              delete this.entity.rootMedia.selected;
            }
            this.save(form).then(function () {
              _this2.relMediaEdit = false;
              _this2.isNotVirtualSegment = { value: true };
              _this2._load();
            });
          }
        }, {
          key: 'goToChildMedia',
          value: function goToChildMedia(child) {
            if (child.number && child.format && child.type) {
              var childParams = {
                mediaFormat: child.format,
                mediaType: child.type,
                mediaId: child.number
              };
              this.state.go('searchResults', childParams);
            }
          }
        }, {
          key: 'cancelRelMedias',
          value: function cancelRelMedias() {
            this.relMediaEdit = false;
            this.isNotVirtualSegment.value = true;
            this._load();
          }
        }]);
        return SearchResultsTabsMediasCtrl;
      })(Saveable);

      _export('default', SearchResultsTabsMediasCtrl);
    }
  };
});
//# sourceMappingURL=med.search.results.tabs.medias.ctrl.js.map
