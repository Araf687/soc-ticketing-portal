import * as runtime from '@prisma/client/runtime/client';
const config = {
    previewFeatures: [],
    clientVersion: '7.10.0',
    engineVersion: '0edf323efd1d98336f3f0a68684b56f689b900d3',
    activeProvider: 'postgresql',
    inlineSchema: 'generator client {\n  provider     = "prisma-client"\n  output       = "../src/generated/prisma"\n  moduleFormat = "esm"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\n// Company-wide settings (key/value)\nmodel AppSetting {\n  key         String   @id\n  value       Json\n  description String?\n  updatedAt   DateTime @updatedAt @map("updated_at") @db.Timestamptz\n\n  @@map("app_settings")\n}\n',
    runtimeDataModel: {
        models: {},
        enums: {},
        types: {},
    },
    parameterizationSchema: {
        strings: [],
        graph: '',
    },
};
config.runtimeDataModel = JSON.parse('{"models":{"AppSetting":{"fields":[{"name":"key","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"Json"},{"name":"description","kind":"scalar","type":"String"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"}],"dbName":"app_settings","schema":null}},"enums":{},"types":{}}');
config.parameterizationSchema = {
    strings: JSON.parse('["where","AppSetting.findUnique","AppSetting.findUniqueOrThrow","orderBy","cursor","AppSetting.findFirst","AppSetting.findFirstOrThrow","AppSetting.findMany","data","AppSetting.createOne","AppSetting.createMany","AppSetting.createManyAndReturn","AppSetting.updateOne","AppSetting.updateMany","AppSetting.updateManyAndReturn","create","update","AppSetting.upsertOne","AppSetting.deleteOne","AppSetting.deleteMany","having","_count","_min","_max","AppSetting.groupBy","AppSetting.aggregate","AND","OR","NOT","key","value","description","updatedAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","string_contains","string_starts_with","string_ends_with","array_starts_with","array_ends_with","array_contains","set"]'),
    graph: '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',
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await import('node:buffer');
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await import('@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs'),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await import('@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs');
        return await decodeBase64AsWasm(wasm);
    },
    importName: './query_compiler_fast_bg.js',
};
export function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map