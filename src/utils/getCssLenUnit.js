/**
 *
 * @param {String} prop css property
 * @param {String, Number} value length value
 * @description get corresponding css length unit form given string
 * currently support: auto, px, em, rem, vw, vh
 * @returns {String}
 */
export default function getCssLenUnit (prop, value) {
  if (value === 'auto') {
    return value
  }

  if (typeof value === 'number') {
    return `${value}px`
  } else if (/^\d+px|%|em|rem|vw|vh$/.test(value)) {
    return value
  } else if (String(value) === value) {
    return `${value}px`
  } else {
    throw new Error(`${prop}: '${value}' is a invaild css length unit, use pure number or px,em,%,rem,vw,vh instead`)
  }
}
