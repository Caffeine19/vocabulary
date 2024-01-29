import type { Snippet as PrismaSnippet } from '@prisma/client'
import type { Tag, TagItem } from './Tag'
import type { Folder } from './folder'
import type { Result } from './result'

export type Snippet = PrismaSnippet
export type SnippetItem = Omit<Snippet, 'content'> & { tags: Tag[] }

export type SnippetStatus = 'inbox' | 'all' | 'favorite' | 'deleted'
export type SortAttr = keyof Pick<Snippet, 'name' | 'createdAt'>
export type SortDirection = 'asc' | 'desc'

export interface GetSnippetList {
  (params: {
    tagId?: Tag['id']
    folderId?: Folder['id']
    status?: SnippetStatus
    sortAttr?: SortAttr
    sortDirection?: SortDirection
  }): Promise<Result<SnippetItem[] | undefined>>
}

export type SnippetStatusCount = {
  [key: string]: number
} & { [key in SnippetStatus]: number }

export interface GetSnippetStatusCount {
  (): Promise<Result<SnippetStatusCount | undefined>>
}

export type SnippetDetail = Omit<Snippet, 'excerpt'> & { tags: Tag[]; folder: Folder | null }
export interface GetSnippetDetail {
  (id: Snippet['id']): Promise<Result<SnippetDetail | null>>
}

export interface UpdateSnippetContent {
  (id: SnippetDetail['id'], content: SnippetDetail['content']): Promise<Result<void>>
}

export interface UpdateSnippetName {
  (id: SnippetDetail['id'], name: SnippetDetail['name']): Promise<Result<void>>
}

export interface UpdateSnippetName {
  (id: SnippetDetail['id'], name: SnippetDetail['name']): Promise<Result<void>>
}

export interface ConnectSnippetWithTag {
  (id: SnippetDetail['id'], tagId: TagItem['id']): Promise<void>
}

export interface CreateSnippet {
  (
    params: Pick<Snippet, 'name' | 'content' | 'excerpt'> & { tagId?: Tag['id'] }
  ): Promise<Snippet | undefined>
}

export interface DeleteSnippet {
  (id: SnippetDetail['id']): Promise<void>
}

export interface DestroySnippet {
  (id: SnippetDetail['id']): Promise<void>
}

export interface UpdateSnippetFavorite {
  (id: SnippetDetail['id'], favorite: SnippetDetail['favorite']): Promise<void>
}

export interface MoveSnippetIntoFolder {
  (id: SnippetItem['id'], folderId: Folder['id']): Promise<void>
}

export interface MoveSnippetIntoInbox {
  (id: SnippetItem['id']): Promise<void>
}

export interface RestoreSnippet {
  (id: SnippetDetail['id']): Promise<Result<void>>
}
