/*
  Warnings:

  - You are about to drop the `comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `likes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reference_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `video_references` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `video_tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `videos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_user_id_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_video_id_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_user_id_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_video_id_fkey";

-- DropForeignKey
ALTER TABLE "video_references" DROP CONSTRAINT "video_references_reference_id_fkey";

-- DropForeignKey
ALTER TABLE "video_references" DROP CONSTRAINT "video_references_video_id_fkey";

-- DropForeignKey
ALTER TABLE "video_tags" DROP CONSTRAINT "video_tags_tag_id_fkey";

-- DropForeignKey
ALTER TABLE "video_tags" DROP CONSTRAINT "video_tags_video_id_fkey";

-- DropForeignKey
ALTER TABLE "videos" DROP CONSTRAINT "videos_user_id_fkey";

-- DropTable
DROP TABLE "comments";

-- DropTable
DROP TABLE "likes";

-- DropTable
DROP TABLE "reference_items";

-- DropTable
DROP TABLE "tags";

-- DropTable
DROP TABLE "users";

-- DropTable
DROP TABLE "video_references";

-- DropTable
DROP TABLE "video_tags";

-- DropTable
DROP TABLE "videos";

-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "done" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
