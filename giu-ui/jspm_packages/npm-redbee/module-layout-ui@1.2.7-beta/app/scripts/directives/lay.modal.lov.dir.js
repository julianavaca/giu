
/**
 * Directive for modal selection
 *
 * target: for binding the result
 * lovTable: List with the description for table rendering [{label: '', key: ''}]
 * lovValue: ?
 * lovEndpoint: Literal - Endpoint for $api service
 * isMultiple: Boolean, if true muliselect is enabled
 *
 * @since 1.2.6
 * @author mbritez
 *
 */

'use strict';

import Pageable from 'module-crud-ui/app/scripts/crud.pageable.js';

class LayLovController {

  constructor($injector, $state) {

    this.injector = $injector;
    this.state = $state;

    this._init();
  }

  _init() {
    this.pageable = new Pageable(
      {
        injector: this.injector,
        endpoint: this.lovEndpoint,
        params: this.state.params,
        selectable:
        {
          itemKey: 'id',
          enabled: true,
          allowMultiSelect: this.isMultiple
        }
      }
    );
  }

}

export default class LayModalLov {

  constructor() {
    this.restrict = 'EA';
    this.replace = true;
    this.templateUrl = 'views/directives/lay.lov.modal.html';
    this.scope = {};
    this.bindToController = {
      'target': '=',
      'lovTable': '=',
      'lovValue': '@',
      'lovEndpoint' : '@',
      'isMultiple':'=',
      'isEnabled': '='

    };

    this.controller = ['$injector', '$state', LayLovController];
    this.controllerAs = 'vm';

  }

  link(scope, element, attrs) {
    let mySelf = $(element);
    let parent = mySelf.parent();
    let body = $('body');
    mySelf.detach().appendTo(body);
  }

  static directiveFactory() {
    var instance = new LayModalLov();
    return instance;
  }

}
