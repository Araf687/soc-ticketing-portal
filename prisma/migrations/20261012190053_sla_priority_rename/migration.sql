/*
  Warnings:

  - You are about to drop the column `TicketPriority` on the `sla_policies` table. All the data in the column will be lost.
  - You are about to drop the column `assetId` on the `suppression_rules` table. All the data in the column will be lost.
  - You are about to drop the `Incident` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `grouping_rules` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[priority]` on the table `sla_policies` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,role_id]` on the table `user_roles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `priority` to the `sla_policies` table without a default value. This is not possible if the table is not empty.
  - Made the column `ack_minutes` on table `sla_policies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `resolve_minutes` on table `sla_policies` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Incident" DROP CONSTRAINT "Incident_lead_user_id_fkey";

-- DropForeignKey
ALTER TABLE "suppression_rules" DROP CONSTRAINT "suppression_rules_assetId_fkey";

-- DropForeignKey
ALTER TABLE "team_members" DROP CONSTRAINT "team_members_user_id_fkey";

-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_incident_id_fkey";

-- DropIndex
DROP INDEX "sla_policies_TicketPriority_key";

-- AlterTable
ALTER TABLE "grouping_rules" ALTER COLUMN "order_no" SET DEFAULT 100,
ALTER COLUMN "auto_ticket_min_level" SET DEFAULT 6;

-- AlterTable
ALTER TABLE "sla_policies" DROP COLUMN "TicketPriority",
ADD COLUMN     "priority" "ticket_priority" NOT NULL,
ALTER COLUMN "ack_minutes" SET NOT NULL,
ALTER COLUMN "resolve_minutes" SET NOT NULL,
ALTER COLUMN "escalate_on_breach" SET DEFAULT true;

-- AlterTable
ALTER TABLE "suppression_rules" DROP COLUMN "assetId";

-- DropTable
DROP TABLE "Incident";

-- CreateTable
CREATE TABLE "incidents" (
    "id" UUID NOT NULL,
    "number" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT,
    "severity" "ticket_severity" NOT NULL,
    "status" "ticket_status" NOT NULL DEFAULT 'new',
    "lead_user_id" UUID,
    "closed_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "incidents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "incidents_number_key" ON "incidents"("number");

-- CreateIndex
CREATE INDEX "incidents_status_idx" ON "incidents"("status");

-- CreateIndex
CREATE UNIQUE INDEX "grouping_rules_name_key" ON "grouping_rules"("name");

-- CreateIndex
CREATE UNIQUE INDEX "sla_policies_priority_key" ON "sla_policies"("priority");

-- CreateIndex
CREATE UNIQUE INDEX "user_roles_user_id_role_id_key" ON "user_roles"("user_id", "role_id");

-- AddForeignKey
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incidents" ADD CONSTRAINT "incidents_lead_user_id_fkey" FOREIGN KEY ("lead_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_incident_id_fkey" FOREIGN KEY ("incident_id") REFERENCES "incidents"("id") ON DELETE SET NULL ON UPDATE CASCADE;
