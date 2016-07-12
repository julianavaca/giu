/* */ 
function oauthInterceptor($q, OAuth,uuid) {
  return {
    request: function (config) {
      if (OAuth.getAuthorizationHeader()) {
        config.headers = config.headers || {};
        config.headers.Authorization = OAuth.getAuthorizationHeader();
        config.headers.TransactionId = uuid.v4();
      }
      return config;
    },
    responseError: function (rejection) {
      // Catch `invalid_request` and `invalid_grant` errors and ensure that the `token` is removed.
      if (400 === rejection.status && rejection.data &&
        ('invalid_request' === rejection.data.error || 'invalid_grant' === rejection.data.error)
      ) {
        OAuth.login();
        //$rootScope.$emit('oauth:error', rejection);
      }

      // Catch `invalid_token` and `unauthorized` errors.
      // The token isn't removed here so it can be refreshed when the `invalid_token` error occurs.
      if (401 === rejection.status &&
        (rejection.data && 'invalid_token' === rejection.data.error) ||
        (rejection.data && 'unauthorized' === rejection.data.error) ||
        (rejection.headers('www-authenticate') && 0 === rejection.headers('www-authenticate').indexOf('Bearer'))
      ) {
        //$rootScope.$emit('oauth:error', rejection);

        OAuth.login(rejection.headers('Aleph-Token'), window.location.href);
      }

      return $q.reject(rejection);
    }
  };
}

export default oauthInterceptor;
