/**
 * This directive is to wrap all the cards.
 * actions: A List of objects like [{tooltip:'', action: '', icon: ''}]
 * context-menu: A List of objects in the context menu like [{label: '', action: ''}]
 * title: A header text
 * collapsible: Object that config the collapsible directive {isCollapsed: true, isEnabled: true, id: collapsible id}
 * is-loading: true if the endpoint requested is waiting for response
 * color: color of the header
 * audit: Object to enable the audit like {enabled:true, isRemote, entity}
 * search: Object to to enable search like
 *  {enabled:true, isOpen: false, param: {}, paramName: '', submit: fn, close: fn, placeholder: ''}
 *
 * @since 1.2.6
 * @author mbritez <maxi.britez@redb.ee>
 */

'use strict';

class CardDirController {

  /*@ngInject*/
  constructor($element, collapsableService, $state) {
    this.collapsableService = collapsableService;
    //Default color is blue
    this.color = this.color || 'blue';
    //Defaul serach is disabled
    this.search = this.search || {enabled:false};
    //Initialize Collapsible
    this._initCollapse($element);
    this.state = $state;
  }

  _initCollapse($element){
    this.collapsible = this.collapsible || {isEnabled: false};
    if (this.collapsible.isEnabled){
      this.collapsableContent = $($element).find('.form-body');
      this._checkCollapsableExistence();
      if(this.collapsableService.getCollapsable(this.collapsible.id).state) {
        this.collapsableContent.slideToggle(200);
      }
    }
  }

  collapse(){
    this.collapsableContent.slideToggle(200);
    let oldValue = this.collapsableService.getCollapsable(this.collapsible.id).state;
    this.collapsableService.setCollapsable(this.collapsible.id, !oldValue);
  }

  _checkCollapsableExistence(){

    let elem = this.collapsableService.getCollapsable(this.collapsible.id);

    if(!elem){
      this.collapsableService.newCollapsable(this.collapsible.id, this.collapsible.isCollapsed);
    }

  }

  call(fn) {
    fn();
  }

  anyMenuItem(){
    if(this.contextMenu){
      return this.contextMenu.some(function(item){
        return !item.show || item.show.value;
      });
    }
    return false;
  }

}

export default class CardDirective {

  constructor() {
    this.restrict = 'E';
    this.transclude = true;
    this.replace = false;
    this.templateUrl = 'views/directives/lay.card.html';
    this.scope = {};
    this.bindToController = {
      'collapsible': '=',
      'actions': '=',
      'title': '@',
      'actionTitle': '=',
      'isLoading': '=',
      'contextMenu': '=',
      'color': '@',
      'audit': '=',
      'search': '='
    };
    this.controllerAs = 'cardCtrl';
    this.controller = CardDirController;
  }

  static directiveFactory() {
    var instance = new CardDirective();
    return instance;
  }

}
