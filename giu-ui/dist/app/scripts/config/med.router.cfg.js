System.register('app/scripts/config/med.router.cfg', ['../../home/scripts/controllers/med.search.ctrl'], function (_export) {
  'use strict';

  var SearchCtrl, mediaroutes;
  return {
    setters: [function (_homeScriptsControllersMedSearchCtrl) {
      SearchCtrl = _homeScriptsControllersMedSearchCtrl['default'];
    }],
    execute: function () {
      mediaroutes = function mediaroutes() {

        var routerConfig = ['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
          $urlRouterProvider.otherwise(function ($injector) {
            $injector.get('$state').go('home');
          });

          $stateProvider.state('home', {
            url: '/',
            controller: SearchCtrl,
            controllerAs: 'vm',
            templateUrl: 'home/views/med.search.html'

          });
        }];

        return routerConfig;
      };

      _export('default', mediaroutes);
    }
  };
});
//# sourceMappingURL=med.router.cfg.js.map
