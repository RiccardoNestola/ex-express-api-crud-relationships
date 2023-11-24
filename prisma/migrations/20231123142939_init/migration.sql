/*
  Warnings:

  - You are about to alter the column `title` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE `Post` MODIFY `title` VARCHAR(100) NOT NULL,
    MODIFY `image` TEXT NULL,
    MODIFY `content` TEXT NOT NULL,
    MODIFY `published` BOOLEAN NOT NULL DEFAULT false;
