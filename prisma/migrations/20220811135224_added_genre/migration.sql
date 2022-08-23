-- CreateTable
CREATE TABLE "Genre" (
    "id" BIGSERIAL NOT NULL,
    "genreId" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "moviesId" BIGINT,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Genre" ADD CONSTRAINT "Genre_moviesId_fkey" FOREIGN KEY ("moviesId") REFERENCES "Movies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
