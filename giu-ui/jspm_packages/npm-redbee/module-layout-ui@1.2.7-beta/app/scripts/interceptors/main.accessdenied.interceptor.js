/* */
function accessDeniedInterceptor($q, $injector) {
  return {
    request: function (config) {
      return config;
    },
    responseError: function (rejection) {
      // Catch `invalid_request` and `invalid_grant` errors and ensure that the `token` is removed.
      if (403 === rejection.status) {
        $injector.get('$state').transitionTo('forbidden');
      }
      return $q.reject(rejection);
    }
  };
}

export default accessDeniedInterceptor;
