/**
 * Created by julian on 16/02/16.
 */

"use strict";
import SearchMediaCtrl from './med.search.media.ctrl.js';

export default class SearchMaterialCtrl extends SearchMediaCtrl {

  /*@ngInject*/
  constructor($state, api, alertService) {
    super($state, api, alertService);
  }
  
  _goTo(){
    this.state.go('searchMaterialResults', this.entity);
  }

  disableField(){
    if(this.entity.materialId===undefined||this.entity.materialId===''){
      this.disable=true;
    }else{
      this.disable=false;
    }
  }

  updateChapterTo(){
    if(this.entity.fromChapter){
      this.entity.toChapter = this.entity.fromChapter;
    }
  }

}
