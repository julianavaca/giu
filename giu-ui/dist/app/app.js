System.register('app/app', ['angular', 'angular-resource', 'angular-ui-router', 'angular-material', 'angular-messages', 'angular-ui-mask', 'module-crud-ui/app/scripts/crud.module.js', 'module-security-ui/app/scripts/sec.module.js', 'bower:angular-bootstrap@0.13.4', './home/scripts/directives/med.select.dir', './home/scripts/directives/med.virtual.segment.view.dir.js', './home/scripts/services/med.http.request.srv.js', './home/scripts/services/med.squeeze.srv.js', './home/scripts/services/med.rejection.srv.js', './home/scripts/services/med.segment.srv.js', './home/scripts/services/med.new.media.srv.js', './scripts/config/dashboard.api.cfg', './scripts/config/med.router.cfg', './scripts/config/med.oauth.cfg.js', './home/scripts/services/med.segment.transformer.srv.js', './home/scripts/services/med.rejection.transformer.srv.js', './home/scripts/services/med.time.base.transformer.srv.js', './home/scripts/services/med.squeeze.transformer.srv.js', './home/scripts/services/med.hotstart.transformer.srv.js', './home/scripts/filters/med.home.filt.js', 'module-layout-ui', './templates'], function (_export) {
  /*jshint strict:false */
  'use strict';

  var angular, MediaSelectDirective, VirtualSegmentDirective, HttpRequestService, SqueezeService, RejectionService, SegmentService, NewMediaService, dashboardApiCfg, mediaroutes, financeOAuthCfg, SegmentTransformerService, RejectionTransformerService, TimeBaseTransformerService, SqueezeTransformerService, HotStartTransformerService, homeFilters, app;
  return {
    setters: [function (_angular) {
      angular = _angular['default'];
    }, function (_angularResource) {}, function (_angularUiRouter) {}, function (_angularMaterial) {}, function (_angularMessages) {}, function (_angularUiMask) {}, function (_moduleCrudUiAppScriptsCrudModuleJs) {}, function (_moduleSecurityUiAppScriptsSecModuleJs) {}, function (_bowerAngularBootstrap0134) {}, function (_homeScriptsDirectivesMedSelectDir) {
      MediaSelectDirective = _homeScriptsDirectivesMedSelectDir['default'];
    }, function (_homeScriptsDirectivesMedVirtualSegmentViewDirJs) {
      VirtualSegmentDirective = _homeScriptsDirectivesMedVirtualSegmentViewDirJs['default'];
    }, function (_homeScriptsServicesMedHttpRequestSrvJs) {
      HttpRequestService = _homeScriptsServicesMedHttpRequestSrvJs['default'];
    }, function (_homeScriptsServicesMedSqueezeSrvJs) {
      SqueezeService = _homeScriptsServicesMedSqueezeSrvJs['default'];
    }, function (_homeScriptsServicesMedRejectionSrvJs) {
      RejectionService = _homeScriptsServicesMedRejectionSrvJs['default'];
    }, function (_homeScriptsServicesMedSegmentSrvJs) {
      SegmentService = _homeScriptsServicesMedSegmentSrvJs['default'];
    }, function (_homeScriptsServicesMedNewMediaSrvJs) {
      NewMediaService = _homeScriptsServicesMedNewMediaSrvJs['default'];
    }, function (_scriptsConfigDashboardApiCfg) {
      dashboardApiCfg = _scriptsConfigDashboardApiCfg['default'];
    }, function (_scriptsConfigMedRouterCfg) {
      mediaroutes = _scriptsConfigMedRouterCfg['default'];
    }, function (_scriptsConfigMedOauthCfgJs) {
      financeOAuthCfg = _scriptsConfigMedOauthCfgJs['default'];
    }, function (_homeScriptsServicesMedSegmentTransformerSrvJs) {
      SegmentTransformerService = _homeScriptsServicesMedSegmentTransformerSrvJs['default'];
    }, function (_homeScriptsServicesMedRejectionTransformerSrvJs) {
      RejectionTransformerService = _homeScriptsServicesMedRejectionTransformerSrvJs['default'];
    }, function (_homeScriptsServicesMedTimeBaseTransformerSrvJs) {
      TimeBaseTransformerService = _homeScriptsServicesMedTimeBaseTransformerSrvJs['default'];
    }, function (_homeScriptsServicesMedSqueezeTransformerSrvJs) {
      SqueezeTransformerService = _homeScriptsServicesMedSqueezeTransformerSrvJs['default'];
    }, function (_homeScriptsServicesMedHotstartTransformerSrvJs) {
      HotStartTransformerService = _homeScriptsServicesMedHotstartTransformerSrvJs['default'];
    }, function (_homeScriptsFiltersMedHomeFiltJs) {
      homeFilters = _homeScriptsFiltersMedHomeFiltJs['default'];
    }, function (_moduleLayoutUi) {}, function (_templates) {}],
    execute: function () {
      app = angular.module('media.app', ['ui.router', 'security.module', 'crud.module', 'layout.module', 'ngMaterial', 'aleph-media-ui-templates', 'homeFilters', 'ngMessages', 'ui.mask']);

      /* global System, document */

      System['import']('jquery').then(function () {
        angular.element(document).ready(function () {
          angular.bootstrap(document.body, [app.name], {
            // strictDi: trueSegment
          });
        });
      });

      app.run(["OAuthToken", "$location", function (OAuthToken, $location) {

        var token = $location.path().substr(1);
        if (typeof token !== 'undefined' && token !== '' && token.indexOf('access_token') === 0) {
          OAuthToken.setToken(token);
        }
      }]);

      app.config(financeOAuthCfg()).config(mediaroutes()).config(dashboardApiCfg()).directive('mediaSelectDirective', MediaSelectDirective.directiveFactory).directive('mediaVirtualSegment', VirtualSegmentDirective.directiveFactory).service('httpRequestService', HttpRequestService).service('squeezeService', SqueezeService).service('segmentService', SegmentService).service('rejectionService', RejectionService).service('newMediaService', NewMediaService).service('squeezeTransformerService', SqueezeTransformerService).service('segmentTransformerService', SegmentTransformerService).service('rejectionTransformerService', RejectionTransformerService).service('timeBaseTransformerService', TimeBaseTransformerService).service('hotStartTransformerService', HotStartTransformerService);

      _export('default', app);
    }
  };
});
//# sourceMappingURL=app.js.map
