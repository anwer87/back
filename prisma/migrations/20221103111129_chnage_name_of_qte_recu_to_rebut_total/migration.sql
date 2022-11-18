/*
  Warnings:

  - You are about to drop the column `qte_recu` on the `production` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `production` DROP COLUMN `qte_recu`,
    ADD COLUMN `rebut_total` VARCHAR(45) NULL;
