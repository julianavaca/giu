/* */ 
'use strict';

export default class EnterpriseDirective {

  /*@ngInject*/
  constructor() {
    this.restrict = 'E';
    this.replace = true;
    this.templateUrl = 'views/directives/lay.enterprises.html';
    this.controllerAs = 'ctrl';
    this.bindToController = {};
    this.scope = {};
    this.controller = EnterpriseDirCtrl;
  }

  static directiveFactory() {
    var instance = new EnterpriseDirective();
    return instance;
  }

}

class EnterpriseDirCtrl {

  /*@ngInject*/
  constructor(enterpriseService, enterpriseProvider, $rootScope) {
    this.enterpriseService = enterpriseService;
    this.enterpriseProvider = enterpriseProvider;
    this.scope = $rootScope;
    this._getEnterprises();
  }

  changeEnterprise(enterprise){
    this.enterpriseProvider.setEnterprise(enterprise);
    this.currentEnterprise = enterprise;
    window.location.reload();
  }

  _getEnterprises() {
    this.enterpriseService.getAll().then((enterprises) => {
      this.enterprises = enterprises;

      //TODO: (mbritez) Check if collections is empty
      if(enterprises){
        this._setCurrentEnterprise(enterprises[0]);
      }
    });
  }

  _setCurrentEnterprise(enterprise) {
    var storedEnterprise = this.enterpriseProvider.getEnterprise();

    if(typeof (storedEnterprise) !== 'undefined') {
      this.currentEnterprise = storedEnterprise;
    } else {
      this.currentEnterprise = enterprise;
      this.enterpriseProvider.setEnterprise(enterprise);
    }

    this.scope.$emit('enterprise-setted');
  }
}

