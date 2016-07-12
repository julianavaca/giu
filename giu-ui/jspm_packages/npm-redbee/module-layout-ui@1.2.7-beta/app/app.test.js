/* */ 
import angular from 'angular';

import './lay.module';

let app = angular.module('layout.test.module', [ 'layout.module']);

console.log('run test layout module');

System.import('jquery').then(function() {
  angular.element(document).ready(function () {

    if(location.hash.indexOf('test=protractor') > -1 ||
      location.search.indexOf('test=protractor') > -1) {
      window.name = 'NG_DEFER_BOOTSTRAP!' + window.name;
      document.body.setAttribute('ng-app', '');
    }

    angular.bootstrap(document.body, [app.name], {
      // strictDi: true
    });
  });
});
