import * as runtime from '@prisma/client/runtime/index-browser';
export const Decimal = runtime.Decimal;
export const NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
export const DbNull = runtime.DbNull;
export const JsonNull = runtime.JsonNull;
export const AnyNull = runtime.AnyNull;
export const ModelName = {
    AppSetting: 'AppSetting',
};
export const TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable',
});
export const AppSettingScalarFieldEnum = {
    key: 'key',
    value: 'value',
    description: 'description',
    updatedAt: 'updatedAt',
};
export const SortOrder = {
    asc: 'asc',
    desc: 'desc',
};
export const JsonNullValueInput = {
    JsonNull: JsonNull,
};
export const QueryMode = {
    default: 'default',
    insensitive: 'insensitive',
};
export const JsonNullValueFilter = {
    DbNull: DbNull,
    JsonNull: JsonNull,
    AnyNull: AnyNull,
};
export const NullsOrder = {
    first: 'first',
    last: 'last',
};
//# sourceMappingURL=prismaNamespaceBrowser.js.map