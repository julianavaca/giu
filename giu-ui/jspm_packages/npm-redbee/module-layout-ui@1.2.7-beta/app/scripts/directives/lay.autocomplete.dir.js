/* */
'use strict';

class LayAutocompleteDirectiveController {

  /*@ngInject*/
  constructor(api,$scope) {
    this.api = api;
    this.scope = $scope;
    this._init();
    this._observe();
  }

  _init(){
    this.required = this.required || false;
    this.disabled = this.isDisabled || false;
    if(this.executeGet !== false && !this.isDisabled){
      this.getDetailData().$promise.then(response => {
        this.elements = response;
      });
    }
  }

  queryContent(text) {
    if(!this.elements){
      return;
    }
    if(!this.elements.content){
      return;
    }
    return this.elements.content.filter(it => this.condition(it, text));
  }

  getDetailData() {
    return this.api[this.endpoint].get(this.params);
  }

  _observe(){
    let self = this;
    this.scope.$watchCollection(() => self.params,
      (newValue) => {
        if(newValue){
          this.getDetailData().$promise.then(response =>{
            self.elements = response;
            self.disabled=!self.elements.content.length>0||self.isDisabled;
          });
        }
      });
    this.scope.$watch('ac.itemSelected',
      (newValue) => {
        if(!newValue){
          self.query = self.itemSelected;
          this.disabled = this.isDisabled || false;
        }
      });
  }

  change(){
    if(typeof this.selectedItemChange === 'function'){
      this.selectedItemChange(this.model,this.itemSelected);
    }
  }
}

export default class LayAutocompleteDirective {

  constructor() {
    this.restrict = 'E';
    this.replace = false;
    this.templateUrl = 'views/lay.autocomplete.html';
    this.scope = {};
    this.transclude = true;
    this.bindToController = {
      'required' : '=',
      'inputName' : '@',
      'isCached' : '=',
      'itemSelected' : '=',
      'query' : '=',
      'endpoint' : '@',
      'label' : '@',
      'expression' : '=',
      'condition' : '=',
      'selectedItemChange' :'=',
      'model' : '=',
      'executeGet' : '=',
      'isDisabled' : '=',
      'params' : '='
    };

    this.controller = LayAutocompleteDirectiveController;
    this.controllerAs = 'ac';
  }


  static directiveFactory() {
    return new LayAutocompleteDirective();
  }

}
