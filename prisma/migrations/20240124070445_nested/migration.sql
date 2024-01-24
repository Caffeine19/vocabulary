-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Folder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "parentId" INTEGER,
    CONSTRAINT "Folder_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Folder" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Folder" ("createdAt", "id", "name") SELECT "createdAt", "id", "name" FROM "Folder";
DROP TABLE "Folder";
ALTER TABLE "new_Folder" RENAME TO "Folder";
CREATE UNIQUE INDEX "Folder_name_key" ON "Folder"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
