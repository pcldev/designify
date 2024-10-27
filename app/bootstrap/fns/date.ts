/**
 * Get a date object.
 *
 * @param {string|Date} date_string
 *
 * @returns {Date}
 */
export function getDateObject(date_string?: string | Date): Date {
  if (!date_string) {
    return new Date()
  }

  if (date_string instanceof Date) {
    return date_string
  }

  // Convert a `yyyy-mm-dd` or `yyyy-mm-dd hh:mm:ss` string to Date object
  const test = date_string.match(/^\d\d\d\d-\d\d-\d\d(\s|T)\d\d:\d\d:\d\d([+-]\d\d)*(:?\d\d)*$/)
  let date

  if (date_string.match(/^\d\d\d\d-\d\d-\d\d$/)) {
    date = new Date(`${date_string}T00:00:00.000Z`)
  } else if (test) {
    date = new Date(
      `${date_string.substr(0, 10)}T${date_string.substr(11, 8)}.000${test[2] ? `${test[2]}${test[3] || ''}` : 'Z'}`
    )
  } else {
    date = new Date(date_string)
  }

  return date
}

/**
 * Get a date string.
 *
 * @param {string|Date} date
 * @param {boolean}     ignoreTime
 *
 * @returns {string}
 */
export function getDateString(date?: string | Date, ignoreTime?: boolean): string {
  // Prepare date
  if (!date) {
    date = new Date()
  }

  // Generate date string
  let str = ''

  try {
    str = getDateObject(date).toISOString()

    if (ignoreTime) {
      str = str.split(/[ T]/)[0]
    }
  } catch (e) {
    return str
  }

  return str
}

/**
 * Get a start date
 *
 * @param {any}     from
 * @param {boolean} stringValue
 *
 * @returns {Date|string}
 */
export function getStartDate(from: any, stringValue?: boolean): Date | string {
  const str = `${getDateString(from, true)}T00:00:00.000000Z`
  return stringValue ? str : new Date(str)
}

/**
 * Get an end date
 *
 * @param {any}     to
 * @param {boolean} stringValue
 *
 * @returns {Date|string}
 */
export function getEndDate(to: any, stringValue?: boolean): Date | string {
  const str = `${getDateString(to, true)}T23:59:59.999999Z`
  return stringValue ? str : new Date(str)
}
