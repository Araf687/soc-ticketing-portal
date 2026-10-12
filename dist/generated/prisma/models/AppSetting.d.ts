import type * as runtime from '@prisma/client/runtime/client';
import type * as Prisma from '../internal/prismaNamespace.js';
export type AppSettingModel = runtime.Types.Result.DefaultSelection<Prisma.$AppSettingPayload>;
export type AggregateAppSetting = {
    _count: AppSettingCountAggregateOutputType | null;
    _min: AppSettingMinAggregateOutputType | null;
    _max: AppSettingMaxAggregateOutputType | null;
};
export type AppSettingMinAggregateOutputType = {
    key: string | null;
    description: string | null;
    updatedAt: Date | null;
};
export type AppSettingMaxAggregateOutputType = {
    key: string | null;
    description: string | null;
    updatedAt: Date | null;
};
export type AppSettingCountAggregateOutputType = {
    key: number;
    value: number;
    description: number;
    updatedAt: number;
    _all: number;
};
export type AppSettingMinAggregateInputType = {
    key?: true;
    description?: true;
    updatedAt?: true;
};
export type AppSettingMaxAggregateInputType = {
    key?: true;
    description?: true;
    updatedAt?: true;
};
export type AppSettingCountAggregateInputType = {
    key?: true;
    value?: true;
    description?: true;
    updatedAt?: true;
    _all?: true;
};
export type AppSettingAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AppSettingWhereInput;
    orderBy?: Prisma.AppSettingOrderByWithRelationInput | Prisma.AppSettingOrderByWithRelationInput[];
    cursor?: Prisma.AppSettingWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AppSettingCountAggregateInputType;
    _min?: AppSettingMinAggregateInputType;
    _max?: AppSettingMaxAggregateInputType;
};
export type GetAppSettingAggregateType<T extends AppSettingAggregateArgs> = {
    [P in keyof T & keyof AggregateAppSetting]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAppSetting[P]> : Prisma.GetScalarType<T[P], AggregateAppSetting[P]>;
};
export type AppSettingGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AppSettingWhereInput;
    orderBy?: Prisma.AppSettingOrderByWithAggregationInput | Prisma.AppSettingOrderByWithAggregationInput[];
    by: Prisma.AppSettingScalarFieldEnum[] | Prisma.AppSettingScalarFieldEnum;
    having?: Prisma.AppSettingScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AppSettingCountAggregateInputType | true;
    _min?: AppSettingMinAggregateInputType;
    _max?: AppSettingMaxAggregateInputType;
};
export type AppSettingGroupByOutputType = {
    key: string;
    value: runtime.JsonValue;
    description: string | null;
    updatedAt: Date;
    _count: AppSettingCountAggregateOutputType | null;
    _min: AppSettingMinAggregateOutputType | null;
    _max: AppSettingMaxAggregateOutputType | null;
};
export type GetAppSettingGroupByPayload<T extends AppSettingGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AppSettingGroupByOutputType, T['by']> & {
    [P in keyof T & keyof AppSettingGroupByOutputType]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AppSettingGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AppSettingGroupByOutputType[P]>;
}>>;
export type AppSettingWhereInput = {
    AND?: Prisma.AppSettingWhereInput | Prisma.AppSettingWhereInput[];
    OR?: Prisma.AppSettingWhereInput[];
    NOT?: Prisma.AppSettingWhereInput | Prisma.AppSettingWhereInput[];
    key?: Prisma.StringFilter<'AppSetting'> | string;
    value?: Prisma.JsonFilter<'AppSetting'>;
    description?: Prisma.StringNullableFilter<'AppSetting'> | string | null;
    updatedAt?: Prisma.DateTimeFilter<'AppSetting'> | Date | string;
};
export type AppSettingOrderByWithRelationInput = {
    key?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AppSettingWhereUniqueInput = Prisma.AtLeast<{
    key?: string;
    AND?: Prisma.AppSettingWhereInput | Prisma.AppSettingWhereInput[];
    OR?: Prisma.AppSettingWhereInput[];
    NOT?: Prisma.AppSettingWhereInput | Prisma.AppSettingWhereInput[];
    value?: Prisma.JsonFilter<'AppSetting'>;
    description?: Prisma.StringNullableFilter<'AppSetting'> | string | null;
    updatedAt?: Prisma.DateTimeFilter<'AppSetting'> | Date | string;
}, 'key'>;
export type AppSettingOrderByWithAggregationInput = {
    key?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.AppSettingCountOrderByAggregateInput;
    _max?: Prisma.AppSettingMaxOrderByAggregateInput;
    _min?: Prisma.AppSettingMinOrderByAggregateInput;
};
export type AppSettingScalarWhereWithAggregatesInput = {
    AND?: Prisma.AppSettingScalarWhereWithAggregatesInput | Prisma.AppSettingScalarWhereWithAggregatesInput[];
    OR?: Prisma.AppSettingScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AppSettingScalarWhereWithAggregatesInput | Prisma.AppSettingScalarWhereWithAggregatesInput[];
    key?: Prisma.StringWithAggregatesFilter<'AppSetting'> | string;
    value?: Prisma.JsonWithAggregatesFilter<'AppSetting'>;
    description?: Prisma.StringNullableWithAggregatesFilter<'AppSetting'> | string | null;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<'AppSetting'> | Date | string;
};
export type AppSettingCreateInput = {
    key: string;
    value: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    description?: string | null;
    updatedAt?: Date | string;
};
export type AppSettingUncheckedCreateInput = {
    key: string;
    value: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    description?: string | null;
    updatedAt?: Date | string;
};
export type AppSettingUpdateInput = {
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AppSettingUncheckedUpdateInput = {
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AppSettingCreateManyInput = {
    key: string;
    value: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    description?: string | null;
    updatedAt?: Date | string;
};
export type AppSettingUpdateManyMutationInput = {
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AppSettingUncheckedUpdateManyInput = {
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AppSettingCountOrderByAggregateInput = {
    key?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AppSettingMaxOrderByAggregateInput = {
    key?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AppSettingMinOrderByAggregateInput = {
    key?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type AppSettingSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    key?: boolean;
    value?: boolean;
    description?: boolean;
    updatedAt?: boolean;
}, ExtArgs['result']['appSetting']>;
export type AppSettingSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    key?: boolean;
    value?: boolean;
    description?: boolean;
    updatedAt?: boolean;
}, ExtArgs['result']['appSetting']>;
export type AppSettingSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    key?: boolean;
    value?: boolean;
    description?: boolean;
    updatedAt?: boolean;
}, ExtArgs['result']['appSetting']>;
export type AppSettingSelectScalar = {
    key?: boolean;
    value?: boolean;
    description?: boolean;
    updatedAt?: boolean;
};
export type AppSettingOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<'key' | 'value' | 'description' | 'updatedAt', ExtArgs['result']['appSetting']>;
export type $AppSettingPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: 'AppSetting';
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        key: string;
        value: runtime.JsonValue;
        description: string | null;
        updatedAt: Date;
    }, ExtArgs['result']['appSetting']>;
    composites: {};
};
export type AppSettingGetPayload<S extends boolean | null | undefined | AppSettingDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AppSettingPayload, S>;
export type AppSettingCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AppSettingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AppSettingCountAggregateInputType | true;
};
export interface AppSettingDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['AppSetting'];
        meta: {
            name: 'AppSetting';
        };
    };
    findUnique<T extends AppSettingFindUniqueArgs>(args: Prisma.SelectSubset<T, AppSettingFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AppSettingClient<runtime.Types.Result.GetResult<Prisma.$AppSettingPayload<ExtArgs>, T, 'findUnique', GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AppSettingFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AppSettingFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AppSettingClient<runtime.Types.Result.GetResult<Prisma.$AppSettingPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AppSettingFindFirstArgs>(args?: Prisma.SelectSubset<T, AppSettingFindFirstArgs<ExtArgs>>): Prisma.Prisma__AppSettingClient<runtime.Types.Result.GetResult<Prisma.$AppSettingPayload<ExtArgs>, T, 'findFirst', GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AppSettingFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AppSettingFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AppSettingClient<runtime.Types.Result.GetResult<Prisma.$AppSettingPayload<ExtArgs>, T, 'findFirstOrThrow', GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AppSettingFindManyArgs>(args?: Prisma.SelectSubset<T, AppSettingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AppSettingPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>>;
    create<T extends AppSettingCreateArgs>(args: Prisma.SelectSubset<T, AppSettingCreateArgs<ExtArgs>>): Prisma.Prisma__AppSettingClient<runtime.Types.Result.GetResult<Prisma.$AppSettingPayload<ExtArgs>, T, 'create', GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AppSettingCreateManyArgs>(args?: Prisma.SelectSubset<T, AppSettingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AppSettingCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AppSettingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AppSettingPayload<ExtArgs>, T, 'createManyAndReturn', GlobalOmitOptions>>;
    delete<T extends AppSettingDeleteArgs>(args: Prisma.SelectSubset<T, AppSettingDeleteArgs<ExtArgs>>): Prisma.Prisma__AppSettingClient<runtime.Types.Result.GetResult<Prisma.$AppSettingPayload<ExtArgs>, T, 'delete', GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AppSettingUpdateArgs>(args: Prisma.SelectSubset<T, AppSettingUpdateArgs<ExtArgs>>): Prisma.Prisma__AppSettingClient<runtime.Types.Result.GetResult<Prisma.$AppSettingPayload<ExtArgs>, T, 'update', GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AppSettingDeleteManyArgs>(args?: Prisma.SelectSubset<T, AppSettingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AppSettingUpdateManyArgs>(args: Prisma.SelectSubset<T, AppSettingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AppSettingUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AppSettingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AppSettingPayload<ExtArgs>, T, 'updateManyAndReturn', GlobalOmitOptions>>;
    upsert<T extends AppSettingUpsertArgs>(args: Prisma.SelectSubset<T, AppSettingUpsertArgs<ExtArgs>>): Prisma.Prisma__AppSettingClient<runtime.Types.Result.GetResult<Prisma.$AppSettingPayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AppSettingCountArgs>(args?: Prisma.Subset<T, AppSettingCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AppSettingCountAggregateOutputType> : number>;
    aggregate<T extends AppSettingAggregateArgs>(args: Prisma.Subset<T, AppSettingAggregateArgs>): Prisma.PrismaPromise<GetAppSettingAggregateType<T>>;
    groupBy<T extends AppSettingGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends (Prisma.True extends HasSelectOrTake ? {
        orderBy: AppSettingGroupByArgs['orderBy'];
    } : {
        orderBy?: AppSettingGroupByArgs['orderBy'];
    }), OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends (T['by'] extends never[] ? Prisma.True : Prisma.False), InputErrors extends (ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields])>(args: Prisma.SubsetIntersection<T, AppSettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppSettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AppSettingFieldRefs;
}
export interface Prisma__AppSettingClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AppSettingFieldRefs {
    readonly key: Prisma.FieldRef<'AppSetting', 'String'>;
    readonly value: Prisma.FieldRef<'AppSetting', 'Json'>;
    readonly description: Prisma.FieldRef<'AppSetting', 'String'>;
    readonly updatedAt: Prisma.FieldRef<'AppSetting', 'DateTime'>;
}
export type AppSettingFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppSettingSelect<ExtArgs> | null;
    omit?: Prisma.AppSettingOmit<ExtArgs> | null;
    where: Prisma.AppSettingWhereUniqueInput;
};
export type AppSettingFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppSettingSelect<ExtArgs> | null;
    omit?: Prisma.AppSettingOmit<ExtArgs> | null;
    where: Prisma.AppSettingWhereUniqueInput;
};
export type AppSettingFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppSettingSelect<ExtArgs> | null;
    omit?: Prisma.AppSettingOmit<ExtArgs> | null;
    where?: Prisma.AppSettingWhereInput;
    orderBy?: Prisma.AppSettingOrderByWithRelationInput | Prisma.AppSettingOrderByWithRelationInput[];
    cursor?: Prisma.AppSettingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AppSettingScalarFieldEnum | Prisma.AppSettingScalarFieldEnum[];
};
export type AppSettingFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppSettingSelect<ExtArgs> | null;
    omit?: Prisma.AppSettingOmit<ExtArgs> | null;
    where?: Prisma.AppSettingWhereInput;
    orderBy?: Prisma.AppSettingOrderByWithRelationInput | Prisma.AppSettingOrderByWithRelationInput[];
    cursor?: Prisma.AppSettingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AppSettingScalarFieldEnum | Prisma.AppSettingScalarFieldEnum[];
};
export type AppSettingFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppSettingSelect<ExtArgs> | null;
    omit?: Prisma.AppSettingOmit<ExtArgs> | null;
    where?: Prisma.AppSettingWhereInput;
    orderBy?: Prisma.AppSettingOrderByWithRelationInput | Prisma.AppSettingOrderByWithRelationInput[];
    cursor?: Prisma.AppSettingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AppSettingScalarFieldEnum | Prisma.AppSettingScalarFieldEnum[];
};
export type AppSettingCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppSettingSelect<ExtArgs> | null;
    omit?: Prisma.AppSettingOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AppSettingCreateInput, Prisma.AppSettingUncheckedCreateInput>;
};
export type AppSettingCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AppSettingCreateManyInput | Prisma.AppSettingCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AppSettingCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppSettingSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AppSettingOmit<ExtArgs> | null;
    data: Prisma.AppSettingCreateManyInput | Prisma.AppSettingCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AppSettingUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppSettingSelect<ExtArgs> | null;
    omit?: Prisma.AppSettingOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AppSettingUpdateInput, Prisma.AppSettingUncheckedUpdateInput>;
    where: Prisma.AppSettingWhereUniqueInput;
};
export type AppSettingUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AppSettingUpdateManyMutationInput, Prisma.AppSettingUncheckedUpdateManyInput>;
    where?: Prisma.AppSettingWhereInput;
    limit?: number;
};
export type AppSettingUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppSettingSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AppSettingOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AppSettingUpdateManyMutationInput, Prisma.AppSettingUncheckedUpdateManyInput>;
    where?: Prisma.AppSettingWhereInput;
    limit?: number;
};
export type AppSettingUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppSettingSelect<ExtArgs> | null;
    omit?: Prisma.AppSettingOmit<ExtArgs> | null;
    where: Prisma.AppSettingWhereUniqueInput;
    create: Prisma.XOR<Prisma.AppSettingCreateInput, Prisma.AppSettingUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AppSettingUpdateInput, Prisma.AppSettingUncheckedUpdateInput>;
};
export type AppSettingDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppSettingSelect<ExtArgs> | null;
    omit?: Prisma.AppSettingOmit<ExtArgs> | null;
    where: Prisma.AppSettingWhereUniqueInput;
};
export type AppSettingDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AppSettingWhereInput;
    limit?: number;
};
export type AppSettingDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppSettingSelect<ExtArgs> | null;
    omit?: Prisma.AppSettingOmit<ExtArgs> | null;
};
