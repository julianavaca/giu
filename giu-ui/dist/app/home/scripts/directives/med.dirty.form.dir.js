System.register('app/home/scripts/directives/med.dirty.form.dir', [], function (_export) {
  /* */
  'use strict';

  var MediaDirtyFormDirController, MediaDirtyFormDirective;
  return {
    setters: [],
    execute: function () {
      MediaDirtyFormDirController = (function () {

        /*@ngInject*/

        function MediaDirtyFormDirController() {
          babelHelpers.classCallCheck(this, MediaDirtyFormDirController);

          this._getForm();
        }

        babelHelpers.createClass(MediaDirtyFormDirController, [{
          key: '_getForm',
          value: function _getForm() {
            return this.length;
          }
        }]);
        return MediaDirtyFormDirController;
      })();

      MediaDirtyFormDirective = (function () {
        function MediaDirtyFormDirective() {
          babelHelpers.classCallCheck(this, MediaDirtyFormDirective);

          this.restrict = 'A';
          this.scope = {};
          this.bindToController = {
            name: '='
          };

          this.controller = MediaDirtyFormDirController;
          this.controllerAs = 'ctrl';
        }

        babelHelpers.createClass(MediaDirtyFormDirective, null, [{
          key: 'directiveFactory',
          value: function directiveFactory() {
            var instance = new MediaDirtyFormDirective();
            return instance;
          }
        }]);
        return MediaDirtyFormDirective;
      })();

      _export('default', MediaDirtyFormDirective);
    }
  };
});
//# sourceMappingURL=med.dirty.form.dir.js.map
