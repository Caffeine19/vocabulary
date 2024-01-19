import prisma from './index'

import {
  ConnectSnippetWithTag,
  GetSnippetDetail,
  GetSnippetList,
  UpdateSnippetContent
} from '../../shared/snippet'
import { TagItem } from '../../shared/Tag'
import { Snippet } from '@prisma/client'

export const getSnippetList: GetSnippetList = async ({ tagId }) => {
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
      },
      where: {
        tags: {
          some: {
            id: tagId
          }
        }
      }
    })
    console.log('🚀 ~ constgetSnippetList:GetSnippetList= ~ res:', res)
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
    console.log('🚀 ~ constupdateSnippetContent:UpdateSnippetContent= ~ res:', res)
  } catch (error) {
    console.log('🚀 ~ constupdateSnippetDetail:UpdateSnippetContent= ~ error:', error)
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
