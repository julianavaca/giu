/**
 * Directive for input selection via lay.lov.dir.js
 *
 * target: for binding the result
 * placeholder: Literal - Placeholder for input
 * label: Literal - Label for input
 * required: Boolean for required
 * lovTable: List with the description for table rendering [{label: '', key: ''}]
 * lovEndpoint: Literal - Endpoint for $api service
 * isMultiple: Boolean, if true muliselect is enabled
 * modalWidth: percent, width of the modal
 * name: name for input
 * form: form parent to link
 * inputChange function into ng-change of input
 * lovSetParams
 * model
 * title
 * @since 1.2.6
 * @author mbritez
 *
 */

'use strict';

import Pageable from 'module-crud-ui/app/scripts/crud.pageable.js';

class LayLovController {

  constructor($mdDialog, $injector, $state, translateService, $scope, api) {

    this.$scope = $scope;
    this.mdDialog = $mdDialog;
    this.injector = $injector;
    this.state = $state;
    this.width = this.modalWidth || 40;
    this.translateService = translateService;
    this.itemKey = this.itemKey || 'id';
    this.api = api;
    this.options = this.modelOptions || {updateOn: 'default'};

    this.pageable = new Pageable(
      {
        injector: this.injector,
        endpoint: this.lovEndpoint,
        selectable:{
          itemKey: this.itemKey,
          enabled: true,
          params: this.state.params,
          allowMultiSelect: this.isMultiple
        },
        params: this.state.params,
        executeGet: false
      }
    );

    this._observe();
    if(this.enabledSearch!==false){
      this.enabledSearch=true;
    }
    this.buildGenericCustomSearch();
    this.buildCustomSearchHeader();
    this._init();
    if(this.isMultiple) {
      this.originalTarget = [];
      this.originalSelectedValues = [];
      this.originalPreSelectedItems = [];
    } else {
      this.originalTarget = undefined;
      this.originalSelectedValues = undefined;
      this.originalPreSelectedItems = undefined;
    }
  }

  buildGenericCustomSearch(){
    this.headerSearch = {
      enabled:this.enabledSearch,
      param: { query: this.state.params.query },
      paramName: 'query',
      placeholder: this.translateService.translate('tooltip.search'),
      submit: () => {
        this.pageable.params.query = this.headerSearch.param[this.headerSearch.paramName];
        this.pageable.get(); },
      close: () => {
        this.pageable.removeSpecificParamsAndResetPage(['query']).get();
        this.close();
      }
    }
  }

  buildCustomSearchHeader(){
    this.searchHeader = this.searchHeader || this.headerSearch;
    this.searchHeader.submit = () => {
      this.pageable.page.number = 0;
      this.pageable.params.query = this.searchHeader.param[this.searchHeader.paramName];
      this.pageable.get();
    };
    this.searchHeader.close = () => {
      if (this.searchHeader.param[this.searchHeader.paramName]) {
        this.searchHeader.param[this.searchHeader.paramName] = "";
        this.pageable.removeSpecificParamsAndResetPage(['query']).get();
      }
    }
  }

  _observe() {

    this.$scope.$watch('vm.selectedValues', (changes) => {
      if (changes){
        this._callback();
      }
    });

    this.$scope.$watch('vm.target', (changes) => {
      if (changes&&!this.isWriting) {
        this._init();
        this._callback();
      }else{
        this.isWriting=false;
      }
    });
  }

  _callback(){
    if (typeof this.callBack !== 'undefined') {
      this.callBack(this.model);
    }
  }

  _init() {
    this.search = false;
    if(this.isMultiple && this.target && angular.isArray(this.target)) {
      this.selectedValues = this._convertValues(this.target);
    }
    this.pageable.selectable.setPreselectedItems(this.target);
  }

  _setSelectTargetItems(target){
    target.map(it => it.selected = true);
  }

  close(){
    if(this.isMultiple) {
      angular.copy(this.originalTarget, this.target);
      angular.copy(this.originalSelectedValues, this.selectedValues);
      this.pageable.selectable._removeAllCurrentSelectedList();
      //this.pageable.selectable.setPreselectedItems(this.originalPreSelectedItems);
      angular.copy(this.originalPreSelectedItems, this.pageable.selectable.preselectedItems);
    } else {
      if(this.originalPreSelectedItems) {
        Object.assign(this.pageable.selectable.preselectedItems, this.originalPreSelectedItems);
      }
      if(this.originalTarget) {
        Object.assign(this.target, this.originalTarget);
      }
    }
    this.mdDialog.hide();
    this.deleteParams();
  }

  values(){
    if(!this.isMultiple){
      let item = [this.pageable.selectable.itemSelected()];
      return this._convertValues(item);
    }else{
      return this._convertValues(this.pageable.selectable.selectedItems());
    }
  }

  _convertValues(someList){
    return someList
      .filter(
        it => {
          let exist = Object.keys(it).find(key => key === 'selected');
          return !exist || it.selected;
        }
      )
      .map(it => it.id);
  }


  submit($event){
    if(!this.isMultiple) {
      this.target = this.pageable.selectable.itemSelected();
      if(this.target) {
        this.selectedValues = this.values();
      }
    } else {
      this.selectedValues = this.values();
      this.target = this.pageable.selectable.selectedItems();
      this.pageable.selectable._removeAllCurrentSelectedList();
    }
    this.mdDialog.hide();
    this.deleteParams();
    $event.preventDefault();

  }

  deleteParams(){
    this.pageable.params.query = null;
    this.pageable.params.page = 0;
    this.searchHeader.param[this.searchHeader.paramName] = "";
    this.searchHeader.close();
  }

  getPropByString(obj, propString) {
    if (!propString)
      return obj;

    let prop, props = propString.split('.');

    let candidate;

    props.forEach(prop => {
      candidate = obj[prop];
      if (typeof candidate !== 'undefined') {
        obj = candidate;
      }
    });
    return candidate;
  }

  _isValid(object){
    return typeof object !== 'undefined';
  }

  _areValid(objects) {
    return objects.filter(it => !this._isValid(it)).length === 0;
  }

  bringModal(ev) {
    if(
      this.isMultiple && this._areValid(
        [this.pageable.selectable.preselectedItems,
          this.selectedValues,
          this.target])) {
      this.originalPreSelectedItems = this.pageable.selectable.preselectedItems.slice();
      this.originalSelectedValues = this.selectedValues.slice();
      this.originalTarget = this.target.slice();
    }

    if(!this.multiple && this._areValid([
        this.pageable.selectable.preselectedItems,
        this.selectedValues,
        this.target])) {
      this.originalPreSelectedItems =  Object.assign({}, this.pageable.selectable.preselectedItems);
      this.originalSelectedValues = Object.assign({}, this.selectedValues);
      this.originalTarget = Object.assign({}, this.target);
    }

    this.setCustomPageableParams();
    this.pageable.get();

    let self = this;
    this.mdDialog
      .show(
        {
          controller: $scope => {
            $scope.vm = self;
          },
          templateUrl: 'views/directives/lay.lov.modal.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: false
        }
      )
  }

  getParams(){
    return this.params ? this.params : {};
  }

  setCustomPageableParams(){
    if(this.params){
      this.pageable.params = this.params;
    }
  }

  excuteChange(){
    if(this.isMultiple && this.selectedValues) {
      if(this.selectedValues.length>0){
        this.isWriting=true;
        this.target = this.selectedValues.map(mp => { return {'id' : mp};});
        this.pageable.selectable.setPreselectedItems(this.target);
      }
    }
    if (typeof this.inputChange !== 'undefined'){
      this.inputChange(this.model);
    }
  }

  getModalHeightStyle(){
    return this.modalHeight ? 'height:' + this.modalHeight + 'px;' : "";
  }

  hasResults(){
    return this.pageable.page && this.pageable.page.content && this.pageable.page.content.length > 0;
  }

  selectAll() {
    if(this.isMultiple){
      this.pageable.selectable.selectAll(this.pageable.page.content);
    }
  }
}

export default class LayInputLov {

  constructor() {
    this.restrict = 'EA';
    this.replace = false;
    this.transclude = true;
    this.templateUrl = 'views/directives/lay.input.lov.html';
    this.scope = {};
    this.bindToController = {
      'target': '=',
      'placeholder': '=',
      'label': '@',
      'title':'@',
      'required': '=',
      'lovTable': '=',
      'lovEndpoint' : '@',
      'isMultiple': '=',
      'modalWidth': '@',
      'modalHeight': '@',
      'name':'@',
      'form': '=',
      'inputChange':'=',
      'callBack':'=',
      'params':'=',
      'nameSearchParam':'@',
      'model': '=',
      'searchHeader':'=',
      'itemKey':'=',
      'disabledInput': '=',
      'disabledPencil':'=',
      'noResultsMessage': '@',
      'enabledSearch':'=',
      'modelOptions':'='
    };

    this.controller = LayLovController;
    this.controllerAs = 'vm';
  }

  static directiveFactory() {
    var instance = new LayInputLov();
    return instance;
  }

}
