/* */ 
'use strict';


export default
class EnterpriseService {

    /*@ngInject*/
    constructor($http, $q) {

      this.$http = $http;
      this.$q = $q;
    }

    getAll() {

      return this.$http.get('/oauth/enterprises').then(
        (response) => {
          return response.data;
        },
        (error) => {
          this.$q.reject(error);
        });
    }
}
