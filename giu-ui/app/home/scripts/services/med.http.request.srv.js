'use strict';

export default
class HttpRequestService {

  /*@ngInject*/
  constructor(api) {

    this.api = api;
  }

  getData(endpoint, params){
    if(!params){
      params = {};
    }
    var response = this.api[endpoint].get(params);
    response.isLoading = true;

    response.$promise.then(() => {

      response.isLoading = false;

    }, () => response.isLoading = false);

    return response;
  }

}
