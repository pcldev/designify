import { verifyResponse, type ShopifyApiClient } from '../api.server'
import ShopifyFile from '~/models/ShopifyFile.server'
import { requestGraphqlApi } from '../fns.server'
import { mutationFileCreate, mutationStagedUploadsCreate } from './mutation.server'
import { queryForMediaImagesByIds } from './query.server'

export const prepareFiles = (files: File[]) =>
  files.map(file => ({
    filename: file.name,
    mimeType: file.type,
    resource: file.type.includes('image') ? 'IMAGE' : 'FILE',
    fileSize: file.size.toString(),
    httpMethod: 'POST',
  }))

export const prepareFilesToCreate = (stagedTargets: any, files: any, alts: string[]) =>
  stagedTargets.map((stagedTarget: any, index: number) => {
    return {
      originalSource: stagedTarget.resourceUrl,
      contentType: files[index].type.includes('image') ? 'IMAGE' : 'FILE',
      filename: files[index].name,
      alt: alts[index],
    }
  })

export const uploadFiles = async (api: ShopifyApiClient, files: File[], shopDomain?: string) => {
  let errors: string = ''
  const errorFiles: any = []
  const uploadedFiles: any = []

  try {
    const preparedFiles = prepareFiles(files)
    let result = await api.createStagedUploads(preparedFiles).catch(console.error)

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData()
      const url = result.stagedTargets[i].url
      const params = result.stagedTargets[i].parameters

      params.forEach((param: { name: string; value: any }) => {
        formData.append(param.name, param.value)
      })

      formData.append('file', files[i])

      await fetch(url, { method: 'POST', body: formData, mode: 'no-cors' })
    }

    result = await api.createFile(prepareFilesToCreate(result.stagedTargets, files, [...files.map(file => file.name)]))

    let uploadingFiles = result.files

    while (uploadingFiles.length) {
      const filesStatus = await api.getMediaFilesByIds(uploadingFiles.map((f: any) => f.id))

      // eslint-disable-next-line no-loop-func
      filesStatus.forEach((file: any) => {
        if (file.fileStatus === 'READY' || file.fileErrors?.length) {
          uploadingFiles = uploadingFiles.filter((f: any) => f.id !== file.id)

          if (file.fileStatus === 'READY') {
            uploadedFiles.push(file)
          } else {
            errorFiles.push(file)
          }
        }
      })
    }

    // Save uploaded files info to app database for later reference if needed
    await ShopifyFile.bulkWrite(
      uploadedFiles.map((file: any) => {
        const name = file.alt

        return {
          updateOne: {
            filter: { shopifyId: file.id },
            update: {
              name,
              shopDomain,
              url: file.image.originalSrc,
              nameWithoutExtension: name.replace(/\.[a-zA-Z0-9]{2,4}$/, ''),
            },
            upsert: true,
          },
        }
      })
    )
  } catch (e) {
    errors = e as string
  }

  return { uploadedFiles, errorFiles, errors }
}

// TODO: Write a mechanism to use graphql like admin method to avoid duplicating code
export const uploadFilesWithAccessToken = async (accessToken: string, files: File[], shopDomain: string) => {
  let errors: string = ''
  const errorFiles: any = []
  const uploadedFiles: any = []

  try {
    const preparedFiles = prepareFiles(files)

    let result = await verifyResponse(
      await requestGraphqlApi({
        query: mutationStagedUploadsCreate,
        variables: { input: preparedFiles },
        shopDomain,
        accessToken,
      }),
      'stagedUploadsCreate'
    )

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData()
      const url = result.stagedTargets[i].url
      const params = result.stagedTargets[i].parameters

      params.forEach((param: { name: string; value: any }) => {
        formData.append(param.name, param.value)
      })

      formData.append('file', files[i])

      await fetch(url, { method: 'POST', body: formData, mode: 'no-cors' })
    }

    result = await verifyResponse(
      await requestGraphqlApi({
        query: mutationFileCreate,
        variables: { files: prepareFilesToCreate(result.stagedTargets, files, [...files.map(file => file.name)]) },
        shopDomain,
        accessToken,
      }),
      'fileCreate'
    )

    let uploadingFiles = result.files

    while (uploadingFiles.length) {
      const filesStatus = await verifyResponse(
        await requestGraphqlApi({
          query: queryForMediaImagesByIds(uploadingFiles.map((f: any) => f.id)),
          shopDomain,
          accessToken,
        }),
        'nodes'
      )

      // eslint-disable-next-line no-loop-func
      filesStatus.forEach((file: any) => {
        if (file.fileStatus === 'READY' || file.fileErrors?.length) {
          uploadingFiles = uploadingFiles.filter((f: any) => f.id !== file.id)

          if (file.fileStatus === 'READY') {
            uploadedFiles.push(file)
          } else {
            errorFiles.push(file)
          }
        }
      })
    }

    // Save uploaded files info to app database for later reference if needed
    await ShopifyFile.bulkWrite(
      uploadedFiles.map((file: any) => {
        const name = file.alt

        return {
          updateOne: {
            filter: { shopifyId: file.id },
            update: {
              name,
              shopDomain,
              url: file.image.originalSrc,
              nameWithoutExtension: name.replace(/\.[a-zA-Z0-9]{2,4}$/, ''),
            },
            upsert: true,
          },
        }
      })
    )
  } catch (e) {
    errors = e as string
  }

  return { uploadedFiles, errorFiles, errors }
}
