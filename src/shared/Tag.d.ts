import type { Tag as PrismaTag } from '@prisma/client'

export type Tag = PrismaTag
export interface GetTagList {
  (): Promise<Tag[]>
}
