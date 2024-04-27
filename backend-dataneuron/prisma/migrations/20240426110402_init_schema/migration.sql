-- CreateTable
CREATE TABLE "CountE" (
    "count" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "CountC" (
    "count" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "CountA" (
    "count" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CountE_count_key" ON "CountE"("count");

-- CreateIndex
CREATE UNIQUE INDEX "CountC_count_key" ON "CountC"("count");

-- CreateIndex
CREATE UNIQUE INDEX "CountA_count_key" ON "CountA"("count");
