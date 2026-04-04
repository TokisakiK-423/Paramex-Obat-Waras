-- CreateTable
CREATE TABLE "Wisata" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "lokasi" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "jamBuka" TEXT,
    "hargaTiket" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wisata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Galeri" (
    "id" SERIAL NOT NULL,
    "wisataId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Galeri_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "wisataId" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "komentar" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "wisataId" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,
    "noHp" TEXT NOT NULL,
    "jumlahTiket" INTEGER NOT NULL,
    "totalBayar" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Galeri" ADD CONSTRAINT "Galeri_wisataId_fkey" FOREIGN KEY ("wisataId") REFERENCES "Wisata"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_wisataId_fkey" FOREIGN KEY ("wisataId") REFERENCES "Wisata"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_wisataId_fkey" FOREIGN KEY ("wisataId") REFERENCES "Wisata"("id") ON DELETE CASCADE ON UPDATE CASCADE;
