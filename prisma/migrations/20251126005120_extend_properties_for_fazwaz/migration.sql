-- CreateEnum
CREATE TYPE "PropertyStatus" AS ENUM ('FOR_RENT', 'FOR_SALE', 'RENTED', 'SOLD');

-- CreateTable
CREATE TABLE "properties" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "status" "PropertyStatus" NOT NULL DEFAULT 'FOR_RENT',
    "slug" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "property_type" TEXT,
    "location" TEXT,
    "city" TEXT,
    "district" TEXT,
    "area" TEXT,
    "latitude" DECIMAL,
    "longitude" DECIMAL,
    "size_sqm" INTEGER,
    "land_sqm" INTEGER,
    "image_url" TEXT NOT NULL,
    "images" JSON,
    "bedrooms" SMALLINT NOT NULL DEFAULT 0,
    "bathrooms" SMALLINT NOT NULL DEFAULT 0,
    "rent_sale" TEXT,
    "contact_name" TEXT,
    "contact_email" TEXT,
    "contact_phone" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "properties_slug_key" ON "properties"("slug");
