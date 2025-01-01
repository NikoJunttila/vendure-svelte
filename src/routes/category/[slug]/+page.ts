import { load_SearchProducts, load_GetCollections, type GetCollections$input, type SearchProducts$input } from '$houdini';
import type { PageLoad } from './$types'

export const load: PageLoad = async event => {
  const { slug } = event.params
  const variables : SearchProducts$input = {
    input: {
      collectionSlug: slug,
      groupByProduct: true,
      take: 24,
      skip: 0,
    }
  };
  const vars2 : GetCollections$input = {
    options:{
 /*      filter: {
        name: {
          contains: slug
        }
      }, */
      take:24,
    }
  }

  return { 
    products : await load_SearchProducts({ event, variables }),
    //@ts-ignore
    categories : await load_GetCollections({event, vars2}),
    slug:slug,
   }
}