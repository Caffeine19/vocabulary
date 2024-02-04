import { Folder } from '@prisma/client'
import prisma from '.'

import { FolderItem, GetFolderList } from '../../../shared/folder'

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

export const deleteFolder = async (id: FolderItem['id']) => {
  try {
    const res = await prisma.folder.delete({
      where: {
        id
      }
    })
    console.log('🚀 ~ deleteFolder ~ res:', res)
  } catch (error) {
    console.log('🚀 ~ deleteFolder ~ error:', error)
  }
}

export const updateFolderName = async (id: FolderItem['id'], name: FolderItem['name']) => {
  try {
    const res = await prisma.folder.update({
      where: { id },
      data: {
        name
      }
    })
    console.log('🚀 ~ updateFolderName ~ res:', res)
  } catch (error) {
    console.log('🚀 ~ updateFolderName ~ error:', error)
    throw error
  }
}
