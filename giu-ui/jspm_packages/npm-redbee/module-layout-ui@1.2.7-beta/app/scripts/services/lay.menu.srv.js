/* */ 
'use strict';


export default
class EnterpriseService {

  /*@ngInject*/
  constructor($http) {

    this.$http = $http;
    this.base = '/oauth';
  }

  getMenu() {
    return this.$http.get(this.base+'/services').then(
      (response) => {
        return response.data;
      });
  }

  getUser() {
    return this.$http.get(this.base+'/user').then(
      (response) => {
        return response.data;
      });
  }

}
