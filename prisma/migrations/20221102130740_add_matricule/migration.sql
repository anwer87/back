/*
  Warnings:

  - A unique constraint covering the columns `[matricule]` on the table `traceability` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `matricule` to the `traceability` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `production` MODIFY `of` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `traceability` ADD COLUMN `matricule` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `traceability_matricule_key` ON `traceability`(`matricule`);
