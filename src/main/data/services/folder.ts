import { Folder } from '@prisma/client'
import prisma from '.'

import { GetFolderList } from '../../../shared/folder'

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
            },
            children: true
          }
        }
      }
    })
    const newVal = res.map(({ _count, ...other }) => {
      return {
        ...other,
        snippetCount: _count.snippets,
        childrenCount: _count.children
      }
    })
    console.log('🚀 ~ newVal ~ newVal:', newVal)
    return newVal
  } catch (error) {
    console.log('🚀 ~ constgetFolderList:GetFolderList= ~ error:', error)
  }
}

export const createFolder = async ({
  name,
  parentId
}: {
  name: Folder['name']
  parentId: Folder['parentId']
}) => {
  try {
    const res = await prisma.folder.create({
      data: {
        name,
        ...(parentId
          ? {
              parent: {
                connect: {
                  id: parentId
                }
              }
            }
          : {})
      }
    })
    console.log('🚀 ~ createFolder ~ res:', res)
  } catch (error) {
    console.log('🚀 ~ createFolder ~ error:', error)
  }
}
