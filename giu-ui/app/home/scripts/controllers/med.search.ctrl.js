'use strict';

export default class SearchCtrl {

  /*@ngInject*/
  constructor($state){
    this.state = $state;
    this._init();
  }

  _init(){
    this.activeTab = this.state.params.searchTab === '1'?1:0;
  }

}
