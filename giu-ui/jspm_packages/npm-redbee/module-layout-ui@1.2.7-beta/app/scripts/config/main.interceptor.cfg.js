/* */ 
function interceptorTranslateConfig($httpProvider) {
  $httpProvider.interceptors.push('translateInterceptor');
  $httpProvider.interceptors.push('enterpriseInterceptor');
}

export default interceptorTranslateConfig;
