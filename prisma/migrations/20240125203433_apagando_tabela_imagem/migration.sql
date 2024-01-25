/*
  Warnings:

  - You are about to drop the `imagens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "imagens" DROP CONSTRAINT "imagens_projetos_id_fkey";

-- AlterTable
ALTER TABLE "projetos" ADD COLUMN     "imagens" TEXT;

-- DropTable
DROP TABLE "imagens";
