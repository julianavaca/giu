/* */ 
'use strict';

import Saveable from 'module-crud-ui/app/scripts/crud.saveable.js';

export default class WizardTab extends Saveable {

  constructor(config){
    super(config);
    this.$state.$current.data.instance = this;
  }

  setForm(form){
    this.form = form;
  }

  goTo() {
    this.$state.go(this.backToState.state, this.backToState.params);
  }

  saveId(response) {
    if (this._isNew()){
      let lastIndex = response.url.lastIndexOf('/');

      this.$state.params[this.key] = response.url.substring(lastIndex + 1);
    }
  }

  getId(){
    return this.$state.params[this.key];
  }

  onResponseSuccess(response){
    this.saveId(response);
    super.onResponseSuccess(response);
  }

  finish(objectCallback, methodNameCallback){
    this.objectCallback = objectCallback;
    this.methodNameCallback = methodNameCallback;
    this.form.$submitted = true;
    this.callSave();
  }

  next(objectCallback, methodNameCallback){
    this.objectCallback = objectCallback;
    this.methodNameCallback = methodNameCallback;
    this.form.$submitted = true;
    this.callSave();
  }

  goToOnSuccess(){
    this.objectCallback[this.methodNameCallback]();
  }

}
