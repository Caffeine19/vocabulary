import type { Tag as PrismaTag } from '@prisma/client'

export type Tag = PrismaTag
export type TagItem = Tag & { snippetCount: number }
export interface GetTagList {
  (): Promise<TagItem[] | undefined>
}
