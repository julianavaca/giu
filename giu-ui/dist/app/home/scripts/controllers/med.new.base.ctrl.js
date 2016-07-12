System.register('app/home/scripts/controllers/med.new.base.ctrl', [], function (_export) {
  'use strict';

  var NewBaseCtrl;
  return {
    setters: [],
    execute: function () {
      NewBaseCtrl = (function () {

        /*@ngInject*/

        NewBaseCtrl.$inject = ["api", "$state", "$window", "newMediaService", "authorityService"];
        function NewBaseCtrl(api, $state, $window, newMediaService, authorityService) {
          var _this = this;

          babelHelpers.classCallCheck(this, NewBaseCtrl);

          this.api = api;
          this.state = $state;
          this.window = $window;
          this.authorityService = authorityService;
          this.numberOfTabs = 9;
          this.newMediaService = newMediaService;
          this.newMediaService.cleanService();
          this.newMediaService.createTabSelection(this.numberOfTabs);

          var mediaId = this.state.params.currentId;
          if (mediaId) {
            this.newMediaService.invalidMedia = false;
            this.api['medias'].get({ 'currentId': mediaId }).$promise.then(function (response) {
              _this.newMediaService.setToModel('media', response);
            });
            this.nextStep();
          }
          this.getAcces();
        }

        babelHelpers.createClass(NewBaseCtrl, [{
          key: 'getTab',
          value: function getTab(index) {
            return this.newMediaService.getTab(index);
          }
        }, {
          key: 'nextStep',
          value: function nextStep() {
            this.newMediaService.nextStep();
          }
        }, {
          key: 'updateTabIndex',
          value: function updateTabIndex(index) {
            this.newMediaService.updateTabIndex(index);
          }
        }, {
          key: 'goToBackState',
          value: function goToBackState() {
            this.window.history.back();
          }
        }, {
          key: 'invalidMedia',
          value: function invalidMedia() {
            return this.newMediaService.invalidMedia;
          }
        }, {
          key: 'invalidMaterial',
          value: function invalidMaterial() {
            return this.newMediaService.invalidMaterial;
          }
        }, {
          key: 'invalidPlusDetail',
          value: function invalidPlusDetail() {
            return this.newMediaService.invalidPlusDetail;
          }
        }, {
          key: 'invalidSegment',
          value: function invalidSegment() {
            return this.newMediaService.invalidSegment;
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
        }]);
        return NewBaseCtrl;
      })();

      _export('default', NewBaseCtrl);
    }
  };
});
//# sourceMappingURL=med.new.base.ctrl.js.map
