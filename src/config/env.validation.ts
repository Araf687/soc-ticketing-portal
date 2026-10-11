const REQUIRED = [
  'PORT',
  'FRONTEND_URL',
  'DATABASE_URL',
  'REDIS_HOST',
  'REDIS_PORT',
] as const;

export function validateEnv(config: Record<string, unknown>) {
  const missing = REQUIRED.filter((key) => !config[key]);
  if (missing.length > 0) {
    throw new Error(
      `Missing environment variables: ${missing.join(', ')}. Check backend/.env`,
    );
  }
  for (const key of ['PORT', 'REDIS_PORT'] as const) {
    if (Number.isNaN(Number(config[key]))) {
      throw new Error(`${key} must be a number, got "${String(config[key])}"`);
    }
  }
  return config;
}
