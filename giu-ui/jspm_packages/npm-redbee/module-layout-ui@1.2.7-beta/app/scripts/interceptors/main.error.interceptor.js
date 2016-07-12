/* */ 
function errorInterceptor($q, growl) {
  return {
    request: function (config) {
      return config;
    },
    responseError: function (rejection) {
      // Catch `invalid_request` and `invalid_grant` errors and ensure that the `token` is removed.
      if (500 === rejection.status) {
        growl.error('There was an error requesting an URL');
      }
      return $q.reject(rejection);
    }
  };
}

export default errorInterceptor;
