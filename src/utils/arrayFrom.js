/**
 * @credit https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#Polyfill
 * @description Array.From Helper, did a litte modification to the original version
 * @export ArrayFrom
 * @returns []
 */
export default function ArrayFrom () {
  // lazy singleton function
  let fn
  if (Array.from) {
    fn = function () {
      return Array.from.apply(Array.from, Array.prototype.slice.call(arguments))
    }
  } else {
    fn = function from (arrayLike/*, mapFn, thisArg */) {
      const toInteger = function (value) {
        const number = Number(value)
        if (isNaN(number)) { return 0 }
        if (number === 0 || !isFinite(number)) { return number }
        return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number))
      }
      const maxSafeInteger = Math.pow(2, 53) - 1
      const toLength = function (value) {
        const len = toInteger(value)
        return Math.min(Math.max(len, 0), maxSafeInteger)
      }
      // @ignore 1. Let C be the this value.

      // 2. Let items be ToObject(arrayLike).
      const items = Object(arrayLike)

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError('ArrayFrom requires an array-like object - not null or undefined')
      }

      // 4. If mapfn is undefined, then let mapping be false.
      const mapFn = arguments.length > 1 ? arguments[1] : void undefined
      let T
      if (typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (typeof mapFn !== 'function') {
          throw new TypeError('ArrayFrom: when provided, the second argument must be a function')
        }

        // 5. b. If thisArg was supplied, let T be thisArg else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2]
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      const len = toLength(items.length)

      // @ignore 13. If IsConstructor(C) is true, then
      // @ignore 13. a. Let A be the result of calling the [[Construct]] internal method
      // @ignore of C with an argument list containing the single item len.
      // @ignore 14. a. Else, Let A be ArrayCreate(len).
      const A = new Array(len)

      // 16. Let k be 0.
      let k = 0
      // 17. Repeat, while k < len… (also steps a - h)
      let kValue
      while (k < len) {
        kValue = items[k]
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k)
        } else {
          A[k] = kValue
        }
        k += 1
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len
      // 20. Return A.
      return A
    }
  }
  /* eslint-disable no-func-assign */
  ArrayFrom = fn
  return ArrayFrom.apply(null, Array.prototype.slice.call(arguments))
}
