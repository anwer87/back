/*
  Warnings:

  - You are about to drop the column `commentaire` on the `traceability` table. All the data in the column will be lost.
  - You are about to drop the column `matricule` on the `traceability` table. All the data in the column will be lost.
  - You are about to drop the column `produit` on the `traceability` table. All the data in the column will be lost.
  - You are about to drop the column `qte_saisi` on the `traceability` table. All the data in the column will be lost.
  - You are about to drop the column `reference` on the `traceability` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `traceability` table. All the data in the column will be lost.
  - You are about to drop the column `user` on the `traceability` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[of]` on the table `traceability` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `comment` to the `traceability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emp` to the `traceability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prepare` to the `traceability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rebut` to the `traceability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `traceability` table without a default value. This is not possible if the table is not empty.
  - Made the column `lot` on table `traceability` required. This step will fail if there are existing NULL values in that column.
  - Made the column `of` on table `traceability` required. This step will fail if there are existing NULL values in that column.
  - Made the column `table` on table `traceability` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `traceability` DROP COLUMN `commentaire`,
    DROP COLUMN `matricule`,
    DROP COLUMN `produit`,
    DROP COLUMN `qte_saisi`,
    DROP COLUMN `reference`,
    DROP COLUMN `type`,
    DROP COLUMN `user`,
    ADD COLUMN `comment` VARCHAR(191) NOT NULL,
    ADD COLUMN `emp` VARCHAR(191) NOT NULL,
    ADD COLUMN `prepare` VARCHAR(191) NOT NULL,
    ADD COLUMN `rebut` VARCHAR(191) NOT NULL,
    ADD COLUMN `userName` VARCHAR(191) NOT NULL,
    MODIFY `lot` VARCHAR(191) NOT NULL,
    MODIFY `of` VARCHAR(191) NOT NULL,
    MODIFY `table` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `traceability_of_key` ON `traceability`(`of`);
