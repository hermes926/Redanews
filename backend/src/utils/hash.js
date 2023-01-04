// Ref: https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript?fbclid=IwAR1Tm1mUf3LgK7Mwj44e22bKcLuuWFFDJQClTP5bqMcJytqUCGlgRvuB19A
/**
 * Returns a hash code from a string
 * @param  {String} str The string to hash.
 * @return {Number}    A 32bit integer
 * @see http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
 */

function hashCode(str) {
  let hash = 0;
  for (let i = 0, len = str.length; i < len; i++) {
    let chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return String(hash);
}

export default hashCode;
