import prisma from './index'

import { GetSnippetList } from '../../shared/snippet'

export const getSnippetList: GetSnippetList = async () => {
  try {
    const res = await prisma.snippet.findMany({
      select: {
        id: true,
        name: true,
        excerpt: true,
        tags: {
          select: {
            id: true,
            name: true,
            color: true
          }
        }
      }
    })
    return res
  } catch (error) {
    console.log('🚀 ~ getSnippetList ~ error:', error)
  }
}
