-- RedefineTables
PRAGMA foreign_keys = OFF;

CREATE TABLE "new_Tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "name" TEXT NOT NULL, "color" TEXT, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO
    "new_Tag" ("color", "id", "name")
SELECT "color", "id", "name"
FROM "Tag";

DROP TABLE "Tag";

ALTER TABLE "new_Tag" RENAME TO "Tag";

CREATE UNIQUE INDEX "Tag_name_key" ON "Tag" ("name");

CREATE TABLE "new_Snippet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "name" TEXT, "content" TEXT, "excerpt" TEXT, "favorite" BOOLEAN NOT NULL DEFAULT false, "deleted" BOOLEAN NOT NULL DEFAULT false, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "folderId" INTEGER, CONSTRAINT "Snippet_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

INSERT INTO
    "new_Snippet" (
        "content", "deleted", "excerpt", "favorite", "folderId", "id", "name"
    )
SELECT "content", "deleted", "excerpt", "favorite", "folderId", "id", "name"
FROM "Snippet";

DROP TABLE "Snippet";

ALTER TABLE "new_Snippet" RENAME TO "Snippet";

CREATE TABLE "new_Folder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "name" TEXT NOT NULL, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO
    "new_Folder" ("id", "name")
SELECT "id", "name"
FROM "Folder";

DROP TABLE "Folder";

ALTER TABLE "new_Folder" RENAME TO "Folder";

CREATE UNIQUE INDEX "Folder_name_key" ON "Folder" ("name");

PRAGMA foreign_key_check;

PRAGMA foreign_keys = ON;