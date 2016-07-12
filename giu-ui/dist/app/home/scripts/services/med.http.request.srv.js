System.register('app/home/scripts/services/med.http.request.srv', [], function (_export) {
  'use strict';

  var HttpRequestService;
  return {
    setters: [],
    execute: function () {
      HttpRequestService = (function () {

        /*@ngInject*/

        HttpRequestService.$inject = ["api"];
        function HttpRequestService(api) {
          babelHelpers.classCallCheck(this, HttpRequestService);

          this.api = api;
        }

        babelHelpers.createClass(HttpRequestService, [{
          key: 'getData',
          value: function getData(endpoint, params) {
            if (!params) {
              params = {};
            }
            var response = this.api[endpoint].get(params);
            response.isLoading = true;

            response.$promise.then(function () {

              response.isLoading = false;
            }, function () {
              return response.isLoading = false;
            });

            return response;
          }
        }]);
        return HttpRequestService;
      })();

      _export('default', HttpRequestService);
    }
  };
});
//# sourceMappingURL=med.http.request.srv.js.map
