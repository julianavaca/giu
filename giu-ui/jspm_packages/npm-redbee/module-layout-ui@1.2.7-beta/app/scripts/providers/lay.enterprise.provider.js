/* */
function EnterpriseProvider() {
  var config = {
    name: 'AlephEnterprise'
  };

  this.$get = function ($cookies, $rootScope) {
    class Enterprise {

      /**
       * Se guarda la informacion de la empresa en la cookie
       *
       * @param data
       */
      setEnterprise(data) {
        $cookies.putObject(config.name, data);
        $rootScope.$emit('enterprise.setted');
      }

      /**
       * Devuelve la empresa desde la cookie
       *
       * @returns {*|Object}
       */
      getEnterprise() {
        return $cookies.getObject(config.name);
      }

      /**
       * Se borra de la cookie la empresa
       */
      removeEnterprise() {
        $cookies.remove(config.name);
      }
    }
    return new Enterprise();
  };
}

export default EnterpriseProvider;
