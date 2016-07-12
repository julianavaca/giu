/* */ 
'use strict';

export default class NavegableTable {

  /*@ngInject*/
  constructor() {
    this.restrict = 'A';
    this.replace = true;
    this.controllerAs = 'vm';
    this.scope = {};
    this.bindToController = {};

    this.templateUrl = '';
    this.controller = () => {};

  }


  link(scope, element, attrs){
    $(element).attr('tabindex','0');

    let focusedRow;

    $(element).on('keydown', (event)=>{

      if (typeof focusedRow === 'undefined') {
        focusedRow = $(element).find('tbody tr:first');
      }

      if(event.keyCode === 13) {
        focusedRow.click();
      } else {

        let action = event.keyCode===40?'next':'prev';

        if ((event.keyCode === 40 || event.keyCode === 38)
          && focusedRow[action]().length !== 0) {
          focusedRow.attr('tabindex','-1');
          focusedRow = focusedRow[action]();
          focusedRow.attr('tabindex', 0);
        }

      }

      $(element).focus();
    });

    $(element).focus();
  }

  static directiveFactory() {
    var instance = new NavegableTable();
    return instance;
  }

}
