/* */ 
function oauthConfigToken($stateProvider) {
  $stateProvider
    .state('access_token', {
      url: '/access_token={accessToken}&token_type={tokenType}&expires_in={expiresIn}',
      template: '',
      controller: ['OAuthToken', '$state', '$location', function (OAuthToken, $state, $location) {
        OAuthToken.setToken($location.path().substr(1));
        //TODO: $location.url no cambia el state
        //$location.url(OAuthToken.getLogin().redirect);
        window.location.replace(OAuthToken.getLogin().redirect);
      }]
    })
    .state('logout', {
      url: '/oauth/logout',
      controller: 'OAuthCtrl as vm',
      data: {displayName: false}
    });
}

export default oauthConfigToken;
