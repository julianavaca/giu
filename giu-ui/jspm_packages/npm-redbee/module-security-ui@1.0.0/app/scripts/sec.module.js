/* */
'use strict';
import oauthConfig from './config/sec.oauth.config';
import oauthConfigToken from './config/sec.oauth.token';
import OAuthTokenProvider from './providers/sec.oauth.token.provider';
import OAuthProvider from './providers/sec.oauth.provider';
import AuthorityService from './services/sec.authorities.srv';
import SecurityDirective from './directives/sec.security.dir';
import SecurityDirectiveNotAllow from './directives/sec.security.not.allow.dir.js';
import oauthInterceptor from './interceptors/sec.oauth.interceptor';
import OAuthCtrl from './controllers/sec.oauth.main.ctrl';
import 'angular-cookies';
import 'angular-uuid';

var securityModule = angular.module('security.module', [
  'ngCookies',
  'angular-uuid'
])
  .config(oauthConfig)
  .config(oauthConfigToken)
  .provider('OAuth', OAuthProvider)
  .factory('oauthInterceptor', oauthInterceptor)
  .provider('OAuthToken', OAuthTokenProvider)
  .controller('OAuthCtrl', OAuthCtrl)
  .service('authorityService', AuthorityService)
  .directive('access', SecurityDirective.directiveFactory)
  .directive('accessNotAllowed', SecurityDirectiveNotAllow.directiveFactory);

securityModule.run((authorityService) => {
});

export default securityModule;
