//TODO: Ver como importar app.ApiProvider aca
'use strict';

import angular from 'angular';
import 'angular-resource';

import {apiProvider} from './crud.apiprovider.js';
import CrudErrorMessages from './directives/crud.messages.dir.js';
import PageNavigator from './directives/crud.page.navigator.dir.js';

import '../templates';

let crudModule = angular.module('crud.module', ['ngResource', 'module-crud-ui-templates'])
  .config(['$provide', function($provide) {
    $provide.provider('api', apiProvider);
  }])
  .directive('cdMessages',CrudErrorMessages.directiveFactory)
  .directive('pageNavigator', PageNavigator.directiveFactory);

export default crudModule;
