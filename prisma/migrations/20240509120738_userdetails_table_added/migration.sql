-- CreateTable
CREATE TABLE "UserDetails" (
    "id" TEXT NOT NULL,
    "where_did_you_hear_about_us" TEXT,
    "previously_worked_for_saraca" TEXT,
    "country" TEXT,
    "name" TEXT,
    "address" TEXT,
    "country_code" TEXT,
    "mobile_no" TEXT,
    "relevant_experience" DOUBLE PRECISION,
    "relevant_experience_role_description" TEXT,
    "total_experience" DOUBLE PRECISION,
    "total_experince_role_description" TEXT,
    "school_university" TEXT,
    "degree" TEXT,
    "field_of_study" TEXT,
    "cgpa" DOUBLE PRECISION,
    "skills" TEXT,
    "resume" TEXT,
    "linkedin_account" TEXT,
    "agreement_for_contact" TEXT,
    "gender" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "positionId" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "UserDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserDetails_positionId_userId_key" ON "UserDetails"("positionId", "userId");

-- AddForeignKey
ALTER TABLE "UserDetails" ADD CONSTRAINT "UserDetails_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDetails" ADD CONSTRAINT "UserDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
