System.register('app/home/scripts/controllers/med.search.results.tabs.ratings.ctrl', ['module-crud-ui/app/scripts/crud.saveable.js'], function (_export) {
  /* global angular, console */

  'use strict';

  var Saveable, SearchResultsTabsRatingsCtrl;
  return {
    setters: [function (_moduleCrudUiAppScriptsCrudSaveableJs) {
      Saveable = _moduleCrudUiAppScriptsCrudSaveableJs['default'];
    }],
    execute: function () {
      SearchResultsTabsRatingsCtrl = (function (_Saveable) {
        SearchResultsTabsRatingsCtrl.$inject = ["$injector", "api", "$state", "translateService", "$filter"];
        babelHelpers.inherits(SearchResultsTabsRatingsCtrl, _Saveable);

        /*@ngInject*/

        function SearchResultsTabsRatingsCtrl($injector, api, $state, translateService, $filter) {
          babelHelpers.classCallCheck(this, SearchResultsTabsRatingsCtrl);

          babelHelpers.get(Object.getPrototypeOf(SearchResultsTabsRatingsCtrl.prototype), 'constructor', this).call(this, {
            injector: $injector,
            endpoint: 'mediaRatings',
            backToState: ".",
            key: 'id',
            successTitle: 'media.edit.alert.success.title',
            successMessage: 'media.edit.alert.success.message',
            successCreateMessage: 'media.edit.alert.create.success.message',
            successEditMessage: 'common.alert.edit.success.title',
            errorTitle: 'media.edit.alert.error',
            executeGet: false,
            params: $state.params
          });
          this.api = api;
          this.state = $state;
          this.filter = $filter;
          this.translateService = translateService;
          if (this.state.params.id) {
            this._load();
          }
        }

        babelHelpers.createClass(SearchResultsTabsRatingsCtrl, [{
          key: 'expressionCountryZone',
          value: function expressionCountryZone(item) {
            return item.id + ' - ' + item.description;
          }
        }, {
          key: 'expression',
          value: function expression(item) {
            return item.id;
          }
        }, {
          key: 'condition',
          value: function condition(item, query) {
            if (query === null) {
              query = "";
            }
            return item.id.indexOf(query.toUpperCase()) > -1 || item.description.indexOf(query.toUpperCase()) > -1;
          }
        }, {
          key: 'createParams',
          value: function createParams(rating) {
            if (rating.country) {
              rating.paramClasification = {
                'ratingDetails': rating.country.id,
                'type': 'C' };
              rating.paramGenre = {
                'ratingDetails': rating.country.id,
                'type': 'G' };
              rating.paramDisclaimer = {
                'ratingDetails': rating.country.id,
                'type': 'D' };
              if (!rating.markOfNew) {
                if (rating.originCountry === undefined) {
                  rating.originCountryNull = true;
                }
                if (rating.edited === undefined) {
                  rating.editedNull = true;
                }
                if (rating.provisory === undefined) {
                  rating.provisoryNull = true;
                }
              }
            }
          }
        }, {
          key: 'changeCountry',
          value: function changeCountry(rating, item) {
            if (rating.country && item) {
              if (rating.country.id === item.id) {
                return;
              }
            }
            rating.clasification = null;
            rating.genre = null;
            rating.disclaimer = [];
            rating.plainDisclaimer = undefined;

            if (!item) {
              return;
            }
            if (!rating.paramClasification && !rating.paramGenre && !rating.paramDisclaimer) {
              rating.paramClasification = {
                'ratingDetails': item.id,
                'type': 'C' };
              rating.paramGenre = {
                'ratingDetails': item.id,
                'type': 'G' };
              rating.paramDisclaimer = {
                'ratingDetails': item.id,
                'type': 'D' };
              return;
            }
            rating.paramClasification.ratingDetails = item.id;
            rating.paramGenre.ratingDetails = item.id;
            rating.paramDisclaimer.ratingDetails = item.id;
          }
        }, {
          key: 'deleteRating',
          value: function deleteRating(rating) {
            // Primero borramos el registro pedido
            var index = this.entity.items.indexOf(rating);
            if (index > -1) {
              this.entity.items.splice(index, 1);
            }
          }
        }, {
          key: 'createRating',
          value: function createRating() {
            var ratingToInsert = {
              country: undefined,
              clasification: undefined,
              genre: undefined,
              disclaimer: undefined,
              originCountry: undefined,
              edited: undefined,
              provisory: undefined,
              comments: undefined,
              markOfNew: true,
              queryCountries: '',
              queryClasification: '',
              queryGenre: ''
            };
            this.entity.items.push(ratingToInsert);
          }
        }, {
          key: 'setParamsDisclaimer',
          value: function setParamsDisclaimer(rating) {
            this.state.params.ratingDetails = rating.country.id;
            this.state.params.type = 'D';
          }
        }, {
          key: '_load',
          value: function _load() {
            var _this = this;

            this.tabla = [{ label: 'Id', key: 'id' }, { label: 'Description', key: 'description' }];
            this.ratingsEdit = { value: false };
            this.ratingsEditShow = { value: false };
            this.param = { ratingDetails: '' };
            this.audit = {
              enabled: false,
              entity: { audit: '' }
            };
            this.actions = [{
              roles: 'MMMU',
              tooltip: this.translateService.translate('tooltip.edit'),
              icon: 'edit',
              action: function action() {
                _this.ratingsEdit.value = !_this.ratingsEdit.value;
                _this.ratingsEditShow.value = !_this.ratingsEditShow.value;
                _this.oldValue = _this.copy(_this.entity);
              },
              show: this.ratingsEditShow
            }, {
              roles: 'MMMU',
              tooltip: this.translateService.translate('tooltip.create'),
              icon: 'plus',
              action: function action() {
                _this.createRating();
              },
              show: this.ratingsEdit
            }];
            this.get();
          }
        }, {
          key: 'get',
          value: function get() {
            var _this2 = this;

            babelHelpers.get(Object.getPrototypeOf(SearchResultsTabsRatingsCtrl.prototype), 'get', this).call(this).$promise.then(function (response) {
              _this2.ratingsEditShow.value = response.isMediaMaterialEnabled && !response.isVirtualSegment;
              _this2.entity = response;

              _this2.audit.enabled = response && response.audit;
              _this2.audit.entity.audit = response.audit;

              if (_this2.entity.items.length > 0) {
                _this2.entity.items.forEach(function (it) {
                  if (it.originCountry === null) {
                    it.originCountry = undefined;
                  }
                  if (it.edited === null) {
                    it.edited = undefined;
                  }
                  if (it.provisory === null) {
                    it.provisory = undefined;
                  }
                  if (it.disclaimer !== null) {
                    it.plainDisclaimer = it.disclaimer.id;
                    it.disclaimer = it.disclaimer.id.split(',').map(function (mp) {
                      return { id: mp };
                    });
                  } else {
                    it.plainDisclaimer = "";
                  }
                });
              } else {
                _this2.createRating();
              }
            });
          }
        }, {
          key: 'getAudit',
          value: function getAudit() {
            if (!this.entity) {
              return false;
            }
            if (!this.entity.audit) {
              return false;
            }
            return this.audit;
          }
        }, {
          key: 'saveRatings',
          value: function saveRatings(form) {
            var _this3 = this;

            if (this.validateFieldRatings()) {
              this.entity.items.forEach(function (it) {
                if (it.disclaimer) {
                  var id = it.disclaimer.map(function (mp) {
                    return mp.id;
                  }).join();
                  it.disclaimer = { id: id, description: '' };
                }
              });
              this.cleanFieldSelected();
              this.save(form).then(function () {
                return _this3.cancel();
              });
            } else {
              this.alertService.error({
                title: this.translate('ratings.edit.alert.error'),
                message: this.translate('ratings.med.search.result.tabs.ratings.message')
              });
            }
          }
        }, {
          key: 'cleanFieldSelected',
          value: function cleanFieldSelected() {
            this.entity.items.forEach(function (it) {
              delete it.queryCountries;
              delete it.queryClasification;
              delete it.queryGenre;
              delete it.paramClasification;
              delete it.paramGenre;
              delete it.paramDisclaimer;
              delete it.plainDisclaimer;
              delete it.markOfNew;
              delete it.originCountryNull;
              delete it.provisoryNull;
              delete it.editedNull;
              delete it.disclaimers;
              if (!it.disclaimer) {
                it.disclaimer = null;
              } else if (it.disclaimer.id === '') {
                it.disclaimer = null;
              }
            });
          }
        }, {
          key: 'validateFieldRatings',
          value: function validateFieldRatings() {
            var valid = true;
            this.entity.items.forEach(function (it) {
              if (it.country === undefined || it.clasification === undefined || it.country === null || it.clasification === null) {
                valid = false;
              }
            });
            return valid;
          }
        }, {
          key: 'copy',
          value: function copy(value) {
            return angular.copy(value);
          }
        }, {
          key: 'cancel',
          value: function cancel() {
            this.ratingsEdit.value = false;
            this.ratingsEditShow.value = !this.ratingsEditShow.value;
            this.get();
          }
        }]);
        return SearchResultsTabsRatingsCtrl;
      })(Saveable);

      _export('default', SearchResultsTabsRatingsCtrl);
    }
  };
});
//# sourceMappingURL=med.search.results.tabs.ratings.ctrl.js.map
