import type { Snippet as PrismaSnippet } from '@prisma/client'
import type { Tag } from './Tag'

export type Snippet = PrismaSnippet
export type SnippetItem = Omit<Snippet, 'content'> & { tags: Tag[] }

export interface GetSnippetList {
  (): Promise<SnippetItem[] | undefined>
}
