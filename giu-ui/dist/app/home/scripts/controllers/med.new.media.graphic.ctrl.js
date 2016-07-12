System.register('app/home/scripts/controllers/med.new.media.graphic.ctrl', ['../med.wizard.tab.js'], function (_export) {
  'use strict';
  var WizardTab, NewMediaGraphicCtrl;
  return {
    setters: [function (_medWizardTabJs) {
      WizardTab = _medWizardTabJs['default'];
    }],
    execute: function () {
      NewMediaGraphicCtrl = (function (_WizardTab) {
        NewMediaGraphicCtrl.$inject = ["$injector", "$state", "translateService"];
        babelHelpers.inherits(NewMediaGraphicCtrl, _WizardTab);

        /*@ngInject*/

        function NewMediaGraphicCtrl($injector, $state, translateService) {
          var _this = this;

          babelHelpers.classCallCheck(this, NewMediaGraphicCtrl);

          babelHelpers.get(Object.getPrototypeOf(NewMediaGraphicCtrl.prototype), 'constructor', this).call(this, {
            injector: $injector,
            endpoint: 'mediaMaterialsGraphics',
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

          this.state = $state;
          this.translateService = translateService;
          this.entity = {};
          this.entity.items = [];
          this.actions = [{
            tooltip: this.translateService.translate('tooltip.create'),
            icon: 'plus',
            action: function action() {
              _this.addEntryRow();
            },
            show: { value: true },
            enabled: { value: true }
          }];
          this.getResources();
          //this.autoEdit();
        }

        babelHelpers.createClass(NewMediaGraphicCtrl, [{
          key: 'autoEdit',
          value: function autoEdit() {
            this.addEntryRow();
          }
        }, {
          key: 'addEntryRow',
          value: function addEntryRow() {
            var item = {};
            if (this.entity.items === undefined) {
              this.entity.items = [];
            }
            this.entity.items.push(item);
          }
        }, {
          key: 'deleteEntry',
          value: function deleteEntry(entry) {
            // Primero borramos el registro pedido
            var index = this.entity.items.indexOf(entry);
            if (index > -1) {
              this.entity.items.splice(index, 1);
            }
          }
        }, {
          key: 'getResources',
          value: function getResources() {
            this.contents = this.getDetailData('graphicContents');
            this.languages = this.getDetailData('languages');
            this.types = this.getDetailData('graphicTypes');
          }
        }, {
          key: 'getDetailData',
          value: function getDetailData(endpoint) {
            var _this2 = this;

            this.response = this.api[endpoint].get();
            this.response.isLoading = true;

            this.response.$promise.then(function () {
              _this2.response.isLoading = false;
            }, function () {
              return _this2.response.isLoading = false;
            });

            return this.response;
          }
        }, {
          key: 'nextStep',
          value: function nextStep() {
            var materialByMedia = this.getFromModel('materialByMedia');
            var contents = this.contents.content;
            var languages = this.languages.content;
            var graphicList = this.entity.items.map(function (item) {
              var graphic = {};
              graphic.language = languages.find(function (language) {
                return item.language.id == language.id;
              });
              graphic.content = contents.find(function (content) {
                return item.content.id == content.id;
              });
              return angular.copy(graphic);
            });

            materialByMedia.graphics = graphicList;

            babelHelpers.get(Object.getPrototypeOf(NewMediaGraphicCtrl.prototype), 'nextStep', this).call(this);
          }
        }]);
        return NewMediaGraphicCtrl;
      })(WizardTab);

      _export('default', NewMediaGraphicCtrl);
    }
  };
});
//# sourceMappingURL=med.new.media.graphic.ctrl.js.map
