System.register('app/home/scripts/controllers/med.new.media.audio.ctrl', ['../med.wizard.tab.js'], function (_export) {
  'use strict';
  var WizardTab, NewMediaAudioCtrl;
  return {
    setters: [function (_medWizardTabJs) {
      WizardTab = _medWizardTabJs['default'];
    }],
    execute: function () {
      NewMediaAudioCtrl = (function (_WizardTab) {
        NewMediaAudioCtrl.$inject = ["$injector", "$state", "translateService"];
        babelHelpers.inherits(NewMediaAudioCtrl, _WizardTab);

        /*@ngInject*/

        function NewMediaAudioCtrl($injector, $state, translateService) {
          var _this = this;

          babelHelpers.classCallCheck(this, NewMediaAudioCtrl);

          babelHelpers.get(Object.getPrototypeOf(NewMediaAudioCtrl.prototype), 'constructor', this).call(this, {
            injector: $injector,
            endpoint: 'mediaMaterialsAudios',
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
            icon: 'copy',
            action: function action() {
              _this.copyEntryRow();
            },
            show: { value: true },
            enabled: { value: true }
          }, {
            tooltip: this.translateService.translate('tooltip.create'),
            icon: 'plus',
            action: function action() {
              _this.addEntryRow();
            },
            show: { value: true },
            enabled: { value: true }
          }];
          this.getResources();
          // this.autoEdit();
        }

        //autoEdit(){
        //    this.addEntryRow();
        //}

        babelHelpers.createClass(NewMediaAudioCtrl, [{
          key: 'copyEntryRow',
          value: function copyEntryRow() {
            var item = {};
            if (this.entity.items !== undefined && this.entity.items.length > 0) {
              angular.copy(this.entity.items[this.entity.items.length - 1], item);
              item.id = this.getIdForNewEntry();
              this.entity.items.push(item);
            } else {
              this.addEntryRow();
            }
          }
        }, {
          key: 'addEntryRow',
          value: function addEntryRow() {
            var item = {};
            if (this.entity.items === undefined) {
              this.entity.items = [];
            }
            item.id = this.getIdForNewEntry();
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

            for (var i = 0; i < this.entity.items.length; i++) {
              var currentId = this.entity.items[i].id;
              if (currentId > entry.id) {
                this.entity.items[i].id = currentId - 1;
              }
            }
          }

          // Calcula el id que debe tomar el nuevo registro
        }, {
          key: 'getIdForNewEntry',
          value: function getIdForNewEntry() {
            var maxId = 0;
            for (var i = 0; i < this.entity.items.length; i++) {
              var currentId = this.entity.items[i].id;
              if (currentId > maxId) {
                maxId = currentId;
              }
            }
            return maxId + 1;
          }
        }, {
          key: 'getResources',
          value: function getResources() {
            this.contents = this.getDetailData('audioContents');
            this.types = this.getDetailData('audioTypes');
            this.languages = this.getDetailData('languages');
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
            var languages = this.languages.content;
            var languagesList = this.entity.items.map(function (it) {
              var lang = languages.find(function (language) {
                return it.language.id == language.id;
              });
              return angular.copy(lang);
            });

            babelHelpers.get(Object.getPrototypeOf(NewMediaAudioCtrl.prototype), 'nextStep', this).call(this);
            materialByMedia.audios = languagesList;
          }
        }]);
        return NewMediaAudioCtrl;
      })(WizardTab);

      _export('default', NewMediaAudioCtrl);
    }
  };
});
//# sourceMappingURL=med.new.media.audio.ctrl.js.map
