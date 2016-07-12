/* */ 
export default class TranslateCfg {

  constructor($translateProvider) {

    $translateProvider.useStaticFilesLoader({
      prefix: 'app/i18n/',
      suffix: '.json'
    });

    //$translateProvider.useSanitizeValueStrategy('sanitize');
    // TODO:  pidieron el lenguaje en ingles. para tomarlo del navegador agregar navigator.language.substr(0,2)
    $translateProvider.preferredLanguage('en');
  }

  /*@ngInject*/
  static cfgFactory($translateProvider) {
    var instance = new TranslateCfg($translateProvider);
    return instance;
  }

}
