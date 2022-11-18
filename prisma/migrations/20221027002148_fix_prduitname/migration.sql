/*
  Warnings:

  - You are about to drop the column `roduit` on the `production` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `production` DROP COLUMN `roduit`,
    ADD COLUMN `produit` VARCHAR(6) NULL;
