import prisma from './index'

import { GetSnippetDetail, GetSnippetList, UpdateSnippetContent } from '../../shared/snippet'

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

export const getSnippetDetail: GetSnippetDetail = async (id) => {
  try {
    const res = await prisma.snippet.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        content: true,
        tags: {
          select: {
            id: true,
            name: true,
            color: true
          }
        }
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
  } catch (error) {
    console.log('🚀 ~ constupdateSnippetDetail:UpdateSnippetContent= ~ error:', error)
  }
}
