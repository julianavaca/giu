'use strict';

import SearchCtrl from '../../home/scripts/controllers/med.search.ctrl';

let mediaroutes = () => {

  let routerConfig = [
    '$stateProvider',
    '$urlRouterProvider',
    ($stateProvider, $urlRouterProvider) => {
        $urlRouterProvider.otherwise(($injector)=> {
            $injector.get('$state').go('home');
        });

      $stateProvider
        .state('home', {
          url: '/',
            controller: SearchCtrl,
            controllerAs: 'vm',
            templateUrl: 'home/views/med.search.html'


        })

    }];

  return routerConfig;

};

export default mediaroutes;
