/*
  Warnings:

  - You are about to drop the column `profile_id` on the `CheckoutSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CheckoutSession" DROP COLUMN "profile_id",
ALTER COLUMN "user_id" DROP NOT NULL;
