/* */ 
'use strict';

export default class OAuthCtrl {

  constructor(OAuth) {
    this.provider = OAuth;
    this.provider.logout();
  }

  login() {
    this.provider.login();
  }

  isAuthenticated() {
    return this.provider.isAuthenticated();
  }

  logout() {
    this.provider.logout();
  }
}

OAuthCtrl.$inject = ['OAuth'];
