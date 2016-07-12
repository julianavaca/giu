System.register('app/home/scripts/controllers/med.search.results.detail.ctrl', ['module-crud-ui/app/scripts/crud.saveable.js'], function (_export) {
  /* global angular */

  'use strict';
  var Saveable, SearchResultsDetailCtrl;
  return {
    setters: [function (_moduleCrudUiAppScriptsCrudSaveableJs) {
      Saveable = _moduleCrudUiAppScriptsCrudSaveableJs['default'];
    }],
    execute: function () {
      SearchResultsDetailCtrl = (function (_Saveable) {
        SearchResultsDetailCtrl.$inject = ["$injector", "$state", "translateService", "alertService", "$filter", "$mdDialog"];
        babelHelpers.inherits(SearchResultsDetailCtrl, _Saveable);

        /*@ngInject*/

        function SearchResultsDetailCtrl($injector, $state, translateService, alertService, $filter, $mdDialog) {
          babelHelpers.classCallCheck(this, SearchResultsDetailCtrl);

          babelHelpers.get(Object.getPrototypeOf(SearchResultsDetailCtrl.prototype), 'constructor', this).call(this, {
            injector: $injector,
            endpoint: 'mediaMaterials',
            key: 'id',
            backToState: '.',
            successTitle: 'media.edit.alert.success.title',
            successMessage: 'media.edit.alert.success.message',
            successCreateMessage: 'media.edit.alert.create.success.message',
            successEditMessage: 'media.edit.alert.success.message',
            errorTitle: 'media.edit.alert.error',
            executeGet: false,
            params: $state.params,
            entityDependenciesExecuteGet: false,
            entityDependencies: [{ api: 'photoTypes', loading: 'isLoading', model: 'phototypes' }, { api: 'videoStandards', loading: 'isLoading', model: 'videostandards' }, { api: 'aspectsRatio', loading: 'isLoading', model: 'aspectsratio', params: { 'id': $state.params.id } }, { api: 'technicalsState', loading: 'isLoading', model: 'technicalStatusList' }, { api: 'editors', loading: 'isLoading', model: 'editedByList' }]
          });

          this.alertService = alertService;
          this.filter = $filter;
          this.state = $state;
          this.translateService = translateService;
          this.mdDialog = $mdDialog;
          this.materialEditShow = { value: false };
          this.isVirtualSegment = true;
          this._load();
        }

        babelHelpers.createClass(SearchResultsDetailCtrl, [{
          key: '_load',
          value: function _load() {
            var _this = this;

            if (!this.state.params.id) {
              return;
            }
            this._getResource();
            this.audit = {
              enabled: this.mediaDetail && this.mediaDetail.audit,
              isRemote: false,
              entity: this.entity
            };
            this.actions = [{
              roles: 'MEDR,MMMR,MMMU,MVER,MPTR',
              tooltip: this.translateService.translate('tooltip.edit'),
              icon: 'edit',
              action: function action() {
                _this.editMaterial();
              },
              show: this.materialEditShow
            }];
            this.contextMenu = [{
              label: this.translateService.translate('med.materials.details'),
              action: function action() {
                _this.state.go('materialDetail', {
                  'materialId': _this.entity.material.id,
                  chapterId: _this.entity.material.chapter.id
                }, { reload: true });
              }
            }, {
              label: this.translateService.translate('results.detail.material.programming'),
              action: function action() {
                _this.goDailyprogramming();
              }
            }];
            this.collapsible = {
              isEnabled: true,
              isCollapsed: false,
              id: 'searchResultsDetailMaterialCtrl'
            };
          }
        }, {
          key: '_getResource',
          value: function _getResource() {
            var _this2 = this;

            this.isLoading = true;
            this.get().$promise.then(function (response) {
              _this2.isVirtualSegment = response.isVirtualSegment;
              _this2.materialEditShow.value = response.isEnable;
              _this2.audit.enabled = response && response.audit; //this.mediaDetail && this.mediaDetail.audit;
              _this2.isLoading = false;
              _this2._getEntityDependencies();
            }, function () {
              _this2.isLoading = false;
            });
          }
        }, {
          key: '_getEntityDependencies',
          value: function _getEntityDependencies() {
            var self = this;
            this.entityDependencies.forEach(function (it) {
              self.api[it.api].get(it.params).$promise.then(function (response) {
                self[it.model] = response.content;
                if (it.api === 'technicalsState') {
                  self.etcAnnulled = self.searchAnnulled(response.content, self.entity.technicalState);
                }
                if (it.api === 'aspectsRatio' && self.entity.aspectRatio !== null) {
                  self.aspectRatioAnnulled = self.searchAnnulled(response.content, self.entity.aspectRatio);
                }
              });
            });
          }
        }, {
          key: 'searchAnnulled',
          value: function searchAnnulled(activeList, currentObj) {
            var annulled = activeList.find(function (tsl) {
              return tsl.id === currentObj.id;
            });
            if (!annulled) {
              return angular.copy(currentObj);
            }
            return undefined;
          }
        }, {
          key: 'save',
          value: function save(form) {
            var _this3 = this;

            this.validate(form);
            this.selectStateValueEtc();
            if (this.entity.parentMedia) {
              delete this.entity.parentMedia.selected;
              if (this.entity.parentMedia.id == "") {
                this.entity.parentMedia = null;
              }
            }
            this.isLoading = true;
            var promise = babelHelpers.get(Object.getPrototypeOf(SearchResultsDetailCtrl.prototype), 'save', this).call(this, form);
            if (promise !== undefined) {
              promise.then(function () {
                _this3._reload();
              });
            }
          }
        }, {
          key: '_reload',
          value: function _reload() {
            this.state.go(this.state.current, {}, { reload: true });
          }
        }, {
          key: 'validate',
          value: function validate(form) {
            if (!this.entity.aspectRatio && !this.entity.hasAspectRatio) {
              this.entity.aspectRatio = null;
            }
          }
        }, {
          key: 'copy',
          value: function copy(value) {
            return angular.copy(value);
          }
        }, {
          key: 'getItemById',
          value: function getItemById(list, value) {
            return list.filter(function (obj) {
              return obj.id == value;
            });
          }
        }, {
          key: 'goToParentMedia',
          value: function goToParentMedia() {
            if (this.entity.parentMedia.id) {
              var parentParams = {
                mediaFormat: this.entity.parentMedia.format,
                mediaType: this.entity.parentMedia.type,
                mediaId: this.entity.parentMedia.number
              };
              this.state.go('searchResults', parentParams);
            }
          }
        }, {
          key: 'updateTechnicalState',
          value: function updateTechnicalState() {
            var aspectRatioId = this.entity.aspectRatio.id;
            var aspectRatio = this.aspectsratio.find(function (aspectRatio) {
              return aspectRatio.id == aspectRatioId;
            });
            if (!aspectRatio) {
              return false;
            }
            if (aspectRatio.technicalState !== null && aspectRatio.technicalState !== undefined) {
              this.entity.technicalState.id = aspectRatio.technicalState.id;
            }
          }
        }, {
          key: 'goDailyprogramming',
          value: function goDailyprogramming() {
            var params = {
              materialId: this.entity.material.id,
              chapterId: this.entity.material.chapter.id
            };
            this.state.go('materialProgramming', params);
          }
        }, {
          key: 'cancelMaterial',
          value: function cancelMaterial() {
            this.materialEdit = !this.materialEdit;
            this.materialEditShow.value = true;
            this.entity = this.oldValue;
          }
        }, {
          key: 'changeEtc',
          value: function changeEtc(ev) {
            if (this.etcAnnulled) {
              if (this.entity.technicalState.id === this.etcAnnulled.id) {
                this.entity.technicalState.description = this.etcAnnulled.description;
                return false;
              }
            }
            this.entity.technicalState.description = this.getItemById(this.technicalStatusList, this.entity.technicalState.id)[0].description;
            this.openAddNote(ev);
          }
        }, {
          key: 'selectStateValueEtc',
          value: function selectStateValueEtc() {
            this.entity.technicalState.validState = this.getItemById(this.technicalStatusList, this.entity.technicalState.id)[0].validState;
          }
        }, {
          key: 'openAddNote',
          value: function openAddNote(ev) {
            var self = this;
            this.width = 50;
            this.mdDialog.show({
              controller: function controller($scope, $mdDialog) {
                $scope.vm = self;
              },
              templateUrl: 'home/views/med.etc.add.note.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            });
          }
        }, {
          key: 'submit',
          value: function submit($event) {
            this.closeAddNote($event);
          }
        }, {
          key: 'cancelAddNote',
          value: function cancelAddNote($event) {
            this.notes = undefined;
            this.closeAddNote($event);
          }
        }, {
          key: 'closeAddNote',
          value: function closeAddNote($event) {
            this.mdDialog.hide();
            $event.preventDefault();
          }
        }, {
          key: 'editMaterial',
          value: function editMaterial() {
            this.materialEdit = !this.materialEdit;
            this.oldValue = this.copy(this.entity);
            this.materialEditShow.value = !this.materialEditShow.value;
          }
        }, {
          key: 'shouldWarning',
          value: function shouldWarning() {
            var _this4 = this;

            if (!this.aspectsratio) {
              return false;
            }
            if (!this.entity.aspectRatio) {
              return false;
            }

            var aspectRatio = this.aspectsratio.find(function (aspectRatio) {
              return aspectRatio.id == _this4.entity.aspectRatio.id;
            });
            if (!aspectRatio) {
              return false;
            }
            return aspectRatio.technicalState;
          }
        }]);
        return SearchResultsDetailCtrl;
      })(Saveable);

      _export('default', SearchResultsDetailCtrl);
    }
  };
});
//# sourceMappingURL=med.search.results.detail.ctrl.js.map
