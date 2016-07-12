/* */ 
'use strict';

export default class CrudErrorMessages {

  constructor() {
    this.restrict = 'EA';
    this.replace = true;
    this.template = function(elem, attr){
      return this._createTemplate( attr);
    };
  }

  /**
   * Crea el template base para los mensajes de error del input si se hizo submit al form o fue usado el campo
   * @param attr
   * @returns string
   * @private
   */
  _createTemplate(attr){
    return  `<div ng-messages="${attr.form}.${attr.name}.$error"
                  ng-if="${attr.form}.${attr.name}.$touched || ${attr.form}.$submitted">
                ${this._errorMessage(attr.messages)}
                ${this._errorBackendMessage(attr.form,attr.name)}
             </div>`;
  }

  /**
   * Toma los mensajes que vienen por parametro y arma el html para cada mensaje
   * @param errorMessages
   * @returns string
   * @private
   */
  _errorMessage(errorMessages) {
    var data = JSON.parse(errorMessages);
    let messages = '';
    Object.keys(data).forEach(errorName => {
      messages = messages +this._setErrorsFor(errorName, `{{"${data[errorName]}"|translate}}`);
    });
    return messages;
  }

  /**
   *
   * @param form
   * @param fieldName
   * @returns {string}
   * @private
   */
  _errorBackendMessage(form,fieldName) {
    return this._setErrorsFor('backendError',`{{${form}.${fieldName}.backenMessage}}`);
  }

  /**
   * Retorna un <div> con ng-message con el errorName como valor y el errorMessage listo para traducir
   * @param errorName
   * @param errorMessage
   * @returns {string}
   * @private
   */
  _setErrorsFor(errorName,errorMessage){
    return `<div ng-message="${errorName}">${errorMessage}</div>`;
  }

  static directiveFactory() {
    var instance = new CrudErrorMessages();
    return instance;
  }
}

