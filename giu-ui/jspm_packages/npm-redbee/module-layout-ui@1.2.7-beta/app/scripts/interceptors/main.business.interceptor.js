/* */ 
function errorInterceptor($q, alertService, translateService) {
  return {
    request: function (config) {
      return config;
    },
    responseError: function (rejection) {
      // Catch `invalid_request` and `invalid_grant` errors and ensure that the `token` is removed.
      if (400 === rejection.status) {

        alertService.error({
          title: translateService.translate('dashboard.period.alert.error'),
          message: rejection.data.message
        })
      }
      return $q.reject(rejection);
    }
  };
}

export default errorInterceptor;
