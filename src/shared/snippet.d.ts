import type { Folder, Snippet as PrismaSnippet } from '@prisma/client'
import type { Tag, TagItem } from './Tag'

export type Snippet = PrismaSnippet
export type SnippetItem = Omit<Snippet, 'content'> & { tags: Tag[] }

export interface GetSnippetList {
  (params: { tagId?: Tag['id'] }): Promise<SnippetItem[] | undefined>
}

export type SnippetDetail = Omit<Snippet, 'excerpt'> & { tags: Tag[]; folder: Folder | null }
export interface GetSnippetDetail {
  (id: Snippet['id']): Promise<SnippetDetail | null | undefined>
}

export interface UpdateSnippetContent {
  (id: SnippetDetail['id'], content: SnippetDetail['content']): Promise<void>
}

export interface ConnectSnippetWithTag {
  (id: SnippetDetail['id'], tagId: TagItem['id']): Promise<void>
}

export interface CreateSnippet {
  (params: Pick<Snippet, 'name' | 'content' | 'excerpt'>): Promise<Snippet | undefined>
}

export interface DeleteSnippet {
  (id: SnippetDetail['id']): Promise<void>
}

export interface DestroySnippet {
  (id: SnippetDetail['id']): Promise<void>
}
