/* */
'use strict';

import {optional} from './crud.optional.js';

export default class Selectable {

  constructor(config) {

    this.selectedAll = false;
    this.collection = optional(config.collection).getOrElse([]);
    this.allowMultiSelect = optional(config.allowMultiSelect).getOrElse(false);
    this.itemKey = optional(config.itemKey).orElseThrow(new Error('itemKey must be defined'));
  }

  setPreselectedItems(collection) {
    this.preselectedItems = collection;
  }

  pageChange(collection, currentPage) {

    this.collection = collection;
    if(this.preselectedItems) {
      this.collection.find(it => this.isEqual(this.preselectedItems, it)).selected = true;
      this.change(this.preselectedItems);
    }
  }

  change(item) {
    if (!this.allowMultiSelect) {
      let element = this.collection.find(it => this.isEqual(item, it));
      var status = element.selected;
      this.removeAll();
      element.selected = status;
      if(!status && this.isEqual(element, this.preselectedItems)) {
        this.preselectedItems = {};
      }
    }
  }

  isEqual(element, anotherElement){
    if (Array.isArray(this.itemKey))
      return this.itemKey.every((evr) => {return anotherElement[evr] === element[evr]});
    else
      return anotherElement[this.itemKey] === element[this.itemKey];
  }

  removeAll() {
    this.collection.forEach((elem) => { elem.selected = false });
  }

  itemSelected() {
    return this.collection.find(elem => elem.selected);
  }

  collect() {
    return this.collection.filter(elem => elem.selected);
  }

  selectAll() {
    this.selectedAll = !this.selectedAll;
    this.collection.forEach((elem) => { elem.selected = this.selectedAll });
  }

}
