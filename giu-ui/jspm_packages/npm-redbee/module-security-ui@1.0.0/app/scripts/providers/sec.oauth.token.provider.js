/* */ 
function OAuthTokenProvider() {
  var config = {
    name: 'token',
    loginName: 'login'
  };

  this.$get = function ($cookies) {
    class OAuthToken {

      /**
       * Se guarda la informacion del token en la cookie
       * los datos vienen con forma de parametros URL y se pasan
       * como si fuera un JSON.
       *
       * @param data
       */
      setToken(data) {
        $cookies.put(config.name, this.dataToJSon(data));
      }

      setLogin(data) {
        $cookies.putObject(config.loginName, data);
      }

      /**
       * transforma los datos con forma de URL y se retornan como si fuera JSON
       * @param data
       * @returns {string}
       */
      dataToJSon(data) {
        return '{"' + data.replace(/&/g, '","').replace(/=/g, '":"') + '"}';
      }

      /**
       * devuelve el token obtenido desde la cookie con clave "token"
       *
       * @returns {*|Object}
       */
      getToken() {
        return $cookies.getObject(config.name);
      }

      getLogin() {
        return $cookies.getObject(config.loginName);
      }

      /**
       * Se obtiene el valor del access_token
       *
       * @returns {string}
       */
      getAccessToken() {
        return this.getToken() ? this.getToken().access_token : undefined;
      }

      /**
       * Se devuelve el token type mas el valor del token listo para agregarlo al header
       *
       * @returns {String}
       */
      getAuthorizationHeader() {
        if (!(this.getTokenType() && this.getAccessToken())) {
          return;
        }
        return `${this.getTokenType().charAt(0).toUpperCase()+this.getTokenType().substr(1)} ${this.getAccessToken()}`;
      }

      /**
       * Devuelve el valor del token type
       *
       * @returns {string}
       */
      getTokenType() {
        return this.getToken() ? this.getToken().token_type : undefined;
      }

      /**
       * Se borra de la cookie el token almacenado con la key "token"
       */
      removeToken() {
        $cookies.remove(config.name);
      }
    }
    return new OAuthToken();
  };
}

export default OAuthTokenProvider;
