System.register('app/home/scripts/services/med.new.media.srv', [], function (_export) {
  'use strict';

  var NewMediaService;
  return {
    setters: [],
    execute: function () {
      NewMediaService = (function () {

        /*@ngInject*/

        NewMediaService.$inject = ["alertService", "$log", "$window"];
        function NewMediaService(alertService, $log, $window) {
          babelHelpers.classCallCheck(this, NewMediaService);

          this.alertService = alertService;
          this.$log = $log;
          this.invalidMedia = true;
          this.invalidMaterial = true;
          this.invalidPlusDetail = true;
          this.invalidSegment = true;
          this.window = $window;
          this.EDIT = {};
          this.tabsCtrl = [];
        }

        babelHelpers.createClass(NewMediaService, [{
          key: 'getTab',
          value: function getTab(index) {
            return this.activeTab[index];
          }
        }, {
          key: 'createTabSelection',
          value: function createTabSelection(numberOfTabs) {
            this.activeTab = [];
            this.activeTab[0] = true;

            for (var i = 1; i < numberOfTabs; i++) {
              this.activeTab[i] = false;
            }
            this.tabsCtrl = [];
          }
        }, {
          key: 'nextStep',
          value: function nextStep() {

            var selectedTab = this._getActiveTab();

            if (selectedTab + 1 == this.activeTab.length) {
              this.lastTab = true;
            } else {

              for (var i = 0; i < this.activeTab.length; i++) {
                this.activeTab[i] = false;
              }
              this.activeTab[selectedTab + 1] = true;
              this.lastTab = false;
            }
          }
        }, {
          key: 'updateTabIndex',
          value: function updateTabIndex(index) {
            for (var i = 0; i < this.activeTab.length; i++) {
              this.activeTab[i] = false;
            }

            this.activeTab[index] = true;

            if (index + 1 == this.activeTab.length) {
              this.lastTab = true;
            } else {
              this.lastTab = false;
            }

            this.tabsCtrl[index]._onTabLoad();
          }
        }, {
          key: '_getActiveTab',
          value: function _getActiveTab() {

            var activeTab;

            for (var i = 0; i < this.activeTab.length; i++) {
              if (this.activeTab[i]) {
                activeTab = i;
              }
            }
            return activeTab;
          }
        }, {
          key: 'goToBackState',
          value: function goToBackState() {
            this.model = {};
            if (this.mediaId) {
              this.mediaId = undefined;
            }
            this.window.history.back();
          }
        }, {
          key: 'getModel',
          value: function getModel() {
            return this.model;
          }
        }, {
          key: 'getFromModel',
          value: function getFromModel(key) {
            return this.model[key];
          }
        }, {
          key: 'setToModel',
          value: function setToModel(key, value) {
            this.model[key] = value;
          }
        }, {
          key: 'cleanService',
          value: function cleanService() {
            this.mediaId = undefined;
            this.model = {};
            this.invalidMaterial = true;
            this.invalidPlusDetail = true;
            this.invalidSegment = true;
          }
        }]);
        return NewMediaService;
      })();

      _export('default', NewMediaService);
    }
  };
});
//# sourceMappingURL=med.new.media.srv.js.map
