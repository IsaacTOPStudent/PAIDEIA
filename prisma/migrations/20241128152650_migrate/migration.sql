/*
  Warnings:

  - You are about to drop the `_DisorderToReport` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `disorderId` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_DisorderToReport` DROP FOREIGN KEY `_DisorderToReport_A_fkey`;

-- DropForeignKey
ALTER TABLE `_DisorderToReport` DROP FOREIGN KEY `_DisorderToReport_B_fkey`;

-- AlterTable
ALTER TABLE `Report` ADD COLUMN `disorderId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_DisorderToReport`;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_disorderId_fkey` FOREIGN KEY (`disorderId`) REFERENCES `Disorder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
