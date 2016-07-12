System.register('app/scripts/config/med.oauth.cfg', [], function (_export) {
    'use strict';

    var finaceOAuthCfg;
    return {
        setters: [],
        execute: function () {
            finaceOAuthCfg = function finaceOAuthCfg() {

                var oauthCfg = function oauthCfg(OAuthProvider) {
                    OAuthProvider.configure({
                        clientId: 'media',
                        revokePath: '/logout'
                    });
                };

                return oauthCfg;
            };

            _export('default', finaceOAuthCfg);
        }
    };
});
//# sourceMappingURL=med.oauth.cfg.js.map
