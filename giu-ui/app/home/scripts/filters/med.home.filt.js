'use strict';
/* global angular */
angular.module('homeFilters', [])

    // Dado un estado que puede venir como V (Activo) o no
    .filter('statusForDisplay', function() {
        return function(input) {
            if(!input){
                return input;
            }
            return input === 'V' ? 'Active' : 'Annulled';
        };

    })
    .filter('booleanForDisplay', function() {
        return function (input) {
            return input ? 'Yes' : 'No';
        };
    });
