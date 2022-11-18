/*
  Warnings:

  - You are about to drop the column `export` on the `production` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `production` DROP COLUMN `export`,
    ADD COLUMN `Export` VARCHAR(45) NULL;
