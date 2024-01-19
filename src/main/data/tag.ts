import prisma from './index'

export const getTagList = async () => {
  try {
    const res = await prisma.tag.findMany()
    console.log('🚀 ~ getTagList ~ res:', res)
    return res
  } catch (error) {
    console.log('🚀 ~ getTagList ~ error:', error)
  }
}
