/**
 * Created by julian on 16/02/16.
 */
"use strict";

export default class SearchMediaCtrl{

  //TODO: esto no está usando correctamente el módulo CRUD, modificar para que sea así
  /*@ngInject*/
  constructor($state, api, alertService, translateService) {
    this.state = $state;
    this.api = api;
    this.alertService = alertService;
    this.translateService = translateService;
    this.disable = true;

    // Intentamos completar los campos si tenemos la info
    this.entity = {};
    this.disableField();
    this.isValidDate = true;
    this.isValidRange = true;
    this._init();
  }

  checkDateValidity(from, to) {
    if (from != undefined && to != undefined && from.getTime() > to.getTime()) {
      this.isValidDate = false;
      return false;
    } else {
      this.isValidDate = true;
      return true;
    }
  }

  updateFeeds(that,item){
    if(that.entity.network && item){
      if(that.entity.network.id === item.id){
        return;
      }
    }
    that.entity.feed = null;
    if(!item){
      that.feeds = that.originalFeeds;
      that.paramFeed = {};
      return;
    }else{
      that.paramFeed = {networkId: item.id};
    }
  }

  checkChapterValidity(from, to) {
    if (parseInt(from) > parseInt(to)) {
      this.isValidRange = false;
      return false;
    } else {
      this.isValidRange = true;
      return true;
    }
  }

  _init() {
    this.getDetailData('feeds').$promise.then((response) =>{
      this.originalFeeds = response.content;
      this.feeds = angular.copy(this.originalFeeds);
    });
  }

  getParamValue(paramName) {
    return this.state.params[paramName];
  }

  isFormCompleted() {
    let valid = false;
    for (var data in this.entity) {
      if (this.entity[data] !== undefined && this.entity[data] != "" && this.entity[data] != null) {
        valid = true;
      }
    }
    return valid && this.entity && Object.getOwnPropertyNames(this.entity).length > 0;
  }

  makeSearch() {
    let self = this;
    if (this.isFormCompleted() && this.isValidDate && this.isValidRange) {
      if (this.entity.createdBy) {
        this.entity.createdBy = this.entity.createdBy.username;
      }
      if (this.entity.mediaFormat) {
        this.entity.mediaFormat = this.entity.mediaFormat.id;
      }
      if (this.entity.mediaType) {
        this.entity.mediaType = this.entity.mediaType.id;
      }
      if (this.entity.network) {
        this.entity.network = this.entity.network.id;
      }
      if (this.entity.feed) {
        this.entity.feed = this.entity.feed.id;
      }
      if (this.entity.materialType) {
        this.entity.materialType = this.entity.materialType.id;
      }
      this._goTo('searchResults');
    } else {
      this.alertService.error({
        title: self.filter('translate')('generic.edit.alert.error'),
        message: self.filter('translate')('generic.med.search.alert.error.message')
      });
    }
  }

  _goTo() {
    this._parseDates();
    this.state.go('searchResults', this.entity);
  }

  _parseDates(){
    this.entity.createdOnTo = this._parseDate(this.entity.createdOnTo);
    this.entity.createdOnFrom = this._parseDate(this.entity.createdOnFrom);
  }

  _parseDate(date){
    if(typeof date !== 'undefined'){
      return date.toISOString();
    }
    return undefined;
  }

  clearForm() {
    this.entity = {};
    this.entity.createdBy = null;
    this.entity.mediaFormat = null;
    this.entity.mediaType = null;
    this.entity.network = null;
    this.entity.feed = null;
    this.entity.materialType = null;
  }

  getDetailData(endpoint, params) {
    this.isLoading = true;
    this.response = this.api[endpoint].get(params);

    this.response.$promise.then(() => {

      this.isLoading = false;

    }, () => this.isLoading = false);

    return this.response;
  }

  disableField() {
    if (this.entity.materialId === undefined || this.entity.materialId == '') {
      this.disable = true;
    } else {
      this.disable = false;
    }
  }


  expressionCreateBy(item) {
    return item.username;
  }

  conditionCreateBy(item, query) {
    return item.username.indexOf(query.toUpperCase()) > -1;
  }

  expression(item) {
    return item.id + ' - ' + item.description;
  }
  
  condition(item, query){
    if (query == null){
      query = ""
    }
    return item.id.indexOf(query.toUpperCase()) > -1 || item.description.indexOf(query.toUpperCase()) > -1;
  }

  updateChapterTo(){
    if(this.entity.fromChapter){
      this.entity.toChapter = this.entity.fromChapter;
    }
  }
}
