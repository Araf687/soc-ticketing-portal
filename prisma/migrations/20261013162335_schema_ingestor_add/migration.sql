-- AlterTable
ALTER TABLE "alerts" ADD COLUMN     "agent_ip" INET;

-- CreateTable
CREATE TABLE "ingest_cursors" (
    "source" TEXT NOT NULL,
    "last_alert_id" TEXT,
    "last_polled_at" TIMESTAMPTZ,
    "last_success_at" TIMESTAMPTZ,
    "last_error" TEXT,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "ingest_cursors_pkey" PRIMARY KEY ("source")
);
