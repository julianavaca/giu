/* */ 
var requiredKeys = [
  'baseUrl',
  'clientId',
  'response_type',
  'redirect_uri',
  'grantPath',
  'revokePath'
];

function OAuthProvider() {
  var config;

  this.configure = function (params) {
    //TODO: cambiar todo esto a options
    // Can only be configured once.
    if (config) {
      throw new Error('Already configured.');
    }
    // Check if is an `object`.
    if (!(params instanceof Object)) {
      throw new TypeError('Invalid argument: `config` must be an `Object`.');
    }
    config = params;
    // Check if all required keys are set.
    /*angular.forEach(requiredKeys, (key) => {
      if (!config[key]) {
        throw new Error(`Missing parameter: ${key}.`);
      }
    });*/

    return config;
  };

  this.$get = function (OAuthToken, $timeout) {
    class OAuth {


      getAuthorizationHeader() {
        return OAuthToken.getAuthorizationHeader();
      }

      isAuthenticated() {
        return !!OAuthToken.getToken();
      }

      login(url, redirectURL) {
        OAuthToken.removeToken();
        OAuthToken.setLogin({url:url, redirect:redirectURL})
        $timeout(() => {
          window.location.replace(this.getLoginURL(url, redirectURL));
        });

      }

      getLoginURL(url, redirectURL) {
        return url.replace('CLIENT_ID',config.clientId).replace('REDIRECT_URI',redirectURL)
      }

      logout() {
        OAuthToken.removeToken();
        window.location.replace(this.getLogoutURL());
      }

      getLogoutURL() {
        data = OAuthToken.getLogin();
        regex = /(http:\/\/|https:\/\/)[a-zA-Z:0-9]+\/[a-zA-Z\-]+/;
        url = data.url.replace(data.url.replace(regex,""),"");
        return `${url}${config.revokePath}?redirect_uri=${window.location}`;
      }
    }

    return new OAuth();
  };
}

export default OAuthProvider;
