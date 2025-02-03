/*
  Warnings:

  - You are about to drop the column `startTime` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `addres` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `birthDay` on the `Teacher` table. All the data in the column will be lost.
  - Added the required column `startDate` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthday` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Assignment` DROP COLUMN `startTime`,
    ADD COLUMN `startDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Teacher` DROP COLUMN `addres`,
    DROP COLUMN `birthDay`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `birthday` DATETIME(3) NOT NULL;


