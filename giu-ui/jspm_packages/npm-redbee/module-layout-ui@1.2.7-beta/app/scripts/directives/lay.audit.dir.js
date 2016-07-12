/* */
'use strict';

class AuditDirController {

  /*@ngInject*/
  constructor(api, $scope) {

    if (typeof this.isRemote !== 'undefined' && this.isRemote) {

      this.api = api;

      $scope.$watch('ctrl.params', (changes) => {

        if (changes)
          this._get();
      });


    } else {

      this.data = this.modelEntity;
    }

  }

  openAudit(){
    if(this.enabled) {
      this.open = !this.open;
    }
  }

  _get(){
    this.isLoading = true;
    this.api[this.endpoint]
      .get(this.params)
      .$promise
      .then(response => {
        this.data = response;
        this.isLoading = false;
      });
  }

}

export default class AuditDirective {

  constructor() {
    this.restrict = 'E';
    this.replace = true;
    this.templateUrl = 'views/directives/lay.audit.html';
    this.scope = {};
    this.bindToController = {
      'endpoint': '@?',
      'params': '=?',
      'enabled': '=?',
      'isRemote': '=?',
      'modelEntity': '=?'
    };


    this.open = false;

    this.controller = AuditDirController;
    this.controllerAs = 'ctrl';
  }

  link(scope, element, attrs, ctrl) {

    let auditContainer = $('.media-audit-container');
    $(document).click(event => {
      if (auditContainer.hasClass('toggled')) {
        return false;
      }
    });
  }

  static directiveFactory() {
    var instance = new AuditDirective();
    return instance;
  }

}
