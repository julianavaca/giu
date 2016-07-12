/* */ 
'use strict';

export default class NotificationDirective {

  constructor() {
    this.restrict = 'E';
    this.templateUrl = 'views/menu.notification.centre.html';
  }

  static directiveFactory() {
    var instance = new NotificationDirective();
    return instance;
  }

}

