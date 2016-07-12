/* */ 
import {optional} from './crud.optional.js';

export default class CrudAble {

  constructor(config) {

    optional(config).orElseThrow(new Error('config must be defined'));

    this._setProperties(config);

    this._initInjectors();

    this._init();

    if (optional(config.executeGet).getOrElse(true)) {

      this.get();
    }

  }

  /****************
   * PRIVATE
   */

  /**
   * Seta las propiedades default
   *
   * @param config
   * @private
   */
  _setProperties(config) {

    this.params = optional(config.params).getOrElse({});

    this.endpoint = optional(config.endpoint).orElseThrow(new Error('endpoint must be defined'));

    this.$injector = optional(config.injector).orElseThrow(new Error('injector must be defined'));

    this._addProperties(config);
  }

  /**
   * Inicializa el injector de angular y se inyectan los servicios necesarios
   * para realizar el abm.
   *
   * @private
   */
  _initInjectors() {

    this.$log = this.$injector.get('$log');

    this.api = this.$injector.get('api');

    this.$state = this.$injector.get('$state');

    this._addInjector();

  }


  /**
   * La llamada a la api para GET
   *
   * @private
   */
  _get() {

    return this.api[this.endpoint].get(this._getPathParams());

  }

  /**
   * Arma los parametros, pide a las subclases sus parametros
   *
   * @returns {*}
   * @private
   */
  _getPathParams() {

    let pathParams = this.params;

    angular.extend(pathParams, this._addParams());

    return pathParams;
  }

  /**
   * para implementar en la subclase
   *
   * @private
   */
  //istanbul ignore next: es abstracto
  _init() {}

  /**
   * para implementar en la subclase
   *
   * @private
   */
  //istanbul ignore next: es abstracto
  _addInjector() {}

  /**
   * para implementar en la subclase
   *
   * @private
   */
  //istanbul ignore next: es abstracto
  _addParams() {}

  /**
   * para implementar en la subclase
   *
   * @private
   */
  //istanbul ignore next: es abstracto
  _addProperties(config) {}
}