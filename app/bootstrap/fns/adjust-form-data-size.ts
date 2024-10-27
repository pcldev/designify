import { unstable_createMemoryUploadHandler, unstable_parseMultipartFormData } from '@remix-run/node'

/**
 * Increase the form data size is uploaded. Default is 50mb
 * @param request
 * @param maxPartSize
 * @returns FormData
 */
export async function adjustFormDataSize(request: Request, maxPartSize = 50_000_000) {
  const uploadHandler = unstable_createMemoryUploadHandler({
    maxPartSize: maxPartSize,
  })

  const formData = await unstable_parseMultipartFormData(request, uploadHandler)

  return formData
}
