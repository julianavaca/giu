/* */ 
'use strict';

export default class WizardCtrl {

  /*@ngInject*/
  constructor(stateList,$state) {
    this.stateList = stateList;
    this.state = $state;
    this.currentStateIndex = 0;
    this.calculateEnabledTabs();
    this.initWizardTabs();
  }

  isTabActive(index) {
    return index == this.currentStateIndex;
  }

  initWizardTabs() {
    this.goToTab(this.currentStateIndex);
  }

  goToTab(index) {
    if (this.stateList.length > index) {
      this.currentStateIndex = index;
      this.state.go(this.stateList[index].state, this.state.params);
    }
    this.calculateEnabledTabs();
  }

  goToNextTab(){
    this.currentStateIndex += 1;
    this.goToTab(this.currentStateIndex);
  }

  getController(){
    return this.state.$current.data.instance;
    //return this.state.get(this.stateList[this.currentStateIndex].state).data.instance;
  }

  save(){
    this.getController().finish(this, 'onResponseArrive');
  }

  cancel(){
    this.getController().cancel();
  }

  next() {
    if (this.stateList.length > this.currentStateIndex + 1) {
      this.getController().next(this, 'goToNextTab');
    }
  }

  isLast(){
    return this.stateList.length === this.currentStateIndex + 1;
  }

  onResponseArrive(){
    this.getController().goTo();
  }

  getId(){
    return this.getController().getId();
  }

  calculateEnabledTabs(){
    this.enabledTabs = [];
    let rootFound = false;
    for(let i=0; i < this.stateList.length; i++){
      // Guardamos el estado actual del tab
      this.enabledTabs.push(this.getParticularTabEnabledState(i, rootFound));

      // Si este tab es root, ya marcamos que no se podra saltear mas adelante que este tab
      if(i >= this.currentStateIndex && this.stateList[i].root) {
        rootFound = true;
      }
    }
  }

  getParticularTabEnabledState(tabIndex, rootFound){
    // Las tabs anteriores o actual tienen que estar activas asi como las proximas hasta encontrar un root
    return (tabIndex <= this.currentStateIndex) || !rootFound;
  }

  isTabEnabled(index){
    if(this.enabledTabs.length > index){
      return this.enabledTabs[index];
    }
    return false;
  }
}
