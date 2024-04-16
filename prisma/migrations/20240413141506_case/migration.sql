-- CreateTable
CREATE TABLE "CaseStudy" (
    "id" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "project_scope" TEXT NOT NULL,
    "project_deliverables" TEXT NOT NULL,
    "customer" TEXT NOT NULL,
    "key_tools" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CaseStudy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CaseStudy_title_key" ON "CaseStudy"("title");
