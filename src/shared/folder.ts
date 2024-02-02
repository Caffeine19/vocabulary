import { Folder as PrismaFolder } from '@prisma/client'

import type { Result } from './result'

export type Folder = PrismaFolder
export type FolderItem = Folder & { snippetCount: number; childrenCount: number }
export interface GetFolderList {
  (): Promise<FolderItem[] | undefined>
}

export interface CreateFolder {
  (params: { name: Folder['name']; parentId: Folder['parentId'] }): Promise<Result<void>>
}

export interface DeleteFolder {
  (id: FolderItem['id']): Promise<Result<void>>
}
