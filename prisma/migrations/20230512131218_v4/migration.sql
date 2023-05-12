-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Control" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "details" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Control_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Control" ("createdAt", "details", "id", "updatedAt", "userId", "value") SELECT "createdAt", "details", "id", "updatedAt", "userId", "value" FROM "Control";
DROP TABLE "Control";
ALTER TABLE "new_Control" RENAME TO "Control";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
