/* */
'use strict';

import Pageable from 'module-crud-ui/app/scripts/crud.pageable.js';

class LayLovController extends Pageable{

  constructor($injector,$attrs, $state, $scope) {
    super(
      {
        injector: $injector,
        endpoint: $attrs.endpoint,
        params: $state.params,
        selectable:
        {
          itemKey: 'id',
          enabled: true,
          allowMultiSelect: $attrs.allowMultiSelect === 'true'
        }
      });

    this.$scope = $scope;
    this._observe();
    this.show = false;
  }

  /**
   * metodo que actualiza el modelo a mostrar si cambia la variable 'target'
   * @private
   */
  _observe() {
    this.$scope.$watch('vm.target', (changes) => {

      if (change) {
        change.object.getModelToShow();
      }
    });
  }

  /**
   * muestra el popUp
   */
  showPopUp(){
    this.show = true;
  }

  /**
   * retorna los nombres de la columnas a mostrar en la tabla
   * @returns {Array}
   */
  getLabels(){
    return this.table.map((data) => { return data.label});
  }

  /**
   * oculta el popUp
   */
  hidePopUp(){
    this.show = false;
  }

  /**
   * actualiza el model a mostrar dependiendo si es multi o simple valor utilizando el valor a mostrar
   * para la multi seleccion unsa una lista de valores separadas por coma
   */
  getModelToShow(){
    if(this.allowMultiSelect) {
      this.modelToShow = this.target.map((item)=> {
        return item[this.showValue];
      });
    }else {
      this.modelToShow = this.target[this.showValue];
    }
  }

  /**
   * hace la seleccion multi o simple dependiendo si permite o no y oculta el popUp
   */
  makeSelect(){
    if(this.allowMultiSelect){
      this.target = this.selectable.selectedItems();
    } else {
      this.target = this.selectable.itemSelected();
    }
    this.hidePopUp();
  }
}

export default class LayLovDirective {

  /**
   * parametros requeridos
   *
   * target: donde se va a guardar la informacion seleccionada
   * label-title: titulo de la tabla que se va a mostrar
   * label: titulo que se muesta sobre el input
   * allow-multi-select: valor que habilita la multi seleccion
   * table: lista que especifica la tabla {label:nombre de la columna,key:nombre del atributo que contiene el dato}
   * show-value: nombre del atributo que contiene el dato mostrar
   * endpoint: endpoint del recurso de donde se obtienen la lista a seleccionar
   */
  constructor() {
    this.restrict = 'E';
    this.replace = true;
    this.templateUrl = 'views/directives/lay.lov.html';
    this.scope = {};
    this.bindToController = {
      'target': '=',
      'label': '=',
      'labelTitle': '=',
      'required': '=',
      'table': '=',
      'showValue': '@',
      'allowMultiSelect':'='
    };

    this.controller = ['$injector','$attrs', '$state', LayLovController];
    this.controllerAs = 'vm';
  }


  static directiveFactory() {
    var instance = new LayLovDirective();
    return instance;
  }

}
