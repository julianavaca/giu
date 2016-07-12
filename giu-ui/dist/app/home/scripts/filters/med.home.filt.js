System.register('app/home/scripts/filters/med.home.filt', [], function (_export) {
    'use strict';
    /* global angular */
    return {
        setters: [],
        execute: function () {
            angular.module('homeFilters', [])

            // Dado un estado que puede venir como V (Activo) o no
            .filter('statusForDisplay', function () {
                return function (input) {
                    if (!input) {
                        return input;
                    }
                    return input === 'V' ? 'Active' : 'Annulled';
                };
            }).filter('booleanForDisplay', function () {
                return function (input) {
                    return input ? 'Yes' : 'No';
                };
            });
        }
    };
});
//# sourceMappingURL=med.home.filt.js.map
