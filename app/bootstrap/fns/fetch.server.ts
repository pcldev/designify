import type { Model, PipelineStage } from 'mongoose'
import type { LoaderFunctionArgs } from '@remix-run/node'
import mongoose from 'mongoose'
import { ITEM_LIST_LIMITATION } from '~/constants'
import { parseFiltersFromRequest } from '~/bootstrap/fns/filter/filter.server'

export type FetchItemResponse = null | {
  [key: string]: any
}

export type FetchListResponse = FetchItemResponse & {
  page: number
  total: number
  items: null | any[]
}

/**
 * Fetch list of items that match filters in search params from the specified collection.
 *
 * @param {LoaderFunctionArgs['request']} request
 * @param {Model<any>}                    model
 * @param {PipelineStage[]}               initialPipeline
 * @param {PipelineStage[]}               finalPipeline
 *
 * @returns {Promise<FetchListResponse>}
 */
export async function fetchList(
  request: LoaderFunctionArgs['request'],
  model: Model<any>,
  initialPipeline?: PipelineStage[],
  finalPipeline?: PipelineStage[]
): Promise<FetchListResponse> {
  // Get query params
  const { searchParams } = new URL(request.url)
  const isExportingData = searchParams.get('export')
  const countResultOnly = searchParams.get('countResultOnly')

  // Prepare pagination
  const limit = Math.min(Number(searchParams.get('limit') || 250), ITEM_LIST_LIMITATION)
  const page = Math.max(Number(searchParams.get('page') || 1), 1)
  const skip = (page - 1) * limit

  // Prepare sort options
  const sort = searchParams.get('sort')
  const [sortBy, sortDir] = sort?.split('|') || []

  // Prepare filters
  const pipeline = [...(initialPipeline || []), ...(await parseFiltersFromRequest(request, model))]

  // Fetch item list
  let items: null | any[] = null
  const total = (
    await model
      .aggregate([...pipeline, { $count: 'total' }], {
        collation: {
          locale: 'en',
          caseFirst: 'lower',
        },
      })
      .exec()
  )?.[0]?.total

  if (!countResultOnly) {
    if (sortBy) {
      pipeline.push({ $sort: { [sortBy as string]: sortDir?.toLowerCase() === 'desc' ? -1 : 1 } })
    } else if (!pipeline.find((stage: PipelineStage) => Object.prototype.hasOwnProperty.call(stage, '$sort'))) {
      pipeline.push({ $sort: { updatedAt: -1 } })
    }

    if (!isExportingData && limit > 0) {
      pipeline.push({ $skip: skip })
      pipeline.push({ $limit: limit })
    }

    if (finalPipeline?.length) {
      finalPipeline.forEach(stage => pipeline.push(stage))
    }

    items = await (pipeline?.length
      ? model
          .aggregate(pipeline, {
            collation: {
              locale: 'en',
              caseFirst: 'lower',
            },
          })
          .exec()
      : model.find())
  }

  return { page, total, items }
}

/**
 * Fetch an item that match filters in search params from the specified collection.
 *
 * @param {LoaderFunctionArgs['request']} request
 * @param {Model<any>}                    model
 * @param {PipelineStage[]}               initialPipeline
 *
 * @returns {Promise<FetchItemResponse>}
 */
export async function fetchItem(
  request: LoaderFunctionArgs['request'],
  model: Model<any>,
  initialPipeline?: PipelineStage[]
): Promise<FetchItemResponse> {
  // Get query params
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  // Generate pipeline
  const {
    Types: { ObjectId },
  } = mongoose

  const pipeline = [
    ...(initialPipeline || []),
    ...(id
      ? [
          {
            $match: {
              $or: [{ id }, { _id: ObjectId.isValid(id as string) ? new ObjectId(id as string) : id }],
            },
          },
        ]
      : []),
  ]

  // Fetch item
  return pipeline.length ? (await model.aggregate([...pipeline, { $limit: 1 }]).exec())?.[0] : null
}
