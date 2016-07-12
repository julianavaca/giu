System.register('app/home/scripts/controllers/med.rejection.crud.ctrl', ['module-crud-ui/app/scripts/crud.saveable.js'], function (_export) {
  'use strict';

  var Saveable, RejectionCrudCtrl;
  return {
    setters: [function (_moduleCrudUiAppScriptsCrudSaveableJs) {
      Saveable = _moduleCrudUiAppScriptsCrudSaveableJs['default'];
    }],
    execute: function () {
      RejectionCrudCtrl = (function (_Saveable) {
        RejectionCrudCtrl.$inject = ["$injector", "api", "$state", "$window", "timeCalculatorService", "segmentService", "translateService"];
        babelHelpers.inherits(RejectionCrudCtrl, _Saveable);

        /*@ngInject*/

        function RejectionCrudCtrl($injector, api, $state, $window, timeCalculatorService, segmentService, translateService) {
          var _this = this;

          babelHelpers.classCallCheck(this, RejectionCrudCtrl);

          babelHelpers.get(Object.getPrototypeOf(RejectionCrudCtrl.prototype), 'constructor', this).call(this, {
            injector: $injector,
            endpoint: 'mediaRejections',
            backToState: 'searchResults.detail',
            key: '',
            successTitle: 'generic.edit.alert.success.title',
            successMessage: 'generic.edit.alert.success.message',
            successCreateMessage: 'generic.edit.alert.create.success.message',
            successEditMessage: 'generic.edit.alert.success.message',
            errorTitle: 'generic.edit.alert.error',
            params: { 'id': $state.params.id },
            entityDependencies: [{ api: 'technicalsState', loading: 'isLoadingTechnicalsState', model: 'etces' }, { api: 'rejectionTypes', loading: 'isLoadingRejectionTypes', model: 'types' }
            //{api: 'technicalQualities', loading: 'isLoadingTechnicalQualities', model: 'qualities'},
            ]
          });
          this.api = api;
          this.state = $state;
          this.window = $window;
          this.timeCalculatorService = timeCalculatorService;
          this.translateService = translateService;
          this.segmentService = segmentService;
          this.get();
          this.translateService = translateService;
          this.action = [{
            tooltip: this.translateService.translate('tooltip.create'),
            icon: 'plus',
            action: function action() {
              _this.addEntryRow();
            },
            show: { value: true }
          }];
        }

        babelHelpers.createClass(RejectionCrudCtrl, [{
          key: '_initEdit',
          value: function _initEdit() {
            var self = this;
            this.entity.items.forEach(function (rejection) {
              self.getQualities(rejection);
            });
          }
        }, {
          key: 'calculateLength',
          value: function calculateLength(tcin, tcout, frame, obj, length) {
            if (tcin !== undefined && tcout !== undefined) {
              obj[length] = this.segmentService.framesToTimecode(this.segmentService.timecodeToFrame(tcout, frame) - this.segmentService.timecodeToFrame(tcin, frame), frame);
            }
          }
        }, {
          key: 'checkRanges',
          value: function checkRanges(tcin, tcout, maxFrames, obj, validation) {
            if (tcin !== undefined && tcout !== undefined) {
              if (this.segmentService.timecodeToFrame(tcin, maxFrames) < this.segmentService.timecodeToFrame(tcout, maxFrames)) {
                obj[validation] = true;
                return true;
              } else {
                obj[validation] = false;
                return false;
              }
            }
          }
        }, {
          key: 'findQuality',
          value: function findQuality(quality) {
            quality.severity = this.qualities.find(function (elem) {
              return elem.id == quality.id;
            }).severity;
          }
        }, {
          key: 'getQualities',
          value: function getQualities(rejection) {
            var _this2 = this;

            var response = undefined;
            if (rejection.quality.type !== undefined) {
              response = this.api.technicalQualities.get({ 'typeId': rejection.quality.type.id });

              response.$promise.then(function (response) {
                rejection.qualities = response.content;
              }, function (error) {
                _this2.isLoading = false;
              });
            }
          }
        }, {
          key: 'timeSqueezeBind',
          value: function timeSqueezeBind(rejection) {
            rejection.tCIn = rejection.tCIn !== undefined ? this.segmentService.objectToString(rejection.tCIn) : undefined;
            rejection.length = rejection.length !== undefined ? this.segmentService.objectToString(rejection.length) : undefined;
            rejection.tCOut = rejection.tCOut !== undefined ? this.segmentService.objectToString(rejection.tCOut) : undefined;
            rejection.isValidtCIntcOut = true;
            rejection.isValidFrameIn = true;
            rejection.isValidMin = true;
            rejection.isValidtcOuttCIn = true;
            rejection.isValidFrameOut = true;
            rejection.isValidMax = true;
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
              if (!resource.quality.id || !resource.tCIn || !resource.tCOut || !resource.length || !resource.comments || !resource.isValidtCIntcOut || !resource.isValidFrameIn || !resource.isValidMin || !resource.isValidtcOuttCIn || !resource.isValidFrameOut || !resource.isValidMax) {
                return false;
              }
            }
            this.save(form);
          }
        }, {
          key: 'save',
          value: function save(form) {
            var _this3 = this;

            //Si tiene error no hace el submit
            if (form.$valid) {
              var promise = undefined;

              /* global angular */
              var rejections = angular.copy(this.entity);
              var segmentService = this.segmentService;

              rejections.items.forEach(function (entry) {
                entry.tCIn = segmentService.stringToObject(entry.tCIn);
                entry.tCOut = segmentService.stringToObject(entry.tCOut);
                entry.length = segmentService.stringToObject(entry.length);
                entry.isValidtCIntcOut = undefined;
                entry.isValidFrameIn = undefined;
                entry.isValidMin = undefined;
                entry.isValidtcOuttCIn = undefined;
                entry.isValidFrameOut = undefined;
                entry.isValidMax = undefined;
                entry.qualities = undefined;
              });

              if (this._isNew()) {
                //POST

                //Al ser un POST no necesita construir todos los parametros de la url solo necesita los parametros
                //si es un recurso anidado. En este caso estan en params
                //ej: /media/:id/materilas - id esta en parmas
                promise = this.api[this.endpoint].save(this.params, rejections).$promise;
              } else {
                //PUT

                //Al ser un PUT necesita como parametros el id de la entidad o los ids de todas las entidades de la url
                //por eso se piden los pathParams. Lo arma la clase Able con colaboracion de addParams
                //ej: /media/:id/materials/:materialId - _getPathParams() devuelve {id:xx, materialId:xx}
                //es la union de la key y los params
                promise = rejections.$update(this._getPathParams());
              }
              promise.then(function (response) {
                _this3.$log.info('then', response);

                _this3.$log.info('back to state', _this3.backToState.state, _this3.backToState.params);

                _this3.alertService.success({
                  title: _this3.translate(_this3.successTitle),
                  message: _this3._isNew() ? _this3.translate(_this3.successCreateMessage) : _this3.translate(_this3.successEditMessage)
                });
                _this3.$state.go(_this3.backToState.state, _this3.backToState.params);
              }, function (err) {

                if (err.status === 422) {
                  err.data.forEach(function (data) {
                    form[data.field].$error = { backendError: true };
                    form[data.field].backenMessage = data.message;
                  });
                } else {

                  _this3.alertService.error({
                    title: _this3.translate(_this3.errorTitle),
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
          key: 'addEntryRow',
          value: function addEntryRow() {
            if (!this.entity.isLoading && this.entity.items) {
              var params = {};
              this.entity.items.push(params);
            }
          }
        }, {
          key: 'areFramesValid',
          value: function areFramesValid(tCIn, frames, obj, validation) {
            if (this.segmentService.areFramesValid(tCIn, frames)) {
              obj[validation] = true;
              return true;
            } else {
              obj[validation] = false;
              return false;
            }
          }
        }, {
          key: 'goToBackState',
          value: function goToBackState() {
            this.window.history.back();
          }

          // Overraideamos el isNew porque nuestro id no será numérico como se espera por defecto
        }, {
          key: '_isNew',
          value: function _isNew() {
            return false;
          }
        }]);
        return RejectionCrudCtrl;
      })(Saveable);

      _export('default', RejectionCrudCtrl);
    }
  };
});
//# sourceMappingURL=med.rejection.crud.ctrl.js.map
