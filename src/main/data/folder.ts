import prisma from '.'

import { GetFolderList } from '../../shared/folder'

export const getFolderList: GetFolderList = async () => {
  try {
    const res = await prisma.folder.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        parentId: true,

        _count: {
          select: {
            snippets: {
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
        snippetCount: _count.snippets
      }
    })
    console.log('🚀 ~ newVal ~ newVal:', newVal)
    return newVal
  } catch (error) {
    console.log('🚀 ~ constgetFolderList:GetFolderList= ~ error:', error)
  }
}
