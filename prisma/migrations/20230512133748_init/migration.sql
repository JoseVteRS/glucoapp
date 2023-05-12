/*
  Warnings:

  - Added the required column `moment` to the `Control` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Control" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "details" TEXT NOT NULL,
    "moment" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Control_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Control" ("createdAt", "date", "details", "id", "updatedAt", "userId", "value") SELECT "createdAt", "date", "details", "id", "updatedAt", "userId", "value" FROM "Control";
DROP TABLE "Control";
ALTER TABLE "new_Control" RENAME TO "Control";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
