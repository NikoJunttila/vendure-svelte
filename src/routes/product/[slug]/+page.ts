// file will be removed in the next version :)

import type { GetProductDetailVariables as V } from './$houdini'

export const _GetProductDetailVariables: V = async (event : any) => {
  return {
    slug: event.params.slug,
  }
}
