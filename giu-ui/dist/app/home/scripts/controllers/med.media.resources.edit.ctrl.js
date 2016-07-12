System.register('app/home/scripts/controllers/med.media.resources.edit.ctrl', ['module-crud-ui/app/scripts/crud.saveable.js'], function (_export) {
  'use strict';

  var Saveable, MediaEditCtrl;
  return {
    setters: [function (_moduleCrudUiAppScriptsCrudSaveableJs) {
      Saveable = _moduleCrudUiAppScriptsCrudSaveableJs['default'];
    }],
    execute: function () {
      MediaEditCtrl = (function (_Saveable) {
        MediaEditCtrl.$inject = ["$injector", "api", "$state", "$window", "translateService"];
        babelHelpers.inherits(MediaEditCtrl, _Saveable);

        /*@ngInject*/

        function MediaEditCtrl($injector, api, $state, $window, translateService) {
          var _this = this;

          babelHelpers.classCallCheck(this, MediaEditCtrl);

          babelHelpers.get(Object.getPrototypeOf(MediaEditCtrl.prototype), 'constructor', this).call(this, {
            injector: $injector,
            executeGet: false,
            endpoint: '',
            backToState: 'searchResults.detail',
            key: '',
            successTitle: 'generic.edit.alert.success.title',
            successMessage: 'generic.edit.alert.success.message',
            successCreateMessage: 'generic.edit.alert.create.success.message',
            successEditMessage: 'generic.edit.alert.success.message',
            errorTitle: 'generic.edit.alert.error',
            params: { 'id': $state.params.id }
          });
          this.api = api;
          this.state = $state;
          this.window = $window;
          this.getResourcesFromApiCall();
          this.endpoint = this.getResourceEndpoint();

          this.collapsibleIds = {
            mediaMaterialsAudios: 'searchResultsDetailAudiosCtrl',
            mediaMaterialsSubtitles: 'searchResultsDetailSubtitleCtrl',
            mediaMaterialsGraphics: 'searchResultsDetailGraphicCtrl'
          };

          this.collapsibleId = this._getCollapsibleId();

          this.translateService = translateService;
          this.audit = {};
          this.action = [{
            tooltip: this.translateService.translate('tooltip.create'),
            icon: 'plus',
            action: function action() {
              _this.addEntryRow();
            },
            show: { value: true },
            disabled: false
          }];

          this.get().$promise.then(function (response) {
            if (response.items.length == 0) {
              _this.addEntryRow();
            }
            _this.audit = {
              enabled: response && response.audit,
              isRemote: false,
              entity: { audit: response.audit }
            };
          });
        }

        babelHelpers.createClass(MediaEditCtrl, [{
          key: 'getAudit',
          value: function getAudit() {
            if (!this.entity.audit) {
              return false;
            }
            return this.audit;
          }
        }, {
          key: '_getCollapsibleId',
          value: function _getCollapsibleId() {
            return this.collapsibleIds[this.endpoint];
          }
        }, {
          key: '_addParams',
          value: function _addParams() {
            return {};
          }

          // Este es un caso atipico de salvable, no hay casos de nuevos registros
        }, {
          key: '_isNew',
          value: function _isNew() {
            return false;
          }
        }, {
          key: '_initCreate',
          value: function _initCreate() {
            this.entity.media = { network: {}, state: {} };
          }

          // TODO: Sobreescribo el método de save para que pueda volver al estado anterior enviando parámetros, pero lo ideal sería modificar Salvable para permitir esto
        }, {
          key: 'save',
          value: function save(form) {
            var _this2 = this;

            if (form.$valid) {
              var promise = undefined;
              this.isLoading = true;
              if (this._isNew()) {
                //POST
                promise = this.api[this.endpoint].save(this.params, this.entity).$promise;
              } else {
                //PUT
                promise = this.entity.$update(this._getPathParams());
              }
              promise.then(function (response) {
                _this2.isLoading = false;
                _this2.$log.info('then', response);
                _this2.$log.info('back to state', _this2.backToState);
                _this2.alertService.success({
                  title: _this2.translate(_this2.successTitle),
                  message: _this2._isNew() ? _this2.translate(_this2.successCreateMessage) : _this2.translate(_this2.successEditMessage)
                });
                //TODO: arreglar esto poniendo un backToState con los parametros correctos
                _this2.goToBackState();
              }, function (err) {
                if (err.status === 422) {
                  err.data.forEach(function (data) {
                    form[data.field].$error = { backendError: true };
                    form[data.field].backenMessage = data.message;
                  });
                } else {

                  _this2.alertService.error({
                    title: _this2.translate(_this2.errorTitle),
                    message: err.data.message

                  });
                }
              });
              return promise;
            } else {
              this.$log.info('form invalid');
              return undefined;
            }
          }
        }, {
          key: 'goToBackState',
          value: function goToBackState() {
            this.window.history.back();
          }

          // Indica si el recurso editado actualemente es el buscado
        }, {
          key: 'isResourceType',
          value: function isResourceType(type) {
            return type == this.state.params.resourceType;
          }
        }, {
          key: 'isAudioResource',
          value: function isAudioResource() {
            return this.isResourceType("audio");
          }
        }, {
          key: 'isSubtitleResource',
          value: function isSubtitleResource() {
            return this.isResourceType("subtitle");
          }
        }, {
          key: 'isGraphResource',
          value: function isGraphResource() {
            return this.isResourceType("graph");
          }

          // Devuelve el endpoint correcto para este recurso
        }, {
          key: 'getResourceEndpoint',
          value: function getResourceEndpoint() {
            if (this.isAudioResource()) return 'mediaMaterialsAudios';
            if (this.isSubtitleResource()) return 'mediaMaterialsSubtitles';
            if (this.isGraphResource()) return 'mediaMaterialsGraphics';
          }
        }, {
          key: 'getDetailData',
          value: function getDetailData(endpoint) {
            var _this3 = this;

            this.response = this.api[endpoint].get();
            this.response.isLoading = true;

            this.response.$promise.then(function () {
              _this3.response.isLoading = false;
            }, function () {
              return _this3.response.isLoading = false;
            });

            return this.response;
          }
        }, {
          key: 'deleteEntry',
          value: function deleteEntry(entry) {
            // Primero borramos el registro pedido
            var index = this.entity.items.indexOf(entry);
            if (index > -1) {
              this.entity.items.splice(index, 1);
            }
            // Si es un audio, ajustamos los demas ids para ocupar el hueco del borrado
            if (this.isAudioResource()) {
              for (var i = 0; i < this.entity.items.length; i++) {
                var currentId = this.entity.items[i].id;
                if (currentId > entry.id) {
                  this.entity.items[i].id = currentId - 1;
                }
              }
            }
          }
        }, {
          key: 'validateAndSave',
          value: function validateAndSave(form) {
            // Validamos que todos los campos esten completos
            for (var i = 0; i < this.entity.items.length; i++) {
              var resource = this.entity.items[i];
              if (!resource.content || !resource.type || !resource.language) {
                return false;
              }
            }
            this.save(form);
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
          key: 'addEntryRow',
          value: function addEntryRow() {
            if (!this.entity.isLoading && this.entity.items) {
              var params = {};
              if (this.isAudioResource()) {
                params.id = this.getIdForNewEntry();
                params.original = null;
              }
              this.entity.items.push(params);
            }
          }
        }, {
          key: 'getResourcesFromApiCall',
          value: function getResourcesFromApiCall() {
            if (this.isAudioResource()) {
              this.contents = this.getDetailData('audioContents');
              this.types = this.getDetailData('audioTypes');
              this.languages = this.getDetailData('languages');
            }
            if (this.isSubtitleResource()) {
              this.contents = this.getDetailData('subtitleContents');
              this.types = this.getDetailData('subtitleTypes');
              this.languages = this.getDetailData('languages');
            }
            if (this.isGraphResource()) {
              this.contents = this.getDetailData('graphicContents');
              this.languages = this.getDetailData('languages');
              this.types = this.getDetailData('graphicTypes');
            }
          }
        }, {
          key: 'areResourcesLoading',
          value: function areResourcesLoading() {
            return this.isLoading || !this.entity.items || this.contents && this.contents.isLoading || this.types && this.types.isLoading || this.languages && this.languages.isLoading;
          }
        }]);
        return MediaEditCtrl;
      })(Saveable);

      _export('default', MediaEditCtrl);
    }
  };
});
//# sourceMappingURL=med.media.resources.edit.ctrl.js.map
