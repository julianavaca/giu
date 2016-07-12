'use strict';

let finaceOAuthCfg = () => {

    let oauthCfg = (OAuthProvider) => {
      OAuthProvider.configure({
          clientId: 'media',
          revokePath: '/logout'
      });
    };

    return oauthCfg;

};

export default finaceOAuthCfg;
