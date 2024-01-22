import prisma from './index'

import type { GetTagList } from '../../shared/Tag'

export const getTagList: GetTagList = async () => {
  try {
    const res = await prisma.tag.findMany({
      select: {
        id: true,
        name: true,
        color: true,
        createdAt: true,
        _count: {
          select: {
            snippet: {
              where: {
                deleted: false
              }
            }
          }
        }
      }
    })

    const newVal = res.map(({ _count, ...other }) => {
      return {
        ...other,
        snippetCount: _count.snippet
      }
    })
    console.log('🚀 ~ newVal ~ newVal:', newVal)
    return newVal
  } catch (error) {
    console.log('🚀 ~ getTagList ~ error:', error)
  }
}
