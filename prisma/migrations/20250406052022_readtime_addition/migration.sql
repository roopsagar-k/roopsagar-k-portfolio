/*
  Warnings:

  - Added the required column `readTime` to the `blog` table without a default value. This is not possible if the table is not empty.
  - Made the column `excerpt` on table `blog` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "blog" ADD COLUMN     "readTime" TEXT NOT NULL,
ALTER COLUMN "excerpt" SET NOT NULL;
