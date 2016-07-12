/* */ 
function interceptorTranslateConfig($httpProvider) {
  $httpProvider.interceptors.push('errorInterceptor');
  $httpProvider.interceptors.push('timeoutInterceptor');
  $httpProvider.interceptors.push('businessInterceptor');
  $httpProvider.interceptors.push('accessDeniedInterceptor');
}

export default interceptorTranslateConfig;
