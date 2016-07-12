/**
 * Intento de Optional a lo java / scala para no andar metiendo
 * if por todos lados
 *
 * Por el momento se implementan getOrElse y orElseThrow.
 *
 * Siempre que se implemente un metodo nuevo tiene que estar en none y some
 */

let none = () => {

  let f = {};
  f.getOrElse = _ => _;
  f.orElseThrow = _ => {
    throw _;
  };

  return f;
};

let some = v => {

  let f = {};
  f.getOrElse = () => v;
  f.orElseThrow = () => v;
  return f;
};

export let optional = v => {

  if (typeof(v) === 'undefined') {
    return none();
  } else {
    return some(v);
  }
};