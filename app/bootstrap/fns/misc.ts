export function isDevelopmentStore(shopConfig: any) {
  return ['affiliate', 'partner_test'].includes(shopConfig?.plan_name)
}

export function capitalizeFirstLetter(string: string) {
  return string && string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * Get list of object paths.
 *
 * Object path is the nesting object keys joined by `.` character.
 * E.g. `features.accounts.business`
 *
 * @param obj    An object.
 * @param prefix A prefix to prepend to the first level object key.
 *
 * @return {string[]}
 */
export function getObjectPaths(obj: any, prefix = '') {
  const keys = []

  for (const k in obj) {
    if (typeof obj[k] === 'object') {
      keys.splice(keys.length, 0, ...getObjectPaths(obj[k], prefix ? `${prefix}.${k}` : k))
    } else {
      keys.push(prefix ? `${prefix}.${k}` : k)
    }
  }

  return keys
}

export function getObjectValueByKeyPath(obj: any, keyPath: string) {
  let value = obj
  const keys = keyPath.split('.')

  for (let i = 0; i < keys.length; i++) {
    if (!value[keys[i]]) {
      return undefined
    }

    value = value[keys[i]]
  }

  return value
}

export function setObjectValueByKeyPath(obj: any, keyPath: string, value: any) {
  const keys = keyPath.split('.')

  if (keys.length === 1) {
    obj[keys[0]] = value
  } else {
    const sub = obj[keys[0]]?.constructor.name === 'Object' ? obj[keys[0]] : {}
    obj[keys[0]] = setObjectValueByKeyPath(sub, keys.slice(1).join('.'), value)
  }

  return obj
}
