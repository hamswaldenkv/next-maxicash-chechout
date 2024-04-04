-- CreateTable
CREATE TABLE "CheckoutSession" (
    "id" UUID NOT NULL,
    "user_id" TEXT NOT NULL,
    "profile_id" TEXT,
    "price_id" UUID,
    "type" TEXT NOT NULL DEFAULT 'maxicash',
    "status" TEXT NOT NULL DEFAULT 'created',
    "reference" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "metadata" TEXT,
    "product_id" TEXT,
    "product_kind" TEXT,
    "product_name" TEXT,
    "product_image" TEXT,
    "api_request" TEXT,
    "api_response" TEXT,
    "created_at" INTEGER NOT NULL,
    "updated_at" INTEGER,
    "deleted_at" INTEGER,

    CONSTRAINT "CheckoutSession_pkey" PRIMARY KEY ("id")
);
