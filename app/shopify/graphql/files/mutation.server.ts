import { USER_ERROR_SELECTION } from '../constants.server'

export const mutationStagedUploadsCreate = `
  mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
    stagedUploadsCreate(input: $input) {
      stagedTargets {
        resourceUrl
        url
        parameters {
          name
          value
        }
      }
      ${USER_ERROR_SELECTION}
    }
  }`

export const mutationFileCreate = `
  mutation fileCreate($files: [FileCreateInput!]!) {
    fileCreate(files: $files) {
      files {
        id
        alt
      }
      ${USER_ERROR_SELECTION}
    }
  }`

export const mutationFileDelete = `
  mutation fileDelete($input: [ID!]!) {
  fileDelete(fileIds: $input) {
    deletedFileIds
    ${USER_ERROR_SELECTION}
  }
}`
