System.register('app/home/scripts/controllers/med.search.results.ctrl', ['module-crud-ui/app/scripts/crud.pageable.js', 'module-crud-ui/app/scripts/crud.optional.js', 'module-crud-ui/app/scripts/crud.saveable.js'], function (_export) {

  /* global angular */

  'use strict';

  var Pageable, optional, Saveable, SearchResultsCtrl;
  return {
    setters: [function (_moduleCrudUiAppScriptsCrudPageableJs) {
      Pageable = _moduleCrudUiAppScriptsCrudPageableJs['default'];
    }, function (_moduleCrudUiAppScriptsCrudOptionalJs) {
      optional = _moduleCrudUiAppScriptsCrudOptionalJs.optional;
    }, function (_moduleCrudUiAppScriptsCrudSaveableJs) {
      Saveable = _moduleCrudUiAppScriptsCrudSaveableJs['default'];
    }],
    execute: function () {
      SearchResultsCtrl = (function (_Pageable) {
        SearchResultsCtrl.$inject = ["$injector", "$state", "$filter", "alertService", "$mdDialog", "translateService", "api", "$scope", "authorityService"];
        babelHelpers.inherits(SearchResultsCtrl, _Pageable);

        /*@ngInject*/

        function SearchResultsCtrl($injector, $state, $filter, alertService, $mdDialog, translateService, api, $scope, authorityService) {
          var _this = this;

          babelHelpers.classCallCheck(this, SearchResultsCtrl);

          babelHelpers.get(Object.getPrototypeOf(SearchResultsCtrl.prototype), 'constructor', this).call(this, {
            injector: $injector,
            endpoint: 'mediaMaterialsList',
            selectable: {
              itemKey: 'cid',
              enabled: true,
              params: $state.params
            },
            executeGet: false
          });
          this.translateService = translateService;
          this.mdDialog = $mdDialog;
          this.api = api;
          this.filter = $filter;
          this.alert = alertService;
          this.state = $state;
          this.authorityService = authorityService;
          this.scope = $scope;
          this.desactivate = { 'value': false };
          this.activate = { 'value': false };
          this.showCreate = { 'value': false };
          this.getAcces();
          this.selectFirstElement();
          this.materialTitles = new Saveable({
            injector: $injector,
            executeGet: false,
            endpoint: 'materialTitles',
            backToState: ".",
            key: 'materialId',
            params: {}
          });
          this.chapterTitles = new Saveable({
            injector: $injector,
            executeGet: false,
            endpoint: 'chapterTitles',
            backToState: ".",
            key: 'chapterId',
            params: {}
          });
          this.backParams = {};
          angular.copy(this.state.params, this.backParams);
          this.backParams.searchTab = 1;
          this.actions = [{
            enabled: true,
            tooltip: this.filter('translate')('tooltip.search'),
            action: function action() {
              _this.state.go('search', _this.backParams);
            },
            icon: 'arrow-left'
          }, {
            roles: 'MMMU',
            enabled: true,
            tooltip: this.filter('translate')('tooltip.create'),
            action: function action() {
              _this.state.go('newMedia', { 'currentId': _this.state.params.currentId });
            },
            icon: 'plus',
            show: this.showCreate
          }];
          this.contextMenu = [{
            roles: 'MMMC',
            label: this.translateService.translate('results.alert.deactivate.label'),
            action: function action() {
              _this.deactivateMediaMat(_this.page.content[_this.selected]);
            },
            show: this.desactivate
          }, {
            roles: 'MMMC',
            label: this.translateService.translate('results.alert.activate.label'),
            action: function action() {
              _this.activateMediaMat(_this.page.content[_this.selected]);
            },
            show: this.activate
          }, {
            roles: 'MMMC',
            label: this.translateService.translate('med.copy'),
            action: function action() {
              _this.openCopyMenu();
            },
            show: this.desactivate
          }, {
            roles: 'MMMR',
            label: this.translateService.translate('med.title.translate'),
            action: function action() {
              _this.translateTitleDialog();
            },
            show: this.desactivate
          }, {
            roles: 'MMMR',
            label: this.translateService.translate('med.chapter.title.translate'),
            action: function action() {
              _this.translateChapterTitleDialog();
            },
            show: this.desactivate
          }];

          this.search = {
            enabled: true,
            param: { chapterId: this.state.params.chapterId },
            paramName: 'chapterId',
            placeholder: this.filter('translate')('results.material.search.placeholder'),
            submit: function submit() {
              _this.get();
            },
            close: function close() {
              _this.removeSpecificParamsAndResetPage(['chapterId']).get();
            }
          };
          this.params = this.search.param;
          this._observe();
        }

        babelHelpers.createClass(SearchResultsCtrl, [{
          key: 'initEdit',
          value: function initEdit() {
            this.state.params.chapterId = this.page.content[this.selected].chapter.id;
          }
        }, {
          key: 'getAcces',
          value: function getAcces() {
            var _this2 = this;

            var roles = ['MMRR'];
            this.allowed = false;
            this.authorityService.getUser().then(function () {
              _this2.allowed = _this2.authorityService.containsAll(roles);
            });
          }

          //************************** feature-copy **************************
        }, {
          key: 'setParamsToCopy',
          value: function setParamsToCopy() {
            this.state.params.idtarget = this.copyTarget;
            this.entity = { "mediaMaterial": {
                "id": this.copyOrigin
              },
              "hasSegments": this.copySegment
            };
          }
        }, {
          key: 'buildMessage',
          value: function buildMessage(response) {

            if (response.hasAudios) {
              this.message = this.message + 'Audios ';
            }
            if (response.hasGraphics) {
              this.message = this.message + 'Graphics ';
            }
            if (response.hasSubtitles) {
              this.message = this.message + 'Subtitles ';
            }
            if (response.hasRejections) {
              this.message = this.message + 'Rejections ';
            }
            if (this.copySegment) {
              if (response.hasSegments) {
                this.message = this.message + 'Segments Hotstart ';
                if (response.hasSqueezeCredits) {
                  this.message = this.message + 'Squeeze Credits ';
                }
              }
              if (response.hasRatings) {
                this.message = this.message + 'Ratings ';
              }
            }

            if (response.hasAudios || response.hasGraphics || response.hasSubtitles || response.hasRejections || this.copySegment && (response.hasSegments || response.hasRatings)) {
              this.message = "If you continues, you'll overwrite data of " + this.message;
            } else {
              this.message = "If you continues, you'll write data of Audios, Graphics, Subtitles, Rejections";
              if (this.copySegment) {
                this.message = this.message + ', Segments, Hotstart, Squeeze Credits and Ratings';
              }
            }
          }
        }, {
          key: 'openCopyMenu',
          value: function openCopyMenu(ev) {
            var self = this;
            self.copyOrigin = self.page.content[self.selected].id;

            this.mdDialog.show({
              controller: function controller($scope, $mdDialog) {
                $scope.vm = self;
              },
              templateUrl: 'home/views/med.copy.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            });
          }
        }, {
          key: 'submit',
          value: function submit($event) {
            var _this3 = this;

            var self = this;
            this.setParamsToCopy();

            this.api.copyMediaMaterialsCurrent.get(this.state.params).$promise.then(function (response) {

              _this3.message = "";
              _this3.buildMessage(response);
              _this3.alert.dismissable({
                title: _this3.filter('translate')('med.copy.alert.dismissable.title'),
                message: _this3.message
              }, function () {
                _this3.copyMediaMaterial();
              });
            }, function (err) {
              _this3.cancelCopy();
            });

            this.closeCopy();
            $event.preventDefault();
          }
        }, {
          key: 'copyMediaMaterial',
          value: function copyMediaMaterial() {
            var _this4 = this;

            this.api.copyMediaMaterials.save(this.state.params, this.entity).$promise.then(function () {
              _this4.alert.success({
                title: _this4.filter('translate')('med.copy.post.alert.success.title'),
                message: _this4.filter('translate')('med.copy.post.alert.success.message')
              });
              _this4.state.go(_this4.state.current, {}, { reload: true });
            }, function (err) {
              _this4.alert.error({
                title: _this4.filter('translate')('med.copy.post.alert.error.title'),
                message: _this4.filter('translate')('med.copy.post.alert.error.message')
              });
            });
          }
        }, {
          key: 'cancelCopy',
          value: function cancelCopy() {
            this.alert.error({
              title: this.filter('translate')('med.copy.post.alert.error.title'),
              message: this.filter('translate')('med.copy.post.alert.error.message.cancel')
            });
          }
        }, {
          key: 'closeCopy',
          value: function closeCopy() {
            this.mdDialog.hide();
          }

          //************************** end-feature-copy **************************
        }, {
          key: '_observe',
          value: function _observe() {
            var _this5 = this;

            this.scope.$watch(function () {
              return _this5.page.content;
            }, function (newValue) {
              if (newValue) {
                _this5.selectedChange(_this5.findMediaMateria(_this5.page.content));
              }
            });
          }
        }, {
          key: 'selectFirstElement',
          value: function selectFirstElement() {
            var _this6 = this;

            this.get().$promise.then(function (response) {
              _this6.selected = _this6.findMediaMateria(response.content);
              _this6._goDetail();
            });
          }
        }, {
          key: 'findMediaMateria',
          value: function findMediaMateria(collection) {
            var _this7 = this;

            var indx = collection.findIndex(function (it) {
              return it.id == _this7.state.params.id;
            });
            if (indx > -1) {
              return indx;
            }
            return 0;
          }
        }, {
          key: 'selectedChange',
          value: function selectedChange(index) {
            this.selected = index;
            this._goDetail();
          }
        }, {
          key: '_goDetail',
          value: function _goDetail() {
            var params = {
              id: undefined,
              currentId: undefined,
              mediaMaterialListPage: 0,
              mediaMaterialListMax: 0
            };
            if (this.page.content.length > 0) {
              this.selectedObj = this.page.content[this.selected];
              params.id = this.page.content[this.selected].id;
              params.currentId = this.page.content[this.selected].media.id;
              params.mediaMaterialListMax = this.page.size;
              params.mediaMaterialListpage = this.page.number;
              this.desactivate.value = this.page.content[this.selected].isEnable || false;
              this.activate.value = !this.page.content[this.selected].isEnable && this.page.content[this.selected].media.status.type != 'A' || false;
              this.showCreate.value = this.page.content[this.selected].media.status.type == 'V';
              this.warning = !this.page.content[this.selected].material;
            } else {
              this.warning = false;
            }
            this.state.go('searchResults.detail', params);
          }
        }, {
          key: 'deactivateMediaMat',
          value: function deactivateMediaMat(mediaMat) {
            var _this8 = this;

            var self = this;
            this.alert.warning({
              title: this.filter('translate')('results.alert.deactivate.title'),
              message: this.filter('translate')('results.alert.deactivate.message')
            }, function () {
              var paramsAux = {
                id: _this8.page.content[_this8.selected].id
              };
              var entityAux = {
                isEnable: false
              };
              _this8.api.mediaMaterials.update(paramsAux, entityAux).$promise.then(function () {
                _this8.alert.success({
                  title: _this8.filter('translate')('results.alert.deactivate.success.title'),
                  message: _this8.filter('translate')('results.alert.deactivate.success.message')
                });
                self.get().$promise.then(function () {
                  self._selectContextMenu0();
                });
              });
            });
          }
        }, {
          key: 'activateMediaMat',
          value: function activateMediaMat(mediaMat) {
            var _this9 = this;

            var self = this;
            this.alert.warning({
              title: this.filter('translate')('results.alert.activate.title'),
              message: this.filter('translate')('results.alert.activate.message')
            }, function () {
              var paramsAux = {
                id: _this9.page.content[_this9.selected].id
              };
              var entityAux = {
                isEnable: true
              };

              _this9.api.mediaMaterials.update(paramsAux, entityAux).$promise.then(function () {
                _this9.alert.success({
                  title: _this9.filter('translate')('results.alert.activate.success.title'),
                  message: _this9.filter('translate')('results.alert.activate.success.message')
                });
                self.get().$promise.then(function () {
                  self._selectContextMenu0();
                });
              });
            });
          }
        }, {
          key: 'get',
          value: function get() {
            var _this10 = this;

            var promise = babelHelpers.get(Object.getPrototypeOf(SearchResultsCtrl.prototype), 'get', this).call(this);
            var hasMedias = this.hasMedias;
            promise.$promise.then(function (response) {
              _this10.warning = hasMedias(response.content);
            });
            return promise;
          }
        }, {
          key: 'hasMedias',
          value: function hasMedias(materials) {
            return materials.every(function (elem) {
              return elem.id !== undefined && elem.id !== null;
            });
          }

          //TODO: partofgame...

          /* Translate Title Dialog */
        }, {
          key: 'translateTitleDialog',
          value: function translateTitleDialog() {
            var _this11 = this;

            if (this.state.params.id) {
              (function () {
                var self = _this11;

                _this11.materialTitles.$state.params.materialId = _this11.page.content[_this11.selected].material.id;
                _this11.materialTitles.params.materialId = _this11.page.content[_this11.selected].material.id;

                _this11.materialTitles.get();

                var ttDialog = _this11.mdDialog.alert({
                  controller: function controller($scope, $mdDialog) {
                    $scope.vm = self;
                  },
                  templateUrl: 'home/views/med.translate.title.html',
                  parent: angular.element(document.body),
                  clickOutsideToClose: true
                });

                _this11.mdDialog.show(ttDialog);
              })();
            }
          }
        }, {
          key: 'selectTranslation',
          value: function selectTranslation(newTitleValue) {
            this.page.content[this.selected].material.title = newTitleValue;
            this.mdDialog.hide();
          }

          /* Translate Chapter Title Dialog */
        }, {
          key: 'translateChapterTitleDialog',
          value: function translateChapterTitleDialog() {
            var _this12 = this;

            if (this.state.params.id) {
              (function () {
                var self = _this12;

                _this12.chapterTitles.$state.params.materialId = _this12.page.content[_this12.selected].material.id;
                _this12.chapterTitles.$state.params.chapterId = _this12.page.content[_this12.selected].material.chapter.id;

                _this12.chapterTitles.params.materialId = _this12.page.content[_this12.selected].material.id;
                _this12.chapterTitles.params.chapterId = _this12.page.content[_this12.selected].material.chapter.id;

                _this12.chapterTitles.get();
                var ttDialog = _this12.mdDialog.alert({
                  controller: function controller($scope, $mdDialog) {
                    $scope.vm = self;
                  },
                  templateUrl: 'home/views/med.translate.chapter.title.html',
                  parent: angular.element(document.body),
                  clickOutsideToClose: true
                });
                _this12.mdDialog.show(ttDialog);
              })();
            }
          }
        }, {
          key: 'selectChapterTranslation',
          value: function selectChapterTranslation(newTitleValue) {
            this.page.content[this.selected].material.chapter.title = newTitleValue;
            this.mdDialog.hide();
          }
        }, {
          key: 'addMaterial',
          value: function addMaterial() {
            this.state.go('newMedia', { 'currentId': this.state.params.currentId });
          }
        }, {
          key: '_selectContextMenu0',
          value: function _selectContextMenu0() {
            this.state.go(this.state.current, {}, { reload: true });
          }
        }]);
        return SearchResultsCtrl;
      })(Pageable);

      _export('default', SearchResultsCtrl);
    }
  };
});
//# sourceMappingURL=med.search.results.ctrl.js.map
