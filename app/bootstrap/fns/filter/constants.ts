// Define necessary types
export type FilterType = 'string' | 'date' | 'amount' | 'array'

export type DateOperator = 'eq' | 'range' | 'before' | 'after'
export type AmountOperator = 'eq' | 'ne' | 'range' | 'lt' | 'gt'
export type ArrayOperator = 'eq' | 'ne' | 'any'
export type StringOperator = 'eq' | 'ne' | 'has' | 'nh' | 'any' | 'none'
export type FilterOperator = DateOperator | AmountOperator | ArrayOperator | StringOperator

export type BetweenOperatorValue = { from: string; to: string }

export type FilterValue = {
  field: string
  type?: FilterType
  operator?: FilterOperator
  value?: string | BetweenOperatorValue
  percentOfResult?: number | string
  numResult?: number
}

// Define filter types.
export const supportedTypes: FilterType[] = ['string', 'date', 'amount', 'array']

// Define operators and filter type supported by each operator.
export const supportedOperators: { [key: string]: FilterType[] } = {
  eq: ['string', 'date', 'amount', 'array'],
  ne: ['string', 'amount', 'array'],
  has: ['string'],
  nh: ['string'],
  any: ['string', 'array'],
  none: ['string'],
  range: ['date', 'amount'],
  lt: ['amount'],
  gt: ['amount'],
  before: ['date'],
  after: ['date'],
}

// Define the number of values for each operator.
export const operatorNumValues: { [key: string]: number } = {
  eq: 1,
  ne: 1,
  has: 1,
  nh: 1,
  any: 9999,
  none: 9999,
  range: 2,
  lt: 1,
  gt: 1,
  before: 1,
  after: 1,
}
