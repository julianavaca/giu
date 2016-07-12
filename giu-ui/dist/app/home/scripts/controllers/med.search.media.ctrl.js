System.register("app/home/scripts/controllers/med.search.media.ctrl", [], function (_export) {
  /**
   * Created by julian on 16/02/16.
   */
  "use strict";

  var SearchMediaCtrl;
  return {
    setters: [],
    execute: function () {
      SearchMediaCtrl = (function () {

        //TODO: esto no está usando correctamente el módulo CRUD, modificar para que sea así
        /*@ngInject*/

        SearchMediaCtrl.$inject = ["$state", "api", "alertService", "translateService"];
        function SearchMediaCtrl($state, api, alertService, translateService) {
          babelHelpers.classCallCheck(this, SearchMediaCtrl);

          this.state = $state;
          this.api = api;
          this.alertService = alertService;
          this.translateService = translateService;
          this.disable = true;

          // Intentamos completar los campos si tenemos la info
          this.entity = {};
          this.disableField();
          this.isValidDate = true;
          this.isValidRange = true;
          this._init();
        }

        babelHelpers.createClass(SearchMediaCtrl, [{
          key: "checkDateValidity",
          value: function checkDateValidity(from, to) {
            if (from != undefined && to != undefined && from.getTime() > to.getTime()) {
              this.isValidDate = false;
              return false;
            } else {
              this.isValidDate = true;
              return true;
            }
          }
        }, {
          key: "updateFeeds",
          value: function updateFeeds(that, item) {
            if (that.entity.network && item) {
              if (that.entity.network.id === item.id) {
                return;
              }
            }
            that.entity.feed = null;
            if (!item) {
              that.feeds = that.originalFeeds;
              that.paramFeed = {};
              return;
            } else {
              that.paramFeed = { networkId: item.id };
            }
          }
        }, {
          key: "checkChapterValidity",
          value: function checkChapterValidity(from, to) {
            if (parseInt(from) > parseInt(to)) {
              this.isValidRange = false;
              return false;
            } else {
              this.isValidRange = true;
              return true;
            }
          }
        }, {
          key: "_init",
          value: function _init() {
            var _this = this;

            this.getDetailData('feeds').$promise.then(function (response) {
              _this.originalFeeds = response.content;
              _this.feeds = angular.copy(_this.originalFeeds);
            });
          }
        }, {
          key: "getParamValue",
          value: function getParamValue(paramName) {
            return this.state.params[paramName];
          }
        }, {
          key: "isFormCompleted",
          value: function isFormCompleted() {
            var valid = false;
            for (var data in this.entity) {
              if (this.entity[data] !== undefined && this.entity[data] != "" && this.entity[data] != null) {
                valid = true;
              }
            }
            return valid && this.entity && Object.getOwnPropertyNames(this.entity).length > 0;
          }
        }, {
          key: "makeSearch",
          value: function makeSearch() {
            var self = this;
            if (this.isFormCompleted() && this.isValidDate && this.isValidRange) {
              if (this.entity.createdBy) {
                this.entity.createdBy = this.entity.createdBy.username;
              }
              if (this.entity.mediaFormat) {
                this.entity.mediaFormat = this.entity.mediaFormat.id;
              }
              if (this.entity.mediaType) {
                this.entity.mediaType = this.entity.mediaType.id;
              }
              if (this.entity.network) {
                this.entity.network = this.entity.network.id;
              }
              if (this.entity.feed) {
                this.entity.feed = this.entity.feed.id;
              }
              if (this.entity.materialType) {
                this.entity.materialType = this.entity.materialType.id;
              }
              this._goTo('searchResults');
            } else {
              this.alertService.error({
                title: self.filter('translate')('generic.edit.alert.error'),
                message: self.filter('translate')('generic.med.search.alert.error.message')
              });
            }
          }
        }, {
          key: "_goTo",
          value: function _goTo() {
            this._parseDates();
            this.state.go('searchResults', this.entity);
          }
        }, {
          key: "_parseDates",
          value: function _parseDates() {
            this.entity.createdOnTo = this._parseDate(this.entity.createdOnTo);
            this.entity.createdOnFrom = this._parseDate(this.entity.createdOnFrom);
          }
        }, {
          key: "_parseDate",
          value: function _parseDate(date) {
            if (typeof date !== 'undefined') {
              return date.toISOString();
            }
            return undefined;
          }
        }, {
          key: "clearForm",
          value: function clearForm() {
            this.entity = {};
            this.entity.createdBy = null;
            this.entity.mediaFormat = null;
            this.entity.mediaType = null;
            this.entity.network = null;
            this.entity.feed = null;
            this.entity.materialType = null;
          }
        }, {
          key: "getDetailData",
          value: function getDetailData(endpoint, params) {
            var _this2 = this;

            this.isLoading = true;
            this.response = this.api[endpoint].get(params);

            this.response.$promise.then(function () {

              _this2.isLoading = false;
            }, function () {
              return _this2.isLoading = false;
            });

            return this.response;
          }
        }, {
          key: "disableField",
          value: function disableField() {
            if (this.entity.materialId === undefined || this.entity.materialId == '') {
              this.disable = true;
            } else {
              this.disable = false;
            }
          }
        }, {
          key: "expressionCreateBy",
          value: function expressionCreateBy(item) {
            return item.username;
          }
        }, {
          key: "conditionCreateBy",
          value: function conditionCreateBy(item, query) {
            return item.username.indexOf(query.toUpperCase()) > -1;
          }
        }, {
          key: "expression",
          value: function expression(item) {
            return item.id + ' - ' + item.description;
          }
        }, {
          key: "condition",
          value: function condition(item, query) {
            if (query == null) {
              query = "";
            }
            return item.id.indexOf(query.toUpperCase()) > -1 || item.description.indexOf(query.toUpperCase()) > -1;
          }
        }, {
          key: "updateChapterTo",
          value: function updateChapterTo() {
            if (this.entity.fromChapter) {
              this.entity.toChapter = this.entity.fromChapter;
            }
          }
        }]);
        return SearchMediaCtrl;
      })();

      _export("default", SearchMediaCtrl);
    }
  };
});
//# sourceMappingURL=med.search.media.ctrl.js.map
