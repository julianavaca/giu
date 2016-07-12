System.register('app/home/scripts/controllers/med.media.edit.ctrl', ['module-crud-ui/app/scripts/crud.saveable.js'], function (_export) {
    'use strict';

    var Saveable, MediaEditCtrl;
    return {
        setters: [function (_moduleCrudUiAppScriptsCrudSaveableJs) {
            Saveable = _moduleCrudUiAppScriptsCrudSaveableJs['default'];
        }],
        execute: function () {
            MediaEditCtrl = (function (_Saveable) {
                MediaEditCtrl.$inject = ["$injector", "api", "$state"];
                babelHelpers.inherits(MediaEditCtrl, _Saveable);

                /*@ngInject*/

                function MediaEditCtrl($injector, api, $state) {
                    babelHelpers.classCallCheck(this, MediaEditCtrl);

                    babelHelpers.get(Object.getPrototypeOf(MediaEditCtrl.prototype), 'constructor', this).call(this, {
                        injector: $injector,
                        endpoint: 'mediaMaterials',
                        backToState: {
                            state: $state.params.backToState.state,
                            params: $state.params.backToState.params
                        },
                        key: 'id',
                        successTitle: 'media.edit.alert.success.title',
                        successMessage: 'media.edit.alert.success.message',
                        successCreateMessage: 'media.edit.alert.create.success.message',
                        successEditMessage: 'media.edit.alert.success.message',
                        errorTitle: 'media.edit.alert.error',
                        entityDependencies: []
                    });
                    this.api = api;
                    this.state = $state;
                    this.networkData = this.getDetailData('networkResource', {});
                    this.mediaDetail = this.getDetailData('mediaMaterials', { 'detailCid': this.state.params.id });
                }

                babelHelpers.createClass(MediaEditCtrl, [{
                    key: '_initCreate',
                    value: function _initCreate() {
                        this.entity.media = { network: {}, state: {} };
                    }
                }, {
                    key: 'getDetailData',
                    value: function getDetailData(endpoint, params) {
                        var _this = this;

                        this.isLoading = true;
                        this.response = this.api[endpoint].get(params);

                        this.response.$promise.then(function () {

                            _this.isLoading = false;
                        }, function () {
                            return _this.isLoading = false;
                        });

                        return this.response;
                    }
                }, {
                    key: 'goToBackState',
                    value: function goToBackState() {
                        // Le pasamos a la pantalla anterior el id de media-material
                        this.state.params.id = this.state.params.mediaMaterialId;
                        this.$state.go(this.backToState, this.state.params);
                    }

                    // Overraideamos el isNew porque nuestro id no será numérico como se espera por defecto
                }, {
                    key: '_isNew',
                    value: function _isNew() {
                        var id = this.$state.params[this.key];
                        return !id;
                    }
                }]);
                return MediaEditCtrl;
            })(Saveable);

            _export('default', MediaEditCtrl);
        }
    };
});
//# sourceMappingURL=med.media.edit.ctrl.js.map
