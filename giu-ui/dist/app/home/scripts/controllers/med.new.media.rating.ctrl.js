System.register('app/home/scripts/controllers/med.new.media.rating.ctrl', ['../med.wizard.tab.js'], function (_export) {
  'use strict';
  var WizardTab, NewMediaRatingCtrl;
  return {
    setters: [function (_medWizardTabJs) {
      WizardTab = _medWizardTabJs['default'];
    }],
    execute: function () {
      NewMediaRatingCtrl = (function (_WizardTab) {
        NewMediaRatingCtrl.$inject = ["$injector", "api", "$state", "translateService", "$filter", "authorityService"];
        babelHelpers.inherits(NewMediaRatingCtrl, _WizardTab);

        /*@ngInject*/

        function NewMediaRatingCtrl($injector, api, $state, translateService, $filter, authorityService) {
          babelHelpers.classCallCheck(this, NewMediaRatingCtrl);

          babelHelpers.get(Object.getPrototypeOf(NewMediaRatingCtrl.prototype), 'constructor', this).call(this, {
            injector: $injector,
            endpoint: 'mediaRatings',
            key: 'id',
            backToState: 'newMedia.summary',
            successTitle: 'media.edit.alert.success.title',
            successMessage: 'media.edit.alert.success.message',
            successCreateMessage: 'media.edit.alert.create.success.message',
            successEditMessage: 'media.edit.alert.success.message',
            errorTitle: 'media.edit.alert.error',
            executeGet: false,
            params: $state.params
          });
          this.api = api;
          this.state = $state;
          this.filter = $filter;
          this.authorityService = authorityService;
          this.translateService = translateService;
          this.entity = { items: [] };
          this._load();
          //this.autoEdit();
        }

        babelHelpers.createClass(NewMediaRatingCtrl, [{
          key: 'autoEdit',
          value: function autoEdit() {
            this.createRating();
          }
        }, {
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
            if (query == null) {
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
            rating.clasification = undefined;
            rating.genre = undefined;
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
            this.ratingsEditShow = { value: true };
            this.param = { ratingDetails: '' };
            this.actions = [{
              roles: 'MMMU,MMRR',
              tooltip: this.translateService.translate('tooltip.create'),
              icon: 'plus',
              action: function action() {
                _this.createRating();
              },
              show: { value: true }
            }];
          }
        }, {
          key: 'saveRatings',
          value: function saveRatings(form, nextStep) {
            var _this2 = this;

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
              if (nextStep) {
                this.saveAndNextStepWithCallback(form, function () {
                  _this2.get();
                });
              } else {
                this.saveAndExit(form);
              }
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
            if (!this.entity.items) {
              return true;
            }
            this.entity.items.forEach(function (it) {
              if (it.country === undefined || it.clasification === undefined || it.country === null || it.clasification === null) {
                valid = false;
              }
            });
            return valid;
          }
        }, {
          key: 'get',
          value: function get() {
            var _this3 = this;

            babelHelpers.get(Object.getPrototypeOf(NewMediaRatingCtrl.prototype), 'get', this).call(this).$promise.then(function (response) {
              _this3.entity = response;
              if (_this3.entity.items.length > 0) {
                _this3.entity.items.forEach(function (it) {
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
                  }
                });
              }
            });
          }
        }]);
        return NewMediaRatingCtrl;
      })(WizardTab);

      _export('default', NewMediaRatingCtrl);
    }
  };
});
//# sourceMappingURL=med.new.media.rating.ctrl.js.map
