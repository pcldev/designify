import { PAGE_INFO_SELECTION } from '../constants.server'
import { getConnectionArguments } from '../fns.server'
import { type ConnectionArguments } from '../types'
import { MEDIA_LIST_FIELD_SELECTION } from './constants.server'

export function queryForMediaImagesByIds(ids: string[]) {
  return `
    query {
      nodes(ids: ["${ids.join('", "')}"]) {
        ${MEDIA_LIST_FIELD_SELECTION}
      }
    }`
}

export function queryForMediaImages(params: ConnectionArguments = {}) {
  return `
    query {
      files (${getConnectionArguments(params).join(', ')}) {
        nodes {
          ${MEDIA_LIST_FIELD_SELECTION}
        }
        ${PAGE_INFO_SELECTION}
      }
    }`
}
