System.register('app/home/scripts/controllers/med.search.results.tabs.ctrl', ['module-crud-ui/app/scripts/crud.selectable.js'], function (_export) {
  'use strict';

  var Selectable, SearchResultsTabsCtrl;
  return {
    setters: [function (_moduleCrudUiAppScriptsCrudSelectableJs) {
      Selectable = _moduleCrudUiAppScriptsCrudSelectableJs['default'];
    }],
    execute: function () {
      SearchResultsTabsCtrl = (function (_Selectable) {
        SearchResultsTabsCtrl.$inject = ["api", "$state", "alertService", "$filter"];
        babelHelpers.inherits(SearchResultsTabsCtrl, _Selectable);

        /*@ngInject*/

        function SearchResultsTabsCtrl(api, $state, alertService, $filter) {
          babelHelpers.classCallCheck(this, SearchResultsTabsCtrl);

          babelHelpers.get(Object.getPrototypeOf(SearchResultsTabsCtrl.prototype), 'constructor', this).call(this, { itemKey: 'id', enabled: true });
          this.api = api;
          this.state = $state;
          this.alertService = alertService;

          this.translate = $filter.translate;
          this.segments = this.getDetailData('mediaSegments');
          this.hotStart = this.getDetailData('mediaHotStart');
          this.ratings = this.getDetailData('mediaRatings');
          this.rejections = this.getDetailData('mediaRejections');
          this.rejectionSelComment = false;

          this.relMedias = {
            origin: 'FIB1-TX-1092364',
            root: 'FIB1-TX-1092365'
          };

          this.sot = {
            totalNumber: 3,
            partNumber: 2,
            setOfTapes: [285, 286, 287]
          };
        }

        babelHelpers.createClass(SearchResultsTabsCtrl, [{
          key: 'getPathParams',
          value: function getPathParams() {
            return { 'detailCid': this.state.params.id };
          }
        }, {
          key: 'saveEtc',
          value: function saveEtc(form) {
            var _this = this;

            if (form.$valid) {
              var promise = undefined;
              this.isLoading = true;
              promise = this.api.etc.save(this.params, this.entity).$promise;

              promise.then(function (response) {
                _this.isLoading = false;

                _this.alertService.success({
                  title: _this.translate("results.tabs.rejections.submit.success.title"),
                  message: _this.translate("results.tabs.rejections.submit.success.message")
                });
              }, function (err) {
                _this.alertService.error({
                  title: _this.translate("results.tabs.rejections.submit.error"),
                  message: err.data.message

                });
              });
              return promise;
            } else {
              this.$log.info('form invalid');
              return undefined;
            }
          }
        }, {
          key: 'getDetailData',
          value: function getDetailData(endpoint) {
            this.response = this.api[endpoint].get(this.getPathParams());
            this.response.isLoading = true;
            var objectData = this.response;

            this.response.$promise.then(function () {

              objectData.isLoading = false;
              objectData.valid = true;
            }, function (error) {
              // Si nos devuelve un 404, no queremos que se muestre el recurso, pero tampoco que nos tire error
              if (error.status == 404) {
                objectData.valid = false;
                objectData.isLoading = false;
              }
            });
            return this.response;
          }
        }, {
          key: 'allTabsHasBeenLoaded',
          value: function allTabsHasBeenLoaded() {
            return this.segments && !this.segments.isLoading && this.hotStart && !this.hotStart.isLoading && this.ratings && !this.ratings.isLoading && this.rejections && !this.rejections.isLoading;
          }
        }, {
          key: 'isParamValid',
          value: function isParamValid(param) {
            return param !== undefined && param !== null;
          }
        }, {
          key: 'setSelectableForRejections',
          value: function setSelectableForRejections() {
            this.collection = this.rejections.content;
          }
        }, {
          key: 'selectRejection',
          value: function selectRejection() {
            return { 'detailCid': this.state.params.id };
          }
        }, {
          key: 'onSegmentsEdit',
          value: function onSegmentsEdit() {
            this.state.go('segmentsEdit', { 'detailCid': this.state.params.id });
          }
        }, {
          key: 'rowClick',
          value: function rowClick(row) {
            row.selected = !row.selected;
            this.change(row);
          }
        }, {
          key: 'isSegmentIngested',
          value: function isSegmentIngested(lowResStatusActive) {
            var items = this.segments.items;
            if (items && items.length > 0) {
              var lastSegment = items[items.length - 1];
              var lowResStatus = lastSegment.lowResStatus == 'Y';
              return lastSegment.isIngested && (lowResStatusActive && lowResStatus || !lowResStatusActive && !lowResStatus);
            }
            return false;
          }
        }, {
          key: 'checkRejectionClick',
          value: function checkRejectionClick($event, row) {
            row.selected = !row.selected;
            $event.preventDefault();
          }
        }, {
          key: 'isHotstartEnabledRed',
          value: function isHotstartEnabledRed() {
            return this.isSegmentIngested(false);
          }
        }, {
          key: 'isHotstartEnabledGreen',
          value: function isHotstartEnabledGreen() {
            return this.isSegmentIngested(true);
          }
        }, {
          key: 'isHotstartEnabledOriginalColor',
          value: function isHotstartEnabledOriginalColor() {
            return !this.isHotstartEnabledRed() && !this.isHotstartEnabledGreen();
          }
        }]);
        return SearchResultsTabsCtrl;
      })(Selectable);

      _export('default', SearchResultsTabsCtrl);
    }
  };
});
//# sourceMappingURL=med.search.results.tabs.ctrl.js.map
