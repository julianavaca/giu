/* */
'use strict';

import CrudAble from './crud.able.js';
import {optional} from './crud.optional.js';

/**
 * Abstrae a los controllers del manejo de la logica para obtener una entidad y para salvarla
 *
 * TODO:
 *  3 - backToState anidado
 */
export default class Saveable extends CrudAble {

  constructor(config) {

    super(config);

  }

  /**
   * Realiza el get para obtener la entity
   *
   * @returns {*} Devuele un promise de la entity
   */
  get() {

    if (!this._isNew()) {//Obtiene la entity
      this.isLoading = true;
      this.entity = this._get();
      this.entity.$promise.then(() => {
        this.isLoading = false;
        this._initEdit()
      }, error => this.isLoading = false);

    } else {//Crea una entity vacia

      this.entity = {};
      this._initCreate();
    }

    return this.entity;
  }

  /**
   * Salva la entidad mediante la api.
   * realiza un POST si es un alta o un PUT si es una modificación
   *O
   * @param form El form para poder validarlo
   *
   * @returns {*} Devuele un promise de la operación
   */
  save(form) {

    //Si tiene error no hace el submit
    if(form.$valid) {
      let promise;

      if (this._isNew()) {//POST

        promise = this.doPost();
      } else { //PUT

        promise = this.doPut();
      }
      promise.then((response) => {

        this.onResponseSuccess(response);

      }, (error) => {

        this.onResponseError(error)

      });

      return promise;

    } else {

      this.$log.info('form invalid');

      return undefined;
    }
  }

  onResponseError(error){
    if(error.status === 422){
      error.data.forEach(data => {
        form[data.field].$error = {backendError: true};
        form[data.field].backenMessage = data.message;
      });
    } else {
      if(error.status !== 403){
        this.alertService.error(
          {
            title: this.translate(this.errorTitle),
            message: error.data.message
          }
        );
      }
    }
  }

  onResponseSuccess(response){
    this.$log.info('then', response);
    this.$log.info('back to state',this.backToState.state, this.backToState.params);
    this.showAlertSuccess();
  }

  showAlertSuccess(){
    this.alertService.success(
      {
        title:this.translate(this.successTitle),
        message:this._isNew() ? this.translate(this.successCreateMessage) : this.translate(this.successEditMessage)
      }
    );
    this.goToOnSuccess();
  }

  goToOnSuccess(){
    this.$state.go(this.backToState.state, this.backToState.params);
  }

  doPost(){
    //Al ser un POST no necesita construir todos los parametros de la url solo necesita los parametros
    //si es un recurso anidado. En este caso estan en params
    //ej: /media/:id/materilas - id esta en parmas
    return this.api[this.endpoint].save(this.params, this.entity).$promise;
  }

  doPut(){
    //Al ser un PUT necesita como parametros el id de la entidad o los ids de todas las entidades de la url
    //por eso se piden los pathParams. Lo arma la clase Able con colaboracion de addParams
    //ej: /media/:id/materials/:materialId - _getPathParams() devuelve {id:xx, materialId:xx}
    //es la union de la key y los params
    return this.entity.$update(this._getPathParams());
  }
  /**
   * Borra la entidad mediante la api
   * realiza un DELETE
   *
   * Vuelve al backToState
   */
  delete(params) {

    let promise;

    this.alertService.warning(
      {
        title: this.translate(this.deleteTitle),
        message: this.translate(this.deleteMessage)
      },

      () => {
        promise = this.api[this.endpoint].remove(params).$promise;

        promise.then(
            response => {
            this.$log.info('then', response);

            this.$log.info('back to state',this.backToState.state, this.backToState.params);
            this.alertService.success(
              {
                title:this.translate(this.deleteSuccessTitle),
                message:this.translate(this.deleteSuccessMessage)
              }
            );
            this.$state.go(this.backToState.state, this.backToState.params, {reload:true});
          },
            error => {
            if(error.status !== 403){
              this.alertService.error(
                {
                  title: this.translate(this.errorTitle),
                  message: error.data.message
                }
              );
            }
          }
        );
      }
    );

    return promise;
  }

  /**
   * Cancela la operacion y vuelva al state anterior
   * TODO: Falta la logica del dirty check de formulario
   */
  cancel() {
    this.entity = {};
    this.$state.go(this.backToState.state, this.backToState.params);
  }

  /****************
   * PRIVATE
   */

  /**
   * Load dependencias de recuersos para dar de alta la entidad
   */
  _loadEntityDependencies() {
    if(this.entityDependenciesExecuteGet) {
      this.entityDependencies.forEach(
        dependencyApi => {
          dependencyApi.params = dependencyApi.params || {};
          this[dependencyApi.loading] = true;
          this.api[dependencyApi.api].get(dependencyApi.params).$promise.then(response => {
            this[dependencyApi.loading] = false;
            this[dependencyApi.model] = response.content;
          });
        }
      );
    }
  }

  /**
   * Lo llama CrudAble en caso que executeGet sea true
   *
   * @private
   */
  _init() {
    this._loadEntityDependencies();
  }

  /**
   * Se agregan los injector propios de esta clase. Lo llama CrudAble
   *
   * @private
   */
  _addProperties(config) {

    let backToState = optional(config.backToState).orElseThrow(new Error('backToState must be defined'));
    this.backToState = {};

    if(typeof backToState !== 'string'){
      this.backToState.state = optional(backToState.state).orElseThrow(new Error('backToState.state must be defined'));
      this.backToState.params = optional(backToState.params).getOrElse({});
    } else {
      this.backToState.state = backToState;
    }

    this.key = optional(config.key).orElseThrow(new Error('key must be defined'));
    this.successTitle = optional(config.successTitle).getOrElse('common.alert.success.title');
    this.successCreateMessage = optional(config.successCreateMessage).getOrElse('common.alert.success.message');
    this.successEditMessage = optional(config.successEditMessage).getOrElse('common.alert.edit.message');

    this.deleteTitle = optional(config.deleteTitle).getOrElse('common.alert.delete.title');
    this.deleteMessage = optional(config.deleteMessage).getOrElse('common.alert.delete.message');
    this.deleteSuccessTitle = optional(config.deleteSuccessTitle).getOrElse('common.alert.delete.success.title');
    this.deleteSuccessMessage = optional(config.deleteSuccessMessage).getOrElse('common.alert.delete.success.message');

    this.errorTitle = optional(config.errorTitle).getOrElse('common.alert.error.title');
    this.entityDependencies = optional(config.entityDependencies).getOrElse([]);
    this.entityDependenciesExecuteGet = optional(config.entityDependenciesExecuteGet).getOrElse(true);
  }

  /**
   * Se agregan los injector propios de esta clase. Lo llama CrudAble
   *
   * @private
   */
  _addInjector() {

    this.$state = this.$injector.get('$state');
    this.translate = this.$injector.get('$filter')('translate');
    this.alertService = this.$injector.get('alertService');

  }

  /**
   * Colabora con Able para agregar los parametros especificos que necesita
   * @returns {{}}
   */
  _addParams() {
    let keyParams = {};

    keyParams[this.key] = this.$state.params[this.key];

    return keyParams;
  }

  /**
   * Verifica si es un alta o una modificación
   *
   * @returns {boolean} true si es un alta false si es un edit
   * @private
   */
  _isNew() {

    let id = this.$state.params[this.key];

    return id === '' || typeof id === 'undefined';

  }

  _initCreate() {}
  _initEdit() {}
}

