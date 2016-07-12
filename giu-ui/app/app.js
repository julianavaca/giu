/*jshint strict:false */
'use strict';

import angular from 'angular';
import 'angular-resource';
import 'angular-ui-router';
import 'angular-material';
import 'angular-messages';
import 'angular-ui-mask';

import 'module-security-ui/app/scripts/sec.module.js';
import 'bower:angular-bootstrap@0.13.4';

import HttpRequestService from './home/scripts/services/med.http.request.srv.js';
import dashboardApiCfg from './scripts/config/dashboard.api.cfg';
import mediaroutes from './scripts/config/med.router.cfg';
import financeOAuthCfg from './scripts/config/med.oauth.cfg.js';

import homeFilters from './home/scripts/filters/med.home.filt.js';

import './templates';

var app = angular.module('media.app',
  [
    'ui.router',
    'security.module',
    'ngMaterial',
    'aleph-media-ui-templates',
    'homeFilters',
    'ngMessages',
    'ui.mask'
  ]);
/* global System, document */

System.import('jquery').then(function () {
  angular.element(document).ready(function () {
    angular.bootstrap(document.body, [app.name], {
      // strictDi: trueSegment
    });
  });
});

app.run((OAuthToken, $location) => {

  let token = $location.path().substr(1);
  if(typeof token !== 'undefined' && token !== '' && token.indexOf('access_token')===0 ){
    OAuthToken.setToken(token);
  }
});

app
  .config(financeOAuthCfg())
  .config(mediaroutes())
  .config(dashboardApiCfg())

  .service('httpRequestService', HttpRequestService)


export default app;
