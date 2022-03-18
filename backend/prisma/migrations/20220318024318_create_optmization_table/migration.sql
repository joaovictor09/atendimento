-- CreateTable
CREATE TABLE "optmizations" (
    "id" TEXT NOT NULL,
    "last_optimization" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "optimization" BOOLEAN NOT NULL DEFAULT false,
    "client_id" TEXT NOT NULL,

    CONSTRAINT "optmizations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "optmizations" ADD CONSTRAINT "optmizations_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
