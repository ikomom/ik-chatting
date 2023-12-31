import { snakeCase } from 'lodash-es'

type ToPropertyPrefix<N extends string = ''> = N extends '' ? '' : `${N}_`

type ToProperty<Property extends string, N extends string = ''> = `${ToPropertyPrefix<N>}${Property}`

type ProperItem = Record<PropertyKey, any>

type ToSingleKeyMap<T extends ProperItem, K extends keyof T> = T extends {
  readonly [Z in K]: infer F;
}
  ? K extends PropertyKey
    ? F extends PropertyKey
      ? {
          readonly [Key in F]: T;
        }
      : never
    : never
  : never

type MergeIntersection<A> = A extends infer T ? { [Key in keyof T]: T[Key] } : never

type ToKeyMap<T extends Readonly<ProperItem[]>, K extends keyof T[number]> = T extends readonly [
  infer A extends ProperItem,
  ...infer B,
]
  ? B['length'] extends 0
    ? ToSingleKeyMap<A, K>
    : B extends ProperItem[]
      ? MergeIntersection<ToSingleKeyMap<A, K> & ToKeyMap<B, K>>
      : ProperItem
  : ProperItem

type ToSingleKeyValue<T extends ProperItem, K extends keyof T, KA extends keyof T = never> = T extends {
  readonly [Z in K]: infer F;
}
  ? F extends PropertyKey
    ? {
        readonly [Key in Utils.StringUppercaseSnakeCase<KA extends never ? F : T[KA]>]: T[K];
      }
    : never
  : never

type ToKeyValue<
  T extends ReadonlyArray<Record<PropertyKey, any>>, K extends keyof T[number], KA extends keyof T[number] = never,
> = T extends readonly [infer A extends ProperItem, ...infer B]
  ? B['length'] extends 0
    ? ToSingleKeyValue<A, K, KA>
    : B extends ProperItem[]
      ? MergeIntersection<ToSingleKeyValue<A, K, KA> & ToKeyValue<B, K, KA>>
      : ProperItem
  : []

export function defineConstants<
  Constant extends ReadonlyArray< Record<PropertyKey, unknown> >, NameSpace extends string, Key extends keyof Constant[number] = 'key', KA extends keyof Constant[number] = Key,
>(list: Constant, namespace: NameSpace, key: Key = 'key' as Key, keyAlias?: KA) {
  const prefix = namespace ? `${namespace}_` : ''
  if (!keyAlias)
    keyAlias = key as unknown as KA

  return {
    [namespace]: list.reduce(
      (obj, item) => ({
        ...obj,
        [snakeCase(item[keyAlias!] as string).toUpperCase()]: item[key],
      }),
      {},
    ),
    [`${prefix}MAP`]: list.reduce(
      (obj, item) => ({
        ...obj,
        [item[keyAlias!] as string]: item,
      }),
      {},
    ),
    [`${prefix}LIST`]: list,
  } as MergeIntersection<
    {
      [Name in NameSpace]: ToKeyValue<Constant, Key, KA>;
    } & {
      [Name in ToProperty<'MAP', NameSpace>]: ToKeyMap<Constant, KA>;
    } & {
      [Name in ToProperty<'LIST', NameSpace>]: Constant;
    }
  >
}
/*
const a = defineConstants(
  [
    { key: 1, value: '22' },
    { key: '21', value: '22' },
  ] as const,
  'name',
  'key',
  'key',
)
*/
