-- CreateTable
CREATE TABLE "Movies" (
    "id" BIGSERIAL NOT NULL,
    "movieId" BIGINT NOT NULL,
    "movieId_mapped" BIGINT NOT NULL,
    "imdbId" TEXT NOT NULL,
    "tmdbId" TEXT NOT NULL,

    CONSTRAINT "Movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meta" (
    "id" BIGSERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "overview" TEXT,
    "popularity" DOUBLE PRECISION,
    "backdrop" TEXT NOT NULL,
    "poster" TEXT NOT NULL,
    "release_date" TEXT NOT NULL,
    "runtime" BIGINT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "moviesId" BIGINT,

    CONSTRAINT "Meta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cast" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "character" TEXT NOT NULL,
    "profile" TEXT NOT NULL,
    "moviesId" BIGINT,

    CONSTRAINT "Cast_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Crew" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "real_name" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "profile" TEXT NOT NULL,
    "job" TEXT NOT NULL,
    "moviesId" BIGINT,

    CONSTRAINT "Crew_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Videos" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "site" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "is_official" BOOLEAN NOT NULL,
    "moviesId" BIGINT,

    CONSTRAINT "Videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BackDrops" (
    "id" BIGSERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "moviesId" BIGINT,

    CONSTRAINT "BackDrops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Posters" (
    "id" BIGSERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "moviesId" BIGINT,

    CONSTRAINT "Posters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Movies_movieId_key" ON "Movies"("movieId");

-- CreateIndex
CREATE UNIQUE INDEX "Movies_movieId_mapped_key" ON "Movies"("movieId_mapped");

-- AddForeignKey
ALTER TABLE "Meta" ADD CONSTRAINT "Meta_moviesId_fkey" FOREIGN KEY ("moviesId") REFERENCES "Movies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cast" ADD CONSTRAINT "Cast_moviesId_fkey" FOREIGN KEY ("moviesId") REFERENCES "Movies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crew" ADD CONSTRAINT "Crew_moviesId_fkey" FOREIGN KEY ("moviesId") REFERENCES "Movies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Videos" ADD CONSTRAINT "Videos_moviesId_fkey" FOREIGN KEY ("moviesId") REFERENCES "Movies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BackDrops" ADD CONSTRAINT "BackDrops_moviesId_fkey" FOREIGN KEY ("moviesId") REFERENCES "Movies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posters" ADD CONSTRAINT "Posters_moviesId_fkey" FOREIGN KEY ("moviesId") REFERENCES "Movies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
