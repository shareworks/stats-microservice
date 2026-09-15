import sortByProp from '../../../../utils/sortByProp.js'

export default (newRef, prop) =>
  (existingRefs = [], { readField }) => {
    const toObj = (ref) => ({ ref, [prop]: readField(prop, ref) })
    const toRef = (obj) => obj.ref

    return [...existingRefs, newRef].map(toObj).toSorted(sortByProp(prop)).map(toRef)
  }
