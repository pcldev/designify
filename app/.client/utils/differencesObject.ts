import * as _ from 'lodash'

export const differencesObject = (object1: any, object2: any) => {
  const differences = _.reduce(
    object1,
    (result, value, key) => {
      if (!_.isEqual(value, object2[key])) {
        ;(result as any)[key] = {
          oldValue: value,
          newValue: object2[key],
        }
      }
      return result
    },
    {}
  )

  return differences
}
