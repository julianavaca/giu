System.register('app/home/scripts/controllers/med.new.media.summary.ctrl', ['module-crud-ui/app/scripts/crud.saveable.js'], function (_export) {
  'use strict';
  var Saveable, NewMediaSummaryCtrl;
  return {
    setters: [function (_moduleCrudUiAppScriptsCrudSaveableJs) {
      Saveable = _moduleCrudUiAppScriptsCrudSaveableJs['default'];
    }],
    execute: function () {
      NewMediaSummaryCtrl = (function (_Saveable) {
        NewMediaSummaryCtrl.$inject = ["$injector", "$state", "$window"];
        babelHelpers.inherits(NewMediaSummaryCtrl, _Saveable);

        /*@ngInject*/

        function NewMediaSummaryCtrl($injector, $state, $window) {
          babelHelpers.classCallCheck(this, NewMediaSummaryCtrl);

          babelHelpers.get(Object.getPrototypeOf(NewMediaSummaryCtrl.prototype), 'constructor', this).call(this, {
            injector: $injector,
            endpoint: 'mediaMediaMaterials',
            backToState: '.',
            key: 'id',
            successTitle: 'media.edit.alert.success.title',
            successMessage: 'media.edit.alert.success.message',
            successCreateMessage: 'media.edit.alert.create.success.message',
            successEditMessage: 'media.edit.alert.success.message',
            errorTitle: 'media.edit.alert.error',
            executeGet: true,
            params: $state.params
          });

          this.state = $state;
          this.window = $window;
          this.mediaId = this.state.params.id;
          this.getMedia();
        }

        babelHelpers.createClass(NewMediaSummaryCtrl, [{
          key: 'getMedia',
          value: function getMedia() {
            var _this = this;

            this.response = this.api['medias'].get({ 'currentId': this.$state.params.id });
            this.response.isLoading = true;
            var objectData = this.response;

            this.response.$promise.then(function (response) {

              objectData.isLoading = false;
              objectData.valid = true;
              _this.media = response;
            }, function (error) {
              // Si nos devuelve un 404, no queremos que se muestre el recurso, pero tampoco que nos tire error
              if (error.status == 404) {
                objectData.valid = false;
                objectData.isLoading = false;
              }
            });
          }
        }, {
          key: 'goToDetails',
          value: function goToDetails() {
            var mediaMaterial = this.state.params.id.split('-');
            var mediaId = { 'mediaId': mediaMaterial[2] };
            this.state.go('searchResults', mediaId);
          }
        }, {
          key: 'addMaterial',
          value: function addMaterial() {
            this.state.go('newMedia', { 'currentId': this.state.params.id });
          }
        }, {
          key: 'hasMediaMaterials',
          value: function hasMediaMaterials() {
            if (this.entity.content) {
              return this.entity.content.length == 0;
            }
            return false;
          }
        }, {
          key: 'materialsPermitedExceeded',
          value: function materialsPermitedExceeded() {
            if (this.entity && this.entity.content && this.media && this.media.maximumMediaMaterials) {
              return !(this.media.maximumMediaMaterials > this.entity.content.length);
            }
            return false;
          }
        }]);
        return NewMediaSummaryCtrl;
      })(Saveable);

      _export('default', NewMediaSummaryCtrl);
    }
  };
});
//# sourceMappingURL=med.new.media.summary.ctrl.js.map
