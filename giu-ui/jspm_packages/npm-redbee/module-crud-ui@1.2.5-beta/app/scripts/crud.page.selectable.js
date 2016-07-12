/* */
'use strict';

import {optional} from './crud.optional.js';

/**
 * Solo soporta multiseleccion, de requerir
 * un solo item usar Selectable
 */
export default class PageSelectable {

  constructor(config) {

    this.selectedAll = false;
    this.itemKey = optional(config.itemKey).orElseThrow(new Error('itemKey must be defined'));

    this.pageItemsSelected = {};
    this.preselectedItems = [];
  }

  pageChange(collection, currentPage) {

    this.setCurrentPage(currentPage);

    let currentSelected = this._getCurrentSelectedList(this._currentPage);

    //filtrar de pre selected los q estan en la collection
    this._setPreselectedPage(collection, currentSelected);

    this._selectItems(this._getCurrentSelectedList(this._currentPage), collection);
  }

  _setPreselectedPage(collection, currentSelected){
    this.preselectedItems.forEach(elem => {
      let item = collection.find((colElem) => this._isEqual(elem, colElem));
      if(item){
        item.selected = true;
        currentSelected.push(item);
      }
    });
  }

  _isEqual(elemnt, colElem) {
    if (Array.isArray(this.itemKey))
      return this.itemKey.every((evr) => {return elemnt[evr] === colElem[evr]});
    else
      return colElem[this.itemKey] === elemnt[this.itemKey];
  }


  _selectItems(items, collection){
    items.forEach((it) => {

      let item = collection.find((elem) => this._isEqual(it, elem));

      if(item){
        item.selected = true;
        //angular.copy(item,it);
      }
    });
  }

  setPreselectedItems(collection) {
    this.preselectedItems = collection;
  }

  change(item) {
    this._changeItem(item, this._getCurrentSelectedList(this._currentPage));
  }

  _changeItem(item, collection){
    let index = collection.findIndex((elem) => {

      if (Array.isArray(this.itemKey))
        return this.itemKey.every((evr) => {return this._getDeepValue(item, evr) === this._getDeepValue(elem, evr)});
      else
        return  this._getDeepValue(elem, this.itemKey) === this._getDeepValue(item, this.itemKey)
    });

    if (index === -1)
      collection.push(item);
    else {
      collection.splice(index, 1);
      this.preselectedItems.splice(index,1);
    }
  }

  removeAll() {

    let currentSelected = this._getCurrentSelectedList(this._currentPage);

    currentSelected.forEach((elem) => { elem.selected = false });

    this.pageItemsSelected = {};
  }

  selectedItems() {
    let collection = [];
    Object.keys(this.pageItemsSelected).forEach(key => {
      collection = collection.concat(this.pageItemsSelected[key]);
    });
    return this.filterDuplicates(collection);
  }

  filterDuplicates(itemList){
    let filteredList = new Array();
    for(let item of itemList){
      if(!this.isItemInList(item, filteredList)){
        filteredList.push(item);
      }
    }
    return filteredList;
  }

  isItemInList(searchedItem, itemList){
    for(let item of itemList){
      if(item[this.itemKey] == searchedItem[this.itemKey]){
        return true;
      }
    }
    return false;
  }

  selectAll(collection) {
    this.selectedAll = !this.selectedAll;

    //Se remevuen los items seleccionados anteriormente para que no aparezcan repetidos en la grilla
    this._removeAllCurrentSelectedList();


    let currentSelected = this._getCurrentSelectedList();


    //Siempre hay que marcar o desmarcar los elementos internos de la colleccion
    collection.forEach((elem) => {
      elem.selected = this.selectedAll;
      currentSelected.push(elem);
    });

    if (!this.selectedAll) {//Si es false se remueve la lista interna.
      this._removeAllCurrentSelectedList();
    }

  }

  setCurrentPage(pageNumber) {
    this._currentPage = pageNumber;
  }

  _getDeepValue(item, itemPropertyName) {

    let properties = itemPropertyName.split('.');

    if (properties.length > 1) {
      return this._getDeepValue(item[properties[0]], properties.slice(1).join('.'));
    } else {
      return item[properties.join('')];
    }
  }

  _removeAllCurrentSelectedList(){
    this.pageItemsSelected[this._currentPage] = [];
  }

  _getCurrentSelectedList() {

    let currentSelected = this.pageItemsSelected[this._currentPage];

    if (typeof currentSelected === 'undefined') {
      currentSelected = [];
      this.pageItemsSelected[this._currentPage] = currentSelected;
    }

    return currentSelected;
  }

}
