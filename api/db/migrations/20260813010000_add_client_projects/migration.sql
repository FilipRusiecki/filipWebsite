-- CreateTable
CREATE TABLE "ClientProject" (
    "id" SERIAL NOT NULL,
    "clientName" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "nextChargeDate" TIMESTAMP(3),
    "lastChargedAt" TIMESTAMP(3),
    "calcJson" TEXT NOT NULL,
    "oneTimeTotal" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "monthlyTotal" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "firstYearTotal" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClientProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientProjectFeature" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "hours" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "rate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "doneAt" TIMESTAMP(3),
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClientProjectFeature_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClientProjectFeature" ADD CONSTRAINT "ClientProjectFeature_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "ClientProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
