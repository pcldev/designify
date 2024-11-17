import type { ConnectionArguments } from './types'
import fetch from 'node-fetch'
import { ITEM_LIST_LIMITATION } from '~/constants'
import { LATEST_API_VERSION } from '@shopify/shopify-api'

export function getConnectionArguments(params: ConnectionArguments = {}): string[] {
  const { after, before, first, last, query, reverse, sortKey } = Object.assign(
    { first: ITEM_LIST_LIMITATION, reverse: true },
    params
  )

  // Generate query arguments
  const connectionArguments = []

  if (after) {
    connectionArguments.push(`after: "${after}"`)
  }

  if (before) {
    connectionArguments.push(`before: "${before}"`)
  }

  if (first) {
    connectionArguments.push(`first: ${first}`)
  }

  if (last) {
    connectionArguments.push(`last: ${last}`)
  }

  if (query) {
    connectionArguments.push(`query: "${query}"`)
  }

  if (reverse) {
    connectionArguments.push(`reverse: ${reverse}`)
  }

  if (sortKey) {
    connectionArguments.push(`sortKey: ${sortKey}`)
  }

  return connectionArguments
}

export async function requestRestApi(params: {
  resource: string
  variables?: any
  shopDomain: string
  accessToken?: string
}): Promise<any> {
  const { resource, variables, shopDomain, accessToken } = params

  const url = `https://${shopDomain}/admin/api/${LATEST_API_VERSION}/${resource}.json`
  const body = variables ? JSON.stringify(variables) : undefined

  const headers = {
    'Content-Type': 'application/json',
    'X-Shopify-Access-Token': accessToken as string,
  }

  return fetch(url, { body, headers, method: variables ? 'POST' : 'GET' })
    .then(res => res.json())
    .catch(console.error)
}

export async function requestGraphqlApi(params: {
  query: string
  variables?: any
  shopDomain: string
  accessToken: string
}): Promise<any> {
  const { query, variables, shopDomain, accessToken } = params

  const url = `https://${shopDomain}/admin/api/${LATEST_API_VERSION}/graphql.json`
  const body = variables ? JSON.stringify({ query, variables }) : query

  const headers = {
    'Content-Type': variables ? 'application/json' : 'application/graphql',
    'X-Shopify-Access-Token': accessToken,
  }

  return fetch(url, { body, headers, method: 'POST' })
    .then(res => res.json())
    .catch(console.error)
}
