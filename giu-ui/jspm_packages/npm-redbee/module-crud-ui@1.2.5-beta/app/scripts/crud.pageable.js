/* */
'use strict';

import {optional} from './crud.optional.js';
import CrudAble from './crud.able.js';
import PageSelectable from './crud.page.selectable.js';
import Selectable from './crud.selectable.js';

/**
 * Pageable abstrae a los controllers del manejo de la lógica de paginacion y búsqueda
 * contra la api
 *
 * TODO: Falta resolver los filtros de busqueda
 */
export default class Pageable extends CrudAble {

  /**
   * Constructor
   * @param config Los paremetros minimos de configuracion
   *  - endpoint: Nombre de la api definida en apiProvider
   *  - executeGet: Define si realiza el get automaticamente.
   *    Hay casos donde se necesita operar en el controller antes de hacer un get a la api
   */
  constructor(config) {

    super(config);

  }

  /**
   * Se encarga de realizar la consulta a la api y tiene encuenta la pagina y los filtros de busqueda
   *
   * @returns {*} Devuelve un Promise
   */
  get() {

    this.isLoading = true;

    this._updateSearchLocation(this.page.number, this.page.size);

    this.page = this._get();

    this.page.$promise.then(response => {

      this.isLoading = false;

      if (typeof this.selectable !== 'undefined') {
        this.selectable.pageChange(response.content, response.number);
      }
    }, error => this.isLoading = false);

    return this.page;
  }

  change(pageNumber) {
    this.page.number = pageNumber;
    this.get();
  }

  //TODO:deprecated dejar de usar.
  doSearch(query){
    let search = this.$location.search();
    search.query = query;
    this.$location.search(search);
    this.get();
  }


  removeSpecificParamsAndResetPage(params) {

    params.push('page');
    params.push('max');

    this._updateSearchLocation(0, 10, params);

    return this;
  }

  /****************
   * PRIVATE
   */

  /**
   * Se agregan los properties propios de esta clase. Lo llama CrudAble
   *
   * @private
   */
  _addProperties(config) {
    let selectable = optional(config.selectable).getOrElse({enabled: false});
    if (selectable.enabled) {
      this._createSelectable(selectable);
    }
  }

  _createSelectable(selectable){
    this.selectable = optional(selectable.allowMultiSelect).getOrElse(false) ?
      this._createPageSelectable(selectable) : this._createSimpleSelectable(selectable);
  }

  _createPageSelectable(selectable){
    return new PageSelectable(selectable);
  }

  _createSimpleSelectable(selectable){
    return new Selectable(selectable);
  }
  /**
   * Lo llama CrudAble en caso que executeGet sea true
   *
   * @private
   */


  _init() {

    this._initPage();
  }

  /**
   * Se agregan los injector propios de esta clase. Lo llama CrudAble
   *
   * @private
   */
  _addInjector() {

    this.$location = this.$injector.get('$location');

  }

  /**
   *
   * Arma un mapa de parametros propios de Pageable. Lo llama CrudAble
   *
   */
  _addParams() {

    let search = this.$location.search();
    let finalSearch = {};
    for(let src in search){
      let idx = src.indexOf(this.endpoint);
      if(idx !== -1){
        finalSearch[src.substr(this.endpoint.length)] = search[src];
      }else{
        finalSearch[src] = search[src];
      }
    }

    return finalSearch;
  }

  /**
   * Inicializa la pagina
   *
   * @private
   */
  _initPage() {

    this.page = {};

    //Obtiene la pagina de la url. Si se refresca al browser queremos seguir manteniendo la pagina donde estabamos
    var page = this.$location.search()[this.endpoint+'page'];
    var max = this.$location.search()[this.endpoint+'max'];

    this.page.number = isNaN(page) ? 0 : page;
    this.page.size = isNaN(max) ? 10 : max;
  }

  /**
   * Actualiza la url con los parametros de busqueda y la pagina.
   *
   * @param pageNumber El numero de pagina actual
   *
   * @private
   */
  _updateSearchLocation(pageNumber,pageSize, paramsToRemove) {

    var search = this.$location.search();

    search[this.endpoint+'page'] = pageNumber;
    search[this.endpoint+'max'] = pageSize;

    var self = this;

    optional(paramsToRemove).getOrElse(['max','page']).forEach(it => { delete search[it]; delete self.params[it]});

    this.page.size = pageSize;
    this.page.number = pageNumber;

    angular.extend(search, this.params);

    this.$location.search(search);
  }
}

