import type { Model, PipelineStage } from 'mongoose'
import type { LoaderFunctionArgs } from '@remix-run/node'
import type { BetweenOperatorValue, FilterOperator, FilterType, FilterValue } from '~/bootstrap/fns/filter/constants'
import mongoose from 'mongoose'
import { escapeRegExp } from '~/utils/escapeRegex'
import { authenticate } from '~/shopify/app.server'
import { getEndDate, getStartDate } from '~/bootstrap/fns/date'
import { operatorNumValues, supportedOperators, supportedTypes } from '~/bootstrap/fns/filter/constants'

// Define fields that values are always of type string even when the value is in number format
export const forceStringFields = ['name', 'id', 'title']

/**
 * Parse a single filter value from a string.
 *
 * @param {string} param Value of a search param
 *
 * @returns {FilterValue}
 */
export function parseFilterValue(param: string): FilterValue {
  const pieces = param.split('|', 5) as [
    field: string,
    type: string,
    operator: string,
    value: any,
    percentOfResult: string,
  ]

  const [field, , , , percentOfResult] = pieces
  let [, type, operator, value] = pieces

  // Auto-detect missing parameters
  if (value === undefined && (operator !== undefined || type !== undefined)) {
    value = operator || type
    operator = operatorNumValues[type] ? type : 'has'

    type = value.match(/^\d\d\d\d-\d\d-\d\d(~\d\d\d\d-\d\d-\d\d)?$/)
      ? 'date'
      : value.match(/^(\d+|\d*\.\d+)(~(\d+|\d*\.\d+))?$/) && !forceStringFields.includes(field)
        ? 'amount'
        : 'string'

    if (value.indexOf(',') > 0) {
      type = 'array'
      operator = 'any'
    } else if (operator !== 'has' && value.indexOf('~') > 0) {
      operator = 'range'
    }
  }

  if (operator === 'range') {
    const [from, to] = (value as string)?.split('~', 2)
    value = { from, to }
  }

  return {
    field,
    value,
    percentOfResult,
    type: type as FilterType,
    operator: operator as FilterOperator,
  }
}

/**
 * Parse multiple filter values from an array of strings.
 *
 * @param {string[]} queryParams A list of search parameters
 *
 * @returns {FilterValue[]}
 */
export function parseFilterValues(queryParams: any[]): FilterValue[] {
  return queryParams.map(param => parseFilterValue(param))
}

/**
 * Get list filters from request.
 *
 * @param {LoaderFunctionArgs['request']} request
 *
 * @returns {Promise<FilterValue[]>}
 */
export async function getFiltersFromRequest(request: LoaderFunctionArgs['request']): Promise<FilterValue[]> {
  const context = await authenticate.admin(request)

  // Get shop domain from session
  const {
    session: { shop },
  } = context

  // Get query params
  const { searchParams } = new URL(request.url)

  // Do not allow filtering by shop domain
  const listFilters = searchParams.getAll('filter').filter(filter => !filter.includes('shopDomain'))

  // Get list filters
  return parseFilterValues([`shopDomain|${shop}`, ...listFilters])
}

/**
 * Parse list filters from request.
 *
 * @param {LoaderFunctionArgs['request']} request
 * @param {Model<any>}                    model
 *
 * @returns {Promise<PipelineStage[]>}
 */
export async function parseFiltersFromRequest(
  request: LoaderFunctionArgs['request'],
  model?: Model<any>
): Promise<PipelineStage[]> {
  // Define a variable to hold pipeline state generated from list filters
  const pipeline: PipelineStage[] = []

  // Get filter values
  const filters = await getFiltersFromRequest(request)

  // Parse filter values
  for (const filter of filters) {
    const { field, type, operator, value, percentOfResult } = filter

    // Create appropriated pipeline stage to apply filter
    if (field && type && operator && value) {
      // Verify filter type
      if (!supportedTypes.includes(type as FilterType)) {
        console.warn(`The filter type '${type}' is not supported!`)
        continue
      }

      // Verify filter operator
      if (!supportedOperators[operator].includes(type as FilterType)) {
        console.warn(`The operator '${operator}' is not supported by the filter type '${type}'!`)
        continue
      }

      // Prepare filter value
      const {
        Types: { ObjectId },
      } = mongoose

      const _value
        = type === 'date'
          ? operator === 'range'
            ? [getStartDate((value as BetweenOperatorValue).from), getEndDate((value as BetweenOperatorValue).to)]
            : [getStartDate(value), getEndDate(value)]
          : type === 'amount'
            ? operator === 'range'
              ? [parseFloat((value as BetweenOperatorValue).from), parseFloat((value as BetweenOperatorValue).to)]
              : parseFloat(value as string)
            : escapeRegExp(value as string)

      switch (operator) {
        case 'eq':
          if (type === 'date') {
            pipeline.push({
              $match: {
                $and: [
                  { [field as string]: { $gte: (_value as Date[])[0] } },
                  { [field as string]: { $lte: (_value as Date[])[1] } },
                ],
              },
            })
          } else if (type === 'string') {
            if (_value === 'Untitled') {
              pipeline.push({ $match: { [field as string]: { $in: ['', null, _value] } } })
            } else if (['id', '_id'].includes(field)) {
              pipeline.push({
                $match: {
                  $or: [
                    { id: _value },
                    { id: Number(_value) },
                    { _id: ObjectId.isValid(_value as string) ? new ObjectId(_value as string) : _value },
                  ],
                },
              })
            } else {
              pipeline.push({ $match: { [field as string]: { $regex: new RegExp(`^${_value}$`, 'i') } } })
            }
          } else {
            if ((_value as string).match(/^\d+$/)) {
              pipeline.push({ $match: { [field as string]: { $in: [_value, parseInt(_value as string)] } } })
            } else {
              pipeline.push({ $match: { [field as string]: { $eq: _value } } })
            }
          }
          break

        case 'ne':
          if (type === 'string') {
            if (_value === 'Untitled') {
              pipeline.push({ $match: { [field as string]: { $nin: ['', null, _value] } } })
            } else {
              pipeline.push({ $match: { [field as string]: { $not: new RegExp(`^${_value}$`, 'i') } } })
            }
          } else {
            if ((_value as string).match(/^\d+$/)) {
              pipeline.push({ $match: { [field as string]: { $nin: [_value, parseInt(_value as string)] } } })
            } else {
              pipeline.push({ $match: { [field as string]: { $ne: _value } } })
            }
          }
          break

        case 'has':
          pipeline.push({ $match: { [field as string]: { $regex: new RegExp(_value as string, 'i') } } })
          break

        case 'nh':
          pipeline.push({ $match: { [field as string]: { $not: new RegExp(_value as string, 'i') } } })
          break

        case 'any':
          if (type === 'array') {
            pipeline.push({
              $match: {
                [field as string]: {
                  $in:
                    typeof _value === 'string'
                      ? _value.split(',').map(v => (ObjectId.isValid(v as string) ? new ObjectId(v as string) : v))
                      : [_value],
                },
              },
            })
          } else {
            pipeline.push({
              $match: {
                [field as string]: { $regex: new RegExp(`^(${(_value as string).split(',').join('|')})$`, 'i') },
              },
            })
          }
          break

        case 'none':
          if (type === 'array') {
            pipeline.push({
              $match: {
                [field as string]: {
                  $nin:
                    typeof _value === 'string'
                      ? _value.split(',').map(v => (ObjectId.isValid(v as string) ? new ObjectId(v as string) : v))
                      : [_value],
                },
              },
            })
          } else {
            pipeline.push({
              $match: {
                [field as string]: { $not: new RegExp(`^(${(_value as string).split(',').join('|')})$`, 'i') },
              },
            })
          }
          break

        case 'range':
          pipeline.push({
            $match: {
              $and: [
                { [field as string]: { $gte: (_value as Date[] | number[])[0] } },
                { [field as string]: { $lte: (_value as Date[] | number[])[1] } },
              ],
            },
          })
          break

        case 'lt':
        case 'before':
          if (type === 'date') {
            pipeline.push({
              $match: { [field as string]: { $lt: (_value as Date[])[0] } },
            })
          } else {
            pipeline.push({ $match: { [field as string]: { $lt: _value } } })
          }
          break

        case 'gt':
        case 'after':
          if (type === 'date') {
            pipeline.push({
              $match: { [field as string]: { $gt: (_value as Date[])[1] } },
            })
          } else {
            pipeline.push({ $match: { [field as string]: { $gt: _value } } })
          }
          break
      }

      if (model && percentOfResult) {
        const percentage = parseFloat(percentOfResult as string)
        const total = (await model.aggregate([...pipeline, { $count: 'total' }]).exec())?.[0]?.total

        if (total) {
          const numResultsToReturn
            = percentage >= 0 ? Math.ceil((total / 100) * percentage) : Math.floor((total / 100) * (0 - percentage))

          if (percentage < 0) {
            pipeline.push({ $skip: total - numResultsToReturn })
          }

          pipeline.push({ $limit: numResultsToReturn })
        }
      }
    }
  }

  return pipeline
}
