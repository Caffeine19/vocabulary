import prisma from './index'

import {
  ConnectSnippetWithTag,
  CreateSnippet,
  DeleteSnippet,
  DestroySnippet,
  GetSnippetDetail,
  GetSnippetList,
  GetSnippetStatusCount,
  SnippetDetail,
  UpdateSnippetContent,
  UpdateSnippetFavorite,
  UpdateSnippetName
} from '../../shared/snippet'

export const getSnippetList: GetSnippetList = async ({ tagId, status }) => {
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
        createdAt: true
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

        ...(status === 'deleted'
          ? { deleted: true }
          : status === 'favorite'
            ? { favorite: true, deleted: false }
            : status === 'inbox'
              ? { folderId: null, deleted: false }
              : { deleted: false })
      },

      orderBy: {
        createdAt: 'desc'
      }
    })
    console.log('🚀 ~ constgetSnippetList:GetSnippetList= ~ res:', res)
    return res
  } catch (error) {
    console.log('🚀 ~ getSnippetList ~ error:', error)
  }
}

export const getSnippetStatusCount: GetSnippetStatusCount = async () => {
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
  }
}

export const getSnippetDetail: GetSnippetDetail = async (id) => {
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
        folderId: true
      }
    })
    console.log('🚀 ~ constgetSnippetDetail:GetSnippetDetail= ~ res:', res)
    return res
  } catch (error) {
    console.log('🚀 ~ getSnippetDetail ~ error:', error)
  }
}

export const updateSnippetContent: UpdateSnippetContent = async (id, content) => {
  try {
    const res = await prisma.snippet.update({
      where: { id },
      data: { content }
    })
    console.log('🚀 ~ constupdateSnippetContent:UpdateSnippetContent= ~ res:', res)
  } catch (error) {
    console.log('🚀 ~ constupdateSnippetDetail:UpdateSnippetContent= ~ error:', error)
  }
}

export const updateSnippetName: UpdateSnippetName = async (id, name) => {
  try {
    const res = await prisma.snippet.update({
      where: { id },
      data: { name }
    })
    console.log('🚀 ~ updateSnippetName ~ res:', res)
  } catch (error) {
    console.log('🚀 ~ updateSnippetName ~ error:', error)
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
        favorite: true
      }
    })
    return res
  } catch (error) {
    console.log('🚀 ~ createSnippet ~ error:', error)
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
  }
}

export const updateSnippetFavorite: UpdateSnippetFavorite = async (id, favorite) => {
  try {
    const res = await prisma.snippet.update({ where: { id }, data: { favorite } })
    console.log('🚀 ~ constupdateSnippetFavorite:UpdateSnippetFavorite= ~ res:', res)
  } catch (error) {
    console.log('🚀 ~ updateSnippetFavorite ~ error:', error)
  }
}
