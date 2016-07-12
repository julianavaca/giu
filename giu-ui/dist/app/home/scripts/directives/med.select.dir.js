System.register('app/home/scripts/directives/med.select.dir', [], function (_export) {
  'use strict';

  var MediaSelectDirective;
  return {
    setters: [],
    execute: function () {
      MediaSelectDirective = (function () {
        function MediaSelectDirective() {
          babelHelpers.classCallCheck(this, MediaSelectDirective);

          this.restrict = 'E';
          this.replace = true;
          this.templateUrl = 'home/views/med.select.html';
          this.scope = {};
          this.transclude = false;
          this.bindToController = {
            'labeldir': '=',
            'formatResourceDir': '=',
            'formatDir': '='
          };

          this.controller = function () {};
          this.controllerAs = 'vm';
        }

        babelHelpers.createClass(MediaSelectDirective, null, [{
          key: 'directiveFactory',
          value: function directiveFactory() {
            var instance = new MediaSelectDirective();
            return instance;
          }
        }]);
        return MediaSelectDirective;
      })();

      _export('default', MediaSelectDirective);
    }
  };
});
//# sourceMappingURL=med.select.dir.js.map
