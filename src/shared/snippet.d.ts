import type { Snippet as PrismaSnippet } from '@prisma/client'
import type { Tag } from './Tag'

export type Snippet = PrismaSnippet
export type SnippetItem = Omit<Snippet, 'content'> & { tags: Tag[] }

export interface GetSnippetList {
  (): Promise<SnippetItem[] | undefined>
}

export type SnippetDetail = Omit<Snippet, 'excerpt'> & { tags: Tag[] }
export interface GetSnippetDetail {
  (id: Snippet['id']): Promise<SnippetDetail | null | undefined>
}
