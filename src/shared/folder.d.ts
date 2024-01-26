import { Folder as PrismaFolder } from '@prisma/client'
export type Folder = PrismaFolder
export type FolderItem = Folder & { snippetCount: number; childrenCount: number }
export interface GetFolderList {
  (): Promise<FolderItem[] | undefined>
}
