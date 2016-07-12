/* */ 
'use strict';

export default class CollapsableService {

  /**
   * Object {id: 123, state: true/false}
   */
  constructor() {
  this.collapsableList = [];
}

getCollapsable(id){
  return this.collapsableList.find(elem => elem.id == id);
}


setCollapsable(id, state){
  if(id !== undefined && state !== undefined && this.collapsableList.find(elem => elem.id == id)){
    let element = this.collapsableList.find(elem => elem.id == id);
    element.state = state;
  }

}

newCollapsable(id, state){
  let elem = this.collapsableList.find(elem => elem.id == id);
  if(id !== undefined && !elem){
    this.collapsableList.push({'id':id, 'state':state});
  }
  return elem ? elem.state : state;
}

}
