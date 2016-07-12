/* */
'use strict';

class SecurityServiceController {

  /*@ngInject*/
  constructor(authorityService) {
    this.authorityService = authorityService;
    if(this.roles!==undefined&&this.roles!==""){
      var roles = this.roles.split(',') || [];
      this.authorityService
        .getUser()
        .then(() => {
          this.allowed = this.authorityService.containsAll(roles);
        })
    }else{
      this.allowed=true;
    }

  }


}

export default class SecurityDirective {

  constructor() {
    this.restrict = 'AE';
    this.transclude = true;
    this.replace = false;
    this.scope = {};
    this.template = '<div ng-if="sec.allowed" ng-transclude=""></div>';
    this.bindToController = {
      'roles': '@'
    };
    this.controller = SecurityServiceController;
    this.controllerAs = 'sec'
  }
/*
  link(scope, element, attrs, controller) {

    var makeVisible = function () {
        element.removeClass('hidden');
      },
      makeHidden = function () {
        element.addClass('hidden');
      },
      determineVisibility = function (resetFirst) {

        var result = controller.authorityService.containsAll(roles);
        if (result) {
          makeVisible();
        } else {
          makeHidden();
        }
      },
      roles = attrs.access.split(',');


    if (roles.length > 0) {
      determineVisibility();
    }

  }
*/
  static directiveFactory() {
    var instance = new SecurityDirective();
    return instance;
  }

}
