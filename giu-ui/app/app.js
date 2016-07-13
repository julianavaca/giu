/*jshint strict:false */
'use strict';

import angular from 'angular';
import 'angular-resource';
import 'angular-ui-router';
import 'angular-messages';
import 'angular-ui-mask';
import 'bower:angular-bootstrap@0.13.4';

import mediaroutes from './scripts/config/med.router.cfg';


import './templates';

var app = angular.module('giu-ui.app',
  [
      ,
    'ui.router',
    'giu-ui-templates',
    'ngMessages',
    'ui.mask'
  ]);
/* global System, document */

System.import('jquery').then(function () {
  angular.element(document).ready(function () {
    angular.bootstrap(document.body, [app.name], {
      // strictDi: trueSegment
    });
  });
});

app
  .config(mediaroutes());

app.run();


export default app;
