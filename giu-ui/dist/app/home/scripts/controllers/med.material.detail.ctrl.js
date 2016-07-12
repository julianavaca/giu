System.register('app/home/scripts/controllers/med.material.detail.ctrl', ['module-crud-ui/app/scripts/crud.saveable.js', 'module-crud-ui/app/scripts/crud.pageable.js'], function (_export) {
  /* global angular */

  'use strict';

  var Saveable, Pageable, MaterialDetailCtrl;
  return {
    setters: [function (_moduleCrudUiAppScriptsCrudSaveableJs) {
      Saveable = _moduleCrudUiAppScriptsCrudSaveableJs['default'];
    }, function (_moduleCrudUiAppScriptsCrudPageableJs) {
      Pageable = _moduleCrudUiAppScriptsCrudPageableJs['default'];
    }],
    execute: function () {
      MaterialDetailCtrl = (function (_Saveable) {
        MaterialDetailCtrl.$inject = ["$state", "translateService", "$injector", "$scope"];
        babelHelpers.inherits(MaterialDetailCtrl, _Saveable);

        /*@ngInject*/

        function MaterialDetailCtrl($state, translateService, $injector, $scope) {
          var _this = this;

          babelHelpers.classCallCheck(this, MaterialDetailCtrl);

          babelHelpers.get(Object.getPrototypeOf(MaterialDetailCtrl.prototype), 'constructor', this).call(this, {
            injector: $injector,
            endpoint: 'materials',
            key: 'materialId',
            backToState: 'searchResults'
          });
          this.state = $state;
          this.translateService = translateService;
          this.scope = $scope;
          //TODO: Fix actions from card
          this.actions = [{
            tooltip: translateService.translate('tooltip.search'),
            action: function action() {
              _this.state.go('searchResults', _this.state.params);
            },
            icon: 'arrow-left'
          }];
          this.contextMenu = [{
            label: this.translateService.translate('med.materials.details.materialRatings'),
            action: function action() {
              console.log(_this.state.params);
              _this.state.go('materialDetailRatings', _this.state.params, { reload: true });
            }
          }];
          this.materialTitles = new Saveable({
            injector: $injector,
            endpoint: 'materialTitles',
            backToState: ".",
            key: 'materialId',
            params: {}
          });

          this.feeds = new Saveable({
            injector: $injector,
            endpoint: 'materialFeeds',
            backToState: ".",
            key: 'materialId',
            params: {}
          });
          this.networks = new Saveable({
            injector: $injector,
            endpoint: 'materialNetworks',
            backToState: ".",
            key: 'materialId',
            params: {}
          });
          this.chapters = new Pageable({
            injector: $injector,
            endpoint: 'chapters',
            backToState: ".",
            executeGet: false,
            params: { materialId: this.$state.params.materialId },
            selectable: {
              itemKey: 'id',
              enabled: true,
              params: {}
            }
          });
          this.chapters.contextMenu = [{
            label: this.translateService.translate('med.materials.details.chapterRatings'),
            action: function action() {
              _this.state.go('materialDetailChapterRatings', _this.state.params, { reload: true });
            }
          }];
          this.chapterTitles = new Saveable({
            injector: $injector,
            executeGet: false,
            endpoint: 'chapterTitles',
            backToState: ".",
            key: 'chapterId',
            params: { materialId: this.params.materialId }
          });
          this._load();
        }

        babelHelpers.createClass(MaterialDetailCtrl, [{
          key: '_load',
          value: function _load() {
            var _this2 = this;

            var self = this;
            this.chapters.get().$promise.then(function (response) {
              if (response.content.length > 0) {

                _this2._observe();
              }
            });
          }
        }, {
          key: '_observe',
          value: function _observe() {
            var _this3 = this;

            var self = this;
            this.scope.$watch('vm.chapters.selectable.collection', function (newValue) {
              if (newValue) {
                var chapterIndex = 0;
                if (self.state.params.chapterId) {
                  chapterIndex = _this3.findChapter(newValue);
                }
                self.selectChapter(newValue[chapterIndex]);
              }
            });
          }
        }, {
          key: 'findChapter',
          value: function findChapter(collection) {
            var self = this;
            var indx = collection.findIndex(function (it) {
              return it.id == self.state.params.chapterId;
            });
            if (indx > -1) {
              return indx;
            }
            return 0;
          }
        }, {
          key: 'selectChapter',
          value: function selectChapter(chapter) {
            chapter.selected = true;
            this.chapters.selectable.change(chapter);
            this.$state.params.chapterId = chapter.id;
            this.$state.params.chapterspage = this.chapters.page.number;
            this.$state.params.chaptersmax = this.chapters.page.size;
            this.$state.params.materialId = this.entity.id;
            this.state.go(this.state.current, this.state.params, { reload: false });
            this.getChapterTitles();
            this.selectedObj = chapter;
          }
        }, {
          key: 'getChapterTitles',
          value: function getChapterTitles() {
            //this.$state.params.chapterId = chapterId;
            this.chapterTitles.get();
          }
        }, {
          key: 'getEpisodeElement',
          value: function getEpisodeElement(row) {
            return row.episode.elements == 'P' ? 'Episode' : 'Element';
          }
        }]);
        return MaterialDetailCtrl;
      })(Saveable);

      _export('default', MaterialDetailCtrl);
    }
  };
});
//# sourceMappingURL=med.material.detail.ctrl.js.map
