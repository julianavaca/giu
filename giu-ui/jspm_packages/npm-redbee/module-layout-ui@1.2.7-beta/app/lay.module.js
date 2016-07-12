/* */
'use strict';

//Angular deps
import angular from 'angular';
import 'angular-sanitize';
import 'angular-translate';
import 'angular-cookies';
import 'angular-loading-bar';
import 'angular-translate-loader-static-files';
import 'bower:angular-bootstrap@0.13.4';
import 'bootstrap-sweetalert';

//CSS
import 'bower:material-design-iconic-font@2.1.2/./dist/css/material-design-iconic-font.min.css!css';
import '../styles/dialog.css!css';
import '../styles/commons.css!css';
import '../styles/card.css!css';
import '../styles/table.css!css';
import '../styles/app.min.1.css!css';
import '../styles/app.min.2.css!css';
import '../styles/main.css!css';
import '../styles/animate.css!css';
import '../styles/sweet-alert.css!css';
import 'angular-growl-v2';

//Module deps
import HeaderDirective from './scripts/directives/menu.header.dir.js';
import ActionMenuDirective from './scripts/directives/menu.action.menu.dir.js';
import NotificationDirective from './scripts/directives/menu.notification.centre.dir.js';
import NavegableTable from './scripts/directives/lay.table.navegable.dir.js';
import AuditDir from './scripts/directives/lay.audit.dir.js';
import CardDir from './scripts/directives/lay.card.dir.js';
import AutocompleteDir from './scripts/directives/lay.autocomplete.dir.js';

import LayLov from './scripts/directives/lay.lov.dir.js';
import LayInputLov from './scripts/directives/lay.input.lov.dir.js';
import LayModalLov from './scripts/directives/lay.modal.lov.dir.js';

import TranslateCfg from './scripts/config/main.translate.cfg.js';
import interceptorTranslateConfig from './scripts/config/main.interceptor.cfg.js';

import translateInterceptor from './scripts/interceptors/main.translate.interceptor.js';
import EnterpriseInterceptor from './scripts/interceptors/main.enterprise.interceptor.js';
import EnterpriseInterceptorCfg from './scripts/config/main.enterprise.interceptor.cfg.js';

import MenuService from './scripts/services/lay.menu.srv.js';
import AlertService from './scripts/services/lay.alert.srv.js';
import EnterpriseService from './scripts/services/lay.enterprises.srv.js';
import CollapsableService from './scripts/services/lay.collapsable.srv.js';

import EnterpriseDirective from './scripts/directives/lay.enterprises.dir.js';
import EnterpriseProvider from './scripts/providers/lay.enterprise.provider.js';

import interceptorErrorConfig from './scripts/config/main.error.interceptor.cfg.js';
import errorInterceptor from './scripts/interceptors/main.error.interceptor.js';
import timeoutInterceptor from './scripts/interceptors/main.timeout.interceptor.js';
import businessInterceptor from './scripts/interceptors/main.business.interceptor.js';
import accessDeniedInterceptor from './scripts/interceptors/main.accessdenied.interceptor.js';

import TranslateService from './scripts/services/lay.translate.srv.js';

import './templates';

let layoutModule = angular.module('layout.module',
  [ 'ngSanitize',
    'pascalprecht.translate',
    'ui.bootstrap',
    'ui.bootstrap.dropdown',
    'angular-growl',
    'module-layout-ui-templates',
    'ngCookies',
    'angular-loading-bar'
  ])
  .directive('alMainHeader', HeaderDirective.directiveFactory)
  .directive('alActionMenu', ActionMenuDirective.directiveFactory)
  .directive('alNotificationCentre', NotificationDirective.directiveFactory)
  .directive('navegableTable', NavegableTable.directiveFactory)
  .directive('enterpriseDir', EnterpriseDirective.directiveFactory)
  .directive('auditDir', AuditDir.directiveFactory)
  .directive('layLov', LayLov.directiveFactory)
  .directive('layInputLov', LayInputLov.directiveFactory)
  .directive('layModalLov', LayModalLov.directiveFactory)
  .directive('layCard', CardDir.directiveFactory)
  .directive('layAutocomplete', AutocompleteDir.directiveFactory)

  .service('menuService', MenuService)
  .service('alertService', AlertService)
  .service('enterpriseService', EnterpriseService)
  .service('translateService', TranslateService)
  .service('collapsableService', CollapsableService)

  .factory('translateInterceptor',translateInterceptor)
  .config(TranslateCfg.cfgFactory)

  .factory('enterpriseInterceptor',EnterpriseInterceptor)
  .config(EnterpriseInterceptorCfg.cfgFactory)

  .factory('errorInterceptor',errorInterceptor)
  .factory('timeoutInterceptor',timeoutInterceptor)
  .factory('businessInterceptor',businessInterceptor)
  .factory('accessDeniedInterceptor',accessDeniedInterceptor)
  .config(interceptorErrorConfig)

  .provider('enterpriseProvider', EnterpriseProvider)
  .config(interceptorTranslateConfig)
  .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.latencyThreshold = 1;
  }])
  .config(['growlProvider', function (growlProvider) {
    growlProvider.globalTimeToLive(3000);
    growlProvider.onlyUniqueMessages(false);
  }])
  .config($stateProvider => {

    $stateProvider
      .state('loading', {
        url: '/loading?:redirect_url:toParams',
        view: '<div></div>',
        controller: ($rootScope, $state) => {
          $rootScope.$on('enterprise.setted',() => {

            let params = $state.params.toParams.split('&')
              .map((it) => {
                let map = {};
                map[it.split('#')[0]] = it.split('#')[1];

                return map;
              });

            $state.go($state.params.redirect_url, params);
          });
        }
      })
      .state('forbidden', {
        url: '/403',
        views: {
          '': {
            templateUrl: 'scripts/interceptors/views/lay.accessdenied.html',
            controller: ($scope, $window) => {

              $scope.redirect = function(){
                $window.history.back();
              }
            }
          }
        }
      })
      .state('home', {
        url: '/home',
        views: {
          '': {
            templateUrl: 'views/lay.landing.page.html',
            controller: ($scope, $window) => {

              $scope.redirect = function(){
                $window.history.back();
              }
            }
          }
        }
      });
  });

let firstTime = true;
layoutModule.run(($rootScope, enterpriseProvider, $state)=> {
  $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams){
      if (typeof enterpriseProvider.getEnterprise() === 'undefined' && toState.name === 'access_token'){

        if((fromState.name !== 'loading' || toState.name !== 'loading') && firstTime ) {

          let params = '';
          for (let prop in toParams) {
            params += prop+'#'+toParams[prop]+'&';
          }

          params = params.slice(0,params.length-1);

          firstTime = false;
          event.preventDefault();
          $state.go('loading', {redirect_url: toState.name, toParams: params})

        }

      }
    });
});

export default layoutModule;
