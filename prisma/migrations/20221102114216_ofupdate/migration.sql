/*
  Warnings:

  - A unique constraint covering the columns `[of]` on the table `production` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `production_of_key` ON `production`(`of`);
