import prisma from './index'

import * as prettier from 'prettier'

import {
  ConnectSnippetWithTag,
  CreateSnippet,
  DeleteSnippet,
  DestroySnippet,
  MoveSnippetIntoFolder,
  Snippet,
  SnippetDetail,
  SnippetItem,
  SnippetStatus,
  SnippetStatusCount,
  SortAttr,
  SortDirection,
  UpdateSnippetFavorite
} from '../../../shared/snippet'

import { Tag } from '../../../shared/Tag'
import { Folder } from '../../../shared/folder'

export const getSnippetList = async ({
  tagId,
  status,
  folderId,
  sortAttr,
  sortDirection
}: {
  tagId?: Tag['id']
  status?: SnippetStatus
  folderId?: Folder['id']
  sortAttr?: SortAttr
  sortDirection?: SortDirection
}): Promise<SnippetItem[]> => {
  try {
    const res = await prisma.snippet.findMany({
      select: {
        id: true,
        name: true,
        excerpt: true,
        tags: true,
        deleted: true,
        folderId: true,
        folder: true,
        favorite: true,
        createdAt: true,
        updatedAt: true
      },

      where: {
        ...(tagId
          ? {
              tags: {
                some: {
                  id: tagId
                }
              }
            }
          : {}),

        ...(folderId
          ? {
              folderId
            }
          : {}),

        ...(status === 'deleted'
          ? { deleted: true }
          : status === 'favorite'
            ? { favorite: true, deleted: false }
            : status === 'inbox'
              ? { folderId: null, deleted: false }
              : { deleted: false })
      },

      orderBy: {
        [sortAttr || 'createdAt']: sortDirection || 'desc'
      }
    })
    console.log('🚀 ~ constgetSnippetList:GetSnippetList= ~ res:', res)
    return res
  } catch (error) {
    console.log('🚀 ~ getSnippetList ~ error:', error)
    throw error
  }
}

export const getSnippetStatusCount = async (): Promise<SnippetStatusCount> => {
  try {
    const getInboxCount = () => prisma.snippet.count({ where: { deleted: false, folderId: null } })
    const getAllCount = () => prisma.snippet.count({ where: { deleted: false } })
    const getFavoriteCount = () =>
      prisma.snippet.count({ where: { deleted: false, favorite: true } })
    const getDeletedCount = () => prisma.snippet.count({ where: { deleted: true } })

    const res = await Promise.all([
      getInboxCount(),
      getAllCount(),
      getFavoriteCount(),
      getDeletedCount()
    ])
    console.log('🚀 ~ constgetSnippetStatusCount:GetSnippetStatusCount= ~ res:', res)

    const [inbox, all, favorite, deleted] = res

    return { inbox, all, favorite, deleted }
  } catch (error) {
    console.log('🚀 ~ getSnippetStatusCount ~ error:', error)
    throw error
  }
}

export const getSnippetDetail = async (id: Snippet['id']): Promise<SnippetDetail | null> => {
  try {
    const res = await prisma.snippet.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        content: true,
        tags: true,
        favorite: true,
        deleted: true,
        createdAt: true,
        folder: true,
        folderId: true,
        updatedAt: true
      }
    })
    console.log('🚀 ~ constgetSnippetDetail:GetSnippetDetail= ~ res:', res)
    return res
  } catch (error) {
    console.log('🚀 ~ getSnippetDetail ~ error:', error)
    throw error
  }
}

export const updateSnippetContent = async (
  id: Snippet['id'],
  content: Snippet['content']
): Promise<void> => {
  try {
    const res = await prisma.snippet.update({
      where: { id },
      data: { content }
    })
    console.log('🚀 ~ res:', res)
  } catch (error) {
    console.log('🚀 ~ error:', error)
    throw error
  }
}

export const updateSnippetName = async (
  id: Snippet['id'],
  name: Snippet['name']
): Promise<void> => {
  try {
    const res = await prisma.snippet.update({
      where: { id },
      data: { name }
    })
    console.log('🚀 ~ updateSnippetName ~ res:', res)
  } catch (error) {
    console.log('🚀 ~ updateSnippetName ~ error:', error)
    throw error
  }
}

export const connectSnippetWithTag: ConnectSnippetWithTag = async (id, tagId) => {
  try {
    const res = await prisma.snippet.update({
      where: { id },
      data: {
        tags: {
          connect: {
            id: tagId
          }
        }
      }
    })
    console.log('🚀 ~ connectSnippetWithTag ~ res:', res)
  } catch (error) {
    console.log('🚀 ~ error:', error)
    throw error
  }
}

export const createSnippet: CreateSnippet = async ({ name, content, excerpt, tagId }) => {
  try {
    const res = await prisma.snippet.create({
      data: {
        name,
        content,
        excerpt,
        tags: {
          connect: [{ id: tagId }]
        }
      },
      select: {
        id: true,
        name: true,
        excerpt: true,
        content: true,
        createdAt: true,
        tags: true,
        deleted: true,
        folderId: true,
        folder: true,
        favorite: true,
        updatedAt: true
      }
    })
    return res
  } catch (error) {
    console.log('🚀 ~ createSnippet ~ error:', error)
    throw error
  }
}

export const deleteSnippet: DeleteSnippet = async (id) => {
  try {
    const res = await prisma.snippet.update({
      where: {
        id
      },
      data: {
        deleted: true
      }
    })
    console.log('🚀 ~ deleteSnippet:DeleteSnippet ~ res:', res)
  } catch (error) {
    console.log('🚀 ~ deleteSnippet ~ error:', error)
    throw error
  }
}

export const destroySnippet: DestroySnippet = async (id) => {
  try {
    const res = await prisma.snippet.delete({
      where: { id }
    })
    console.log('🚀 ~ constdestroySnippet:DestroySnippet= ~ res:', res)
  } catch (error) {
    console.log('🚀 ~ constdestorySnippet:DestroySnippet= ~ error:', error)
    throw error
  }
}

export const updateSnippetFavorite: UpdateSnippetFavorite = async (id, favorite) => {
  try {
    const res = await prisma.snippet.update({ where: { id }, data: { favorite } })
    console.log('🚀 ~ constupdateSnippetFavorite:UpdateSnippetFavorite= ~ res:', res)
  } catch (error) {
    console.log('🚀 ~ updateSnippetFavorite ~ error:', error)
    throw error
  }
}

export const moveSnippetIntoFolder: MoveSnippetIntoFolder = async (id, folderId) => {
  try {
    const res = await prisma.snippet.update({
      where: { id },
      data: {
        folder: {
          connect: {
            id: folderId
          }
        }
      }
    })
    console.log('🚀 ~ constmoveSnippetIntoFolder:MoveSnippetIntoFolder= ~ res:', res)
  } catch (error) {
    console.log('🚀 ~ moveSnippetIntoFolder ~ error:', error)
    throw error
  }
}

export const moveSnippetIntoInbox = async (id: SnippetDetail['id']) => {
  try {
    const res = await prisma.snippet.update({
      where: { id },
      data: {
        folder: {
          disconnect: true
        }
      }
    })
    console.log('🚀 ~ moveSnippetInfoInbox ~ res:', res)
  } catch (error) {
    console.log('🚀 ~ moveSnippetInfoInbox ~ error:', error)
    throw error
  }
}

export const restoreSnippet = async (id: SnippetDetail['id']) => {
  try {
    const res = await prisma.snippet.update({
      where: { id },
      data: {
        deleted: false
      }
    })
    console.log('🚀 ~ restoreSnippet ~ res:', res)
  } catch (error) {
    console.log('🚀 ~ restoreSnippet ~ error:', error)
    throw error
  }
}

export const formatSnippetContent = async (id: SnippetDetail['id']) => {
  try {
    const snippet = await prisma.snippet.findUnique({
      where: { id },
      select: {
        content: true
      }
    })
    if (!snippet) throw new Error('snippet does not exit')
    const { content } = snippet

    const formattedContent = await prettier.format(content || '', { parser: 'babel' })
    console.log('🚀 ~ formatSnippetContent ~ formattedContent:', formattedContent)

    const res = await prisma.snippet.update({
      where: { id },
      data: {
        content: formattedContent
      }
    })
    console.log('🚀 ~ formatSnippetContent ~ res:', res)
  } catch (error) {
    console.log('🚀 ~ formatSnippetContent ~ error:', error)
    throw error
  }
}
