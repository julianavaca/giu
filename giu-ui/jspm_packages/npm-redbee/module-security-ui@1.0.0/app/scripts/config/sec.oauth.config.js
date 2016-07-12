/* */ 
function oauthConfig($httpProvider) {
  $httpProvider.interceptors.push('oauthInterceptor');
}

export default oauthConfig;
