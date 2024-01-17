import prisma from './index'

const createTagBatch = async () => {
  const newVal = [
    {
      name: 'vue',
      color: '#3FB950'
    },
    {
      name: 'SCSS',
      color: '#FF9BCE'
    },
    {
      name: 'TypeScript',
      color: 'rgba(121, 192, 255, 1)'
    },
    {
      name: 'pinia',
      color: '#F8E3A1'
    }
  ]
  try {
    const taskArr = newVal.map((item) => prisma.tag.create({ data: item }))
    const res = await Promise.all(taskArr)
    console.log('🚀 ~ createTagBatch ~ res:', res)
  } catch (error) {
    console.log('🚀 ~ createTagBatch ~ error:', error)
  }
}

const createSnippetBatch = async () => {
  const newVal = [
    {
      name: 'vue ts init',
      content: '<script setup lang=”ts”></script><template></template><style scoped></style>',
      excerpt: '<script setup lang=”ts”></script><template></template><style scoped></style>'
    },
    {
      name: 'define store',
      content: 'export const snippetStore=defineStore(‘snippet’,()=>{const snippetList})',
      excerpt: 'export const snippetStore=defineStore(‘snippet’,()=>{const snippetList})'
    },
    {
      name: 'define color',
      content: '$primary-color: #007bff;$secondary-color: #6c757d;',
      excerpt: '$primary-color: #007bff;$secondary-color: #6c757d;'
    }
  ]
  try {
    const taskArr = newVal.map((item) => prisma.snippet.create({ data: item }))
    const res = await Promise.all(taskArr)
    console.log('🚀 ~ createSnippetBatch ~ res:', res)
  } catch (error) {
    console.log('🚀 ~ createSnippet ~ error:', error)
  }
}

createSnippetBatch()
createTagBatch()
