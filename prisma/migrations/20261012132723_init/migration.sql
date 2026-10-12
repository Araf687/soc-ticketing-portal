-- CreateEnum
CREATE TYPE "user_level" AS ENUM ('L1', 'L2', 'L3');

-- CreateEnum
CREATE TYPE "user_status" AS ENUM ('active', 'inactive', 'suspended');

-- CreateEnum
CREATE TYPE "asset_criticality" AS ENUM ('low', 'medium', 'high', 'critical');

-- CreateEnum
CREATE TYPE "agent_status" AS ENUM ('active', 'disconnected', 'pending', 'never_connected');

-- CreateEnum
CREATE TYPE "ticket_priority" AS ENUM ('P1', 'P2', 'P3', 'P4');

-- CreateEnum
CREATE TYPE "ticket_severity" AS ENUM ('very_low', 'medium', 'high');

-- CreateEnum
CREATE TYPE "ticket_status" AS ENUM ('new', 'assigned', 'in_progress', 'escalated', 'on_hold', 'resolved', 'closed', 'false_positive', 'merged');

-- CreateEnum
CREATE TYPE "ticket_source" AS ENUM ('auto', 'promoted', 'manual');

-- CreateEnum
CREATE TYPE "resolution_code" AS ENUM ('true_positive', 'benign', 'false_positive', 'duplicate');

-- CreateEnum
CREATE TYPE "alert_status" AS ENUM ('new', 'linked', 'ignored', 'false_positive');

-- CreateEnum
CREATE TYPE "ticket_category" AS ENUM ('brute_force', 'malware', 'phishing', 'policy_violation', 'misconfiguration', 'other');

-- CreateEnum
CREATE TYPE "ticket_event_type" AS ENUM ('created', 'alert_linked', 'status_changed', 'assigned', 'priority_changed', 'severity_changed', 'escalated', 'commented', 'merged', 'merged_from', 'linked', 'playbook_attached', 'task_completed', 'sla_breached', 'reopened');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "user_level" "user_level" NOT NULL,
    "status" "user_status" NOT NULL DEFAULT 'active',
    "mfa_enabled" BOOLEAN NOT NULL DEFAULT false,
    "mfa_secret_enc" TEXT,
    "last_login_at" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_roles" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "role_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_permissions" (
    "id" UUID NOT NULL,
    "role_id" UUID NOT NULL,
    "permission_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teams" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "team_level" "user_level",
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team_members" (
    "id" UUID NOT NULL,
    "team_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "team_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_sessions" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "refresh_token_hash" TEXT NOT NULL,
    "ip_address" INET,
    "user_agent" TEXT,
    "expires_at" TIMESTAMP(6) NOT NULL,
    "revoked_at" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assets" (
    "id" UUID NOT NULL,
    "wazuh_agent_id" TEXT,
    "ip_address" INET,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "hostname" TEXT,
    "os_name" TEXT,
    "os_version" TEXT,
    "agent_version" TEXT,
    "agent_status" "agent_status" NOT NULL DEFAULT 'active',
    "last_keep_alive" TIMESTAMP(6),
    "owner_user_name" TEXT,
    "owner_user_email" TEXT,
    "department" TEXT,
    "location" TEXT,
    "criticality" "asset_criticality" NOT NULL DEFAULT 'medium',
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "notes" TEXT,
    "group_id" UUID,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asset_groups" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "asset_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suppression_rules" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "match_filter" JSONB NOT NULL,
    "reason" TEXT NOT NULL,
    "expires_at" TIMESTAMPTZ,
    "hit_count" INTEGER NOT NULL DEFAULT 0,
    "is_enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "assetId" UUID,
    "created_by" UUID,

    CONSTRAINT "suppression_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "playbooks" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "default_priority" "ticket_priority",
    "match_filter" JSONB NOT NULL,
    "is_enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "playbooks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "playbook_steps" (
    "id" UUID NOT NULL,
    "playbook_id" UUID NOT NULL,
    "order_no" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "is_required" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "playbook_steps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grouping_rules" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "match_filter" JSONB NOT NULL,
    "key_field" TEXT[],
    "order_no" INTEGER NOT NULL,
    "window_minutes" INTEGER NOT NULL DEFAULT 60,
    "auto_ticket_min_level" INTEGER,
    "is_enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "grouping_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sla_policies" (
    "id" UUID NOT NULL,
    "TicketPriority" TEXT NOT NULL,
    "ack_minutes" INTEGER,
    "resolve_minutes" INTEGER,
    "business_hours_only" BOOLEAN NOT NULL DEFAULT false,
    "escalate_on_breach" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "sla_policies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Incident" (
    "id" UUID NOT NULL,
    "number" BIGINT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT,
    "severity" "ticket_severity" NOT NULL,
    "status" "ticket_status" NOT NULL DEFAULT 'new',
    "lead_user_id" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "Incident_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tickets" (
    "id" UUID NOT NULL,
    "number" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "ticket_status" NOT NULL DEFAULT 'new',
    "priority" "ticket_priority" NOT NULL DEFAULT 'P3',
    "severity" "ticket_severity" NOT NULL DEFAULT 'medium',
    "source" "ticket_source" NOT NULL DEFAULT 'auto',
    "tier" "user_level" NOT NULL DEFAULT 'L1',
    "category" "ticket_category",
    "grouping_rule_id" UUID,
    "grouping_key" TEXT,
    "alert_count" INTEGER NOT NULL DEFAULT 0,
    "max_rule_level" SMALLINT,
    "mitre_tactics" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "mitre_techniques" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "primary_asset_id" UUID,
    "assignee_id" UUID,
    "team_id" UUID,
    "created_by" UUID,
    "incident_id" UUID,
    "playbook_id" UUID,
    "merged_into_id" UUID,
    "first_alert_at" TIMESTAMPTZ,
    "last_alert_at" TIMESTAMPTZ,
    "acknowledged_at" TIMESTAMPTZ,
    "escalated_at" TIMESTAMPTZ,
    "resolved_at" TIMESTAMPTZ,
    "closed_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "resolution_code" "resolution_code",
    "resolution_note" TEXT,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alerts" (
    "id" UUID NOT NULL,
    "wazuh_alert_id" TEXT NOT NULL,
    "asset_id" UUID,
    "ticket_id" UUID,
    "status" "alert_status" NOT NULL DEFAULT 'new',
    "rule_id" TEXT NOT NULL,
    "rule_level" SMALLINT NOT NULL,
    "rule_description" TEXT,
    "rule_groups" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "mitre_tactics" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "mitre_techniques" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "agent_id" TEXT,
    "agent_name" TEXT,
    "src_ip" INET,
    "dst_ip" INET,
    "src_user" TEXT,
    "dst_user" TEXT,
    "location" TEXT,
    "event_time" TIMESTAMPTZ,
    "alert_time" TIMESTAMPTZ NOT NULL,
    "received_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "grouping_key" TEXT,
    "raw" JSONB NOT NULL,

    CONSTRAINT "alerts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket_events" (
    "id" BIGSERIAL NOT NULL,
    "ticket_id" UUID NOT NULL,
    "actor_id" UUID,
    "event_type" "ticket_event_type" NOT NULL,
    "old_value" JSONB,
    "new_value" JSONB,
    "note" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ticket_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" UUID NOT NULL,
    "ticket_id" UUID NOT NULL,
    "author_id" UUID,
    "body" TEXT NOT NULL,
    "is_internal" BOOLEAN NOT NULL DEFAULT true,
    "edited_at" TIMESTAMPTZ,
    "deleted_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_name_key" ON "permissions"("name");

-- CreateIndex
CREATE INDEX "user_roles_user_id_idx" ON "user_roles"("user_id");

-- CreateIndex
CREATE INDEX "user_roles_role_id_idx" ON "user_roles"("role_id");

-- CreateIndex
CREATE INDEX "role_permissions_role_id_idx" ON "role_permissions"("role_id");

-- CreateIndex
CREATE INDEX "role_permissions_permission_id_idx" ON "role_permissions"("permission_id");

-- CreateIndex
CREATE UNIQUE INDEX "role_permissions_role_id_permission_id_key" ON "role_permissions"("role_id", "permission_id");

-- CreateIndex
CREATE UNIQUE INDEX "teams_name_key" ON "teams"("name");

-- CreateIndex
CREATE INDEX "team_members_team_id_idx" ON "team_members"("team_id");

-- CreateIndex
CREATE INDEX "team_members_user_id_idx" ON "team_members"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "team_members_team_id_user_id_key" ON "team_members"("team_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_sessions_refresh_token_hash_key" ON "user_sessions"("refresh_token_hash");

-- CreateIndex
CREATE INDEX "user_sessions_user_id_idx" ON "user_sessions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "assets_wazuh_agent_id_key" ON "assets"("wazuh_agent_id");

-- CreateIndex
CREATE INDEX "assets_hostname_ip_address_idx" ON "assets"("hostname", "ip_address");

-- CreateIndex
CREATE UNIQUE INDEX "asset_groups_name_key" ON "asset_groups"("name");

-- CreateIndex
CREATE UNIQUE INDEX "playbooks_name_key" ON "playbooks"("name");

-- CreateIndex
CREATE INDEX "playbook_steps_playbook_id_idx" ON "playbook_steps"("playbook_id");

-- CreateIndex
CREATE UNIQUE INDEX "sla_policies_TicketPriority_key" ON "sla_policies"("TicketPriority");

-- CreateIndex
CREATE UNIQUE INDEX "Incident_number_key" ON "Incident"("number");

-- CreateIndex
CREATE UNIQUE INDEX "tickets_number_key" ON "tickets"("number");

-- CreateIndex
CREATE INDEX "tickets_status_priority_idx" ON "tickets"("status", "priority");

-- CreateIndex
CREATE INDEX "tickets_assignee_id_status_idx" ON "tickets"("assignee_id", "status");

-- CreateIndex
CREATE INDEX "tickets_team_id_status_idx" ON "tickets"("team_id", "status");

-- CreateIndex
CREATE INDEX "tickets_grouping_rule_id_grouping_key_status_idx" ON "tickets"("grouping_rule_id", "grouping_key", "status");

-- CreateIndex
CREATE INDEX "tickets_primary_asset_id_idx" ON "tickets"("primary_asset_id");

-- CreateIndex
CREATE INDEX "tickets_incident_id_idx" ON "tickets"("incident_id");

-- CreateIndex
CREATE INDEX "tickets_created_at_idx" ON "tickets"("created_at" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "alerts_wazuh_alert_id_key" ON "alerts"("wazuh_alert_id");

-- CreateIndex
CREATE INDEX "alerts_status_alert_time_idx" ON "alerts"("status", "alert_time" DESC);

-- CreateIndex
CREATE INDEX "alerts_ticket_id_idx" ON "alerts"("ticket_id");

-- CreateIndex
CREATE INDEX "alerts_asset_id_alert_time_idx" ON "alerts"("asset_id", "alert_time" DESC);

-- CreateIndex
CREATE INDEX "alerts_rule_id_alert_time_idx" ON "alerts"("rule_id", "alert_time" DESC);

-- CreateIndex
CREATE INDEX "ticket_events_ticket_id_created_at_idx" ON "ticket_events"("ticket_id", "created_at");

-- CreateIndex
CREATE INDEX "ticket_events_event_type_created_at_idx" ON "ticket_events"("event_type", "created_at");

-- CreateIndex
CREATE INDEX "comments_ticket_id_created_at_idx" ON "comments"("ticket_id", "created_at");

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "asset_groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suppression_rules" ADD CONSTRAINT "suppression_rules_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suppression_rules" ADD CONSTRAINT "suppression_rules_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "playbook_steps" ADD CONSTRAINT "playbook_steps_playbook_id_fkey" FOREIGN KEY ("playbook_id") REFERENCES "playbooks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_lead_user_id_fkey" FOREIGN KEY ("lead_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_grouping_rule_id_fkey" FOREIGN KEY ("grouping_rule_id") REFERENCES "grouping_rules"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_primary_asset_id_fkey" FOREIGN KEY ("primary_asset_id") REFERENCES "assets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_assignee_id_fkey" FOREIGN KEY ("assignee_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_incident_id_fkey" FOREIGN KEY ("incident_id") REFERENCES "Incident"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_playbook_id_fkey" FOREIGN KEY ("playbook_id") REFERENCES "playbooks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_merged_into_id_fkey" FOREIGN KEY ("merged_into_id") REFERENCES "tickets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "assets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_events" ADD CONSTRAINT "ticket_events_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_events" ADD CONSTRAINT "ticket_events_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ticket number 1001 theke shuru hobe
ALTER SEQUENCE tickets_number_seq RESTART WITH 1001;




-- ticket_events er history keu edit/delete korte parbe na
CREATE OR REPLACE FUNCTION forbid_modify() RETURNS trigger AS $$
BEGIN
  RAISE EXCEPTION '% is append-only', TG_TABLE_NAME;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ticket_events_no_update BEFORE UPDATE OR DELETE ON ticket_events
  FOR EACH ROW EXECUTE FUNCTION forbid_modify();