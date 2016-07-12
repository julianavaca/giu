/* */ 
'use strict';
'use strict';


export default
class AuthorityService {

  /*@ngInject*/
  constructor($http, $q, enterpriseProvider) {
    this.$http = $http;
    this.$q = $q;
    this.enterpriseProvider=enterpriseProvider;
    this.base = '/oauth';
    //this.getUser();
  }

  getAuthorities() {
    return this.authorities;
  }

  getUser() {
    let authorities=this.authorities;
    if(typeof this.authorities === 'undefined') {
      return this.$http.get(this.base + '/user').then(
        (response) => {
          var roles = [];
          response.data.authorities.map(function(authority){
            roles.push(authority.authority);
          });
          this.authorities = roles;
        }
      );
    } else {
      return this.$q.resolve(this.authorities);
      /*this.$q((resolve, reject)=>{
       resolve(authorities);
       })*/
    }

  }

  containsAll(roles){
    return roles.every(function(role){
        return this.contains(this.authorities, role)
      }
      , this);
  }

  containsAny(roles){
    return roles.some(function(role){
        return this.contains(this.authorities, role)
      }
      , this);
  }

  contains(a, obj) {
    var i = a.length;
    while (i--) {
      if (a.indexOf("ROLE_"+this.enterpriseProvider.getEnterprise().id+"-"+obj)>-1) {
        return true;
      }
    }
    return false;
  }

}
