/* */
'use strict';

class SecurityNotAllowServiceController {

  /*@ngInject*/
  constructor(authorityService) {
    this.authorityService = authorityService;
    if(this.roles!==undefined&&this.roles!==""){
      var roles = this.roles.split(',') || [];
      this.authorityService
        .getUser()
        .then(() => {
          this.notAllowed = !this.authorityService.containsAll(roles);
        })
    }else{
      this.notAllowed=true;
    }

  }
}

export default class SecurityDirectiveNotAllow {

  constructor() {
    this.restrict = 'AE';
    this.transclude = true;
    this.replace = false;
    this.scope = {};
    this.template = '<div ng-if="sec.notAllowed" ng-transclude=""></div>';
    this.bindToController = {
      'roles': '@'
    };
    this.controller = SecurityNotAllowServiceController;
    this.controllerAs = 'sec'
  }

  static directiveFactory() {
    return new SecurityDirectiveNotAllow();
    return instance;
  }

}
