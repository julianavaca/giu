/* */ 
function enterpriseInterceptor(enterpriseProvider) {
  return {
    request: function(config) {
      config.headers = config.headers || {};

      var enterprise = enterpriseProvider.getEnterprise();

      if(enterprise){
        config.headers.AlephEnterprise = enterprise.id;
      }

      return config;
    }
  };
}

export default enterpriseInterceptor;
