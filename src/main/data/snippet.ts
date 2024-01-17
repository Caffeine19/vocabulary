import prisma from './index'

export const getSnippetList = async () => {
  try {
    const res = await prisma.snippet.findMany()
    return res
  } catch (error) {
    console.log('🚀 ~ getSnippetList ~ error:', error)
  }
}
