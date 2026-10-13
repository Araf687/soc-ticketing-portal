import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import argon2 from 'argon2';
import { PrismaClient, TicketPriority, UserLevel } from '../src/generated/prisma/client.js';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

// ---------- 1. Permissions ----------
const PERMISSIONS: Record<string, string> = {
  'ticket.view': 'View tickets',
  'ticket.create': 'Create manual tickets',
  'ticket.update': 'Edit tickets, change status, comment',
  'ticket.assign': 'Assign tickets to users or teams',
  'ticket.merge': 'Merge tickets',
  'ticket.close': 'Resolve and close tickets',
  'alert.view': 'View alerts',
  'alert.promote': 'Create a ticket from an alert',
  'incident.view': 'View incidents',
  'incident.manage': 'Create and edit incidents',
  'asset.view': 'View assets',
  'asset.manage': 'Create and edit assets',
  'rule.view': 'View grouping, suppression, playbook and SLA rules',
  'rule.manage': 'Create and edit those rules',
  'user.view': 'View users',
  'user.manage': 'Create, edit and disable users',
  'role.manage': 'Edit roles and permissions',
  'team.manage': 'Create and edit teams',
  'report.view': 'View reports and dashboard',
  'audit.view': 'View the audit log',
};

// ---------- 2. Roles ----------
const ALL = Object.keys(PERMISSIONS);
const ROLES: { name: string; description: string; permissions: string[] }[] = [
  { name: 'Admin', description: 'Full access', permissions: ALL },
  {
    name: 'SOC Manager',
    description: 'Runs the SOC: tickets, rules, teams, reports',
    permissions: ALL.filter((p) => !['user.manage', 'role.manage'].includes(p)),
  },
  {
    name: 'Analyst',
    description: 'Works tickets and alerts',
    permissions: [
      'ticket.view', 'ticket.create', 'ticket.update', 'ticket.assign', 'ticket.merge', 'ticket.close',
      'alert.view', 'alert.promote', 'incident.view', 'asset.view', 'rule.view', 'report.view',
    ],
  },
  {
    name: 'Viewer',
    description: 'Read only',
    permissions: ['ticket.view', 'alert.view', 'incident.view', 'asset.view', 'report.view'],
  },
];

// ---------- 3. Teams ----------
const TEAMS: { name: string; teamLevel: UserLevel }[] = [
  { name: 'L1 SOC', teamLevel: UserLevel.L1 },
  { name: 'L2 SOC', teamLevel: UserLevel.L2 },
  { name: 'L3 Incident Response', teamLevel: UserLevel.L3 },
];

// ---------- 4. Grouping rules ----------
const GROUPING_RULES = [
  {
    name: 'Login attack',
    description: 'Failed logins from one source IP become one ticket',
    matchFilter: { rule_group: 'authentication_failed' },
    keyFields: ['src_ip'],
    orderNo: 10,
    windowMinutes: 60,
    autoTicketMinLevel: 5,
  },
  {
    name: 'Default',
    description: 'Catch-all: same rule on the same agent becomes one ticket',
    matchFilter: {},
    keyFields: ['rule_id', 'agent_id'],
    orderNo: 1000,
    windowMinutes: 60,
    autoTicketMinLevel: 6,
  },
];

// ---------- 5. SLA (minutes) ----------
const SLA: { priority: TicketPriority; ackMinutes: number; resolveMinutes: number }[] = [
  { priority: TicketPriority.P1, ackMinutes: 15, resolveMinutes: 4 * 60 },
  { priority: TicketPriority.P2, ackMinutes: 30, resolveMinutes: 8 * 60 },
  { priority: TicketPriority.P3, ackMinutes: 2 * 60, resolveMinutes: 24 * 60 },
  { priority: TicketPriority.P4, ackMinutes: 8 * 60, resolveMinutes: 72 * 60 },
];

async function main() {
  // 1. permissions
  for (const [name, description] of Object.entries(PERMISSIONS)) {
    await prisma.permission.upsert({ where: { name }, update: { description }, create: { name, description } });
  }
  const permIds = new Map((await prisma.permission.findMany()).map((p) => [p.name, p.id]));
  console.log(`✔ permissions: ${permIds.size}`);

  // 2. roles + role_permissions
  for (const r of ROLES) {
    const role = await prisma.role.upsert({
      where: { name: r.name },
      update: { description: r.description },
      create: { name: r.name, description: r.description },
    });
    await prisma.rolePermission.createMany({
      data: r.permissions.map((p) => ({ roleId: role.id, permissionId: permIds.get(p)! })),
      skipDuplicates: true,
    });
  }
  console.log(`✔ roles: ${ROLES.map((r) => r.name).join(', ')}`);

  // 3. admin user (from .env)
  const email = process.env.SEED_ADMIN_EMAIL?.toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error('Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD in .env');
  }
  if (password.length < 12) {
    throw new Error('SEED_ADMIN_PASSWORD must be at least 12 characters');
  }
  const admin = await prisma.user.upsert({
    where: { email },
    update: {}, // already exists → don't touch (password stays as is)
    create: {
      email,
      fullName: process.env.SEED_ADMIN_NAME ?? 'System Admin',
      passwordHash: await argon2.hash(password),
      userLevel: UserLevel.L3,
    },
  });
  const adminRole = await prisma.role.findUniqueOrThrow({ where: { name: 'Admin' } });
  await prisma.userRole.upsert({
    where: { userId_roleId: { userId: admin.id, roleId: adminRole.id } },
    update: {},
    create: { userId: admin.id, roleId: adminRole.id },
  });
  console.log(`✔ admin: ${email}`);

  // 4. teams
  for (const t of TEAMS) {
    await prisma.team.upsert({ where: { name: t.name }, update: {}, create: t });
  }
  console.log(`✔ teams: ${TEAMS.length}`);

  // 5. grouping rules
  for (const g of GROUPING_RULES) {
    await prisma.groupingRule.upsert({ where: { name: g.name }, update: {}, create: g });
  }
  console.log(`✔ grouping rules: ${GROUPING_RULES.length}`);

  // 6. SLA policies
  for (const s of SLA) {
    await prisma.slaPolicy.upsert({ where: { priority: s.priority }, update: {}, create: s });
  }
  console.log(`✔ SLA policies: ${SLA.length}`);
}

main()
  .catch((e) => {
    console.error('✘ Seed failed:', e.message);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());