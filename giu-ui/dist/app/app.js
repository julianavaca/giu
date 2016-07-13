System.register('app/app', ['angular', 'angular-resource', 'angular-ui-router', 'angular-messages', 'angular-ui-mask', 'bower:angular-bootstrap@0.13.4', './scripts/config/med.router.cfg', './templates'], function (_export) {
  /*jshint strict:false */
  'use strict';

  var angular, mediaroutes, app;
  return {
    setters: [function (_angular) {
      angular = _angular['default'];
    }, function (_angularResource) {}, function (_angularUiRouter) {}, function (_angularMessages) {}, function (_angularUiMask) {}, function (_bowerAngularBootstrap0134) {}, function (_scriptsConfigMedRouterCfg) {
      mediaroutes = _scriptsConfigMedRouterCfg['default'];
    }, function (_templates) {}],
    execute: function () {
      app = angular.module('giu-ui.app', [, 'ui.router', 'giu-ui-templates', 'ngMessages', 'ui.mask']);

      /* global System, document */

      System['import']('jquery').then(function () {
        angular.element(document).ready(function () {
          angular.bootstrap(document.body, [app.name], {
            // strictDi: trueSegment
          });
        });
      });

      app.config(mediaroutes());

      app.run();

      _export('default', app);
    }
  };
});
//# sourceMappingURL=app.js.map
