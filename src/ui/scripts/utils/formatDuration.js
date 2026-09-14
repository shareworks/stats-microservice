const removeLeadingZero = (str) => str.replace(/^0/, '')
const removeTrailingZeros = (str) => str.replace(/(:00:00|:00)$/, '')
const cleanZeros = (str) => removeLeadingZero(removeTrailingZeros(str))

const toString = function () {
  return `${this.value}${this.unit}`
}

export default (ms) => {
  const date = new Date(ms)
  const duration = date.toISOString().slice(11, 19)

  const hasMinutes = duration.match(/^00:00:/) == null
  const hasHours = duration.match(/^00:/) == null

  if (hasMinutes === false)
    return {
      value: cleanZeros(duration.slice(6)),
      unit: 's',
      toString,
    }

  if (hasHours === false)
    return {
      value: cleanZeros(duration.slice(3)),
      unit: 'm',
      toString,
    }

  return {
    value: cleanZeros(duration),
    unit: 'h',
    toString,
  }
}
