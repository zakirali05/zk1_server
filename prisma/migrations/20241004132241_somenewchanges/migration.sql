-- AlterTable
ALTER TABLE "DislikeComment" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "LikeComment" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "LikeComment" ADD CONSTRAINT "LikeComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DislikeComment" ADD CONSTRAINT "DislikeComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
