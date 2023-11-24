/* interface IdLabel {
  id: number /!* 一些字段 *!/
}
interface NameLabel {
  name: string /!* 其它字段 *!/
}
type NameOrId<T extends number | string> = T extends number ? IdLabel : NameLabel

function createLabel<T extends number | string>(nameOrId: T): NameOrId<T> {
  throw new Error('unimplemented')
}
const a = createLabel('typescript')
const b = createLabel(1) */

/*
type MessageOf<T> = T extends { message: unknown } ? T['message'] : never
interface Email {
  message: string
}
interface Dog {
  bark(): void
}
type EmailMContents = MessageOf<Email>
type EmailMContentsD = MessageOf<Dog>

type Flatten<T> = T extends any[] ? T[number] : T

type unio = number | string

type Str = Flatten<string[]>
type Num = Flatten<number>
*/

/*
type ExtractType<T> = T extends Array<infer U> ? MessageOf<U> : never

// 使用
type Result = ExtractType<{ message: number }[]>
*/

/* function Test1(a: string) {}
type ConstructorParametes<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any ? P : never

type b = ReturnType<typeof Test1> */

/*
class MyClass {
  name: string
  constructor(name: string) {
    this.name = name
  }
}

type MyInstanceType = InstanceType<typeof MyClass>
type MyInstanceType1 = typeof MyClass
const t: MyInstanceType = new MyClass('dd')

type ToArray<Type> = Type extends any ? Type[] : never

type StrArrOrNumArr = ToArray<string | number>
*/

/* type A = 1
type B = 2
type E = A extends B ? true : false

type A = [1, 2, 3]
type B = '123'

type EA<T> = T extends [infer First, ...infer Rest] ? First : never
type EB<T> = T extends `${infer FirstChart}${infer Rest}` ? FirstChart : never

type RR = EA<A> */

/*
type GetValueType<T extends Promise<any>> = T extends Promise<infer R> ? R : never
type PromiseType = Promise<number[]>
type res = GetValueType<PromiseType>
 */

/*
type Pop<T extends unknown[]> =
  T extends [...infer Rest, infer R]
    ? Rest
    : never

type res = Pop<[1, 2, 3]>

type Shift<T extends unknown[]> =
  T extends [infer R, ...infer Rest]
    ? Rest
    : never
type res1 = Pop<[1, 2, 3]>
*/

/*
type TrimLeft<Str extends string> =
  Str extends `${' ' | '\t' | '\n'}${infer Rest}`
    ? TrimLeft<Rest> // 递归去除左侧的 空格、制表符、换行符
    : Str

// type res2 = TrimLeft<'\t \n abc'>

type TrimRight<Str extends string> =
  Str extends `${infer Rest}${' ' | '\t' | '\n'}`
    ? TrimRight<Rest> // 递归去除右侧的 空格、制表符、换行符
    : Str
type res3 = TrimRight<'abc\t \n '>

type Trim<Str extends string> = TrimRight<TrimLeft<Str>>

type res4 = Trim<'\t \n abc\t \n '>
*/

/*
type Replace<Str extends string, From extends string, To extends string> =
  Str extends `${infer Left}${From}${infer Right}`
    ? `${Left}${To}${Right}`
    : Str
type Res = Replace<'最强的是超人~~', '超人', '蝙蝠侠'>
*/

/* type TestLast<Arr extends string[]> =
  Arr extends [...infer Rest, infer Last extends string]
    ? `最后一个是:${Last}`
    : never
type Res1 = TestLast<['1', '2', '猪猪']>
const b: Res1 = '最后一个是:猪猪' */

/*
enum Code {
  a = 111,
  b = 222,
  c = 'abc',
  d = '9',
}
type StrToNum<Str> =
  Str extends `${infer Num extends number}`
    ? Num
    : Str
type res = StrToNum<`${Code}`>
*/

/*
type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
*/

/*
type StrToBoolean<Str> =
  Str extends `${infer Bool extends boolean}`
    ? Bool
    : Str

type res = StrToBoolean<'true'>
const a: res = false
*/

/*
type toAny<S> =
  S extends `${infer Bool extends boolean}`
    ? Bool
    : S extends `${infer Null extends null}`
      ? Null
      : S extends `${infer Number extends number}`
        ? Number
        : S

type res = toAny<111>
type res1 = toAny<'111'>
type res2 = toAny<'true'>
type res3 = toAny<'null'>
type res4 = toAny<'undefined'>
type res5 = toAny<true>
*/

/*
type GetParams<Func extends Function>
  = Func extends (...params: infer Params) => any
    ? Params
    : never
type func = (a: number, b: string) => void
type res = GetParams<func>
type res1 = Parameters<func>
*/

/*
type GetReturnType<Func extends Function>
    = Func extends (...args: any) => infer R
      ? R
      : never
type func = (a: boolean, b: number) => string
type res = GetReturnType<func>
type res1 = ReturnType<func>
*/

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace common {
  export type Not<C extends boolean> = C extends true ? false : true
  export type CheckLeftIsExtendsRight<T, R> = T extends R
    ? true
    : false
  export type NumberLike = number | `${number}`
  export type IsNotEqual<
    L extends NumberLike, R extends NumberLike, Strict extends boolean = true,
  > = Not<IsEqual<L, R, Strict>>

  export type IsEqual<
    L extends NumberLike, R extends NumberLike, Strict extends boolean = true,
  > = Strict extends true
    ? CheckLeftIsExtendsRight<L, R>
    : CheckLeftIsExtendsRight<string.Stringify<L>, string.Stringify<R>>

  type And<C1 extends boolean, C2 extends boolean> =
    C1 extends true
      ? C2 extends true
        ? true
        : false
      : false
  export type And3<C1 extends boolean, C2 extends boolean, C3 extends boolean> = And<And<C1, C2>, C3>
  export type And4<C1 extends boolean, C2 extends boolean, C3 extends boolean, C4 extends boolean> = And<And3<C1, C2, C3>, C4>

  export type Or<C1 extends boolean, C2 extends boolean> =
    C1 extends true
      ? true
      : C2 extends true
        ? true
        : false
  export type IsZero<N extends NumberLike> = CheckLeftIsExtendsRight<N, 0 | '0'>

}

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace string {
  export type CanStringified = string | number | bigint | boolean | null | undefined
  export type Stringify<T extends CanStringified> = `${T}`
}

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace array {
    // R的长度小于Length, 就通过递归元组增加长度
    type GetTupleHelper<
        Length extends number = 0, Type = unknown, R extends Type[] = [],
    > = R['length'] extends Length ? R : GetTupleHelper<Length, Type, [...R, Type]>

    export type GetTuple<Length extends number = 0, Type = unknown> = GetTupleHelper<Length, Type>

    export type Pop<T extends unknown[]> = T extends [...infer LeftRest, infer Last]
      ? LeftRest
      : never
}

/*
type And<C1 extends boolean, C2 extends boolean> =
    C1 extends true
      ? C2 extends true
        ? true
        : false
      : false
// ts 目前不支持动态个数的泛型参数，因此如果有多个条件，我们需要定义多个不同的，比如
type And3<C1 extends boolean, C2 extends boolean, C3 extends boolean> = And<And<C1, C2>, C3>
type And4<C1 extends boolean, C2 extends boolean, C3 extends boolean, C4 extends boolean> = And<And3<C1, C2, C3>, C4>

type Or<C1 extends boolean, C2 extends boolean> =
    C1 extends true
      ? true
      : C2 extends true
        ? true
        : false
type Not<C extends boolean> = C extends true ? false : true
*/
/*

type CheckLeftIsExtendsRight<T, R> =
    T extends R
      ? true
      : false

type IsEqual<A, B> =
    (<T>() => T extends A ? 1 : 2) extends (<T1>() => T1 extends B ? 1 : 2)
      ? true
      : false

type res = IsEqual<1, 1> // true
type res1 = IsEqual<[2], [2, 1]> // false
type c = Extract<{ a: 1; b: 2 }, { a: 1 }>
type base = bigint | symbol | unknown | undefined | null | number | string
type ref = object | [] | {} | ((...param: any) => any)
// type special = any | unknown | void | never | enm
*/

/*
type CanStringfiy = string | number | bigint | boolean | null | undefined

type Stringfiy<T extends CanStringfiy> = `${T}`

type e1 = Stringfiy<0>
type e2 = Stringfiy<-1>
type e3 = Stringfiy<0.1>
*/
/*

type Example<
    C extends boolean = true, Tuple extends unknown[] = [1],
> = C extends true
  ? Example<false, [...Tuple, 1]>
  : Tuple

type Result = Example

type Example1<T> = T extends number ? T : never
type Result1 = Example1<'1' | '2' | 3 | 4>
*/
/*

type NumberLike = number | `${number}`

type IsZero<N extends NumberLike> = common.CheckLeftIsExtendsRight<N, 0 | '0'>
type IsOverZero<N extends NumberLike> =
    IsZero<N> extends true
      ? false
      : common.CheckLeftIsExtendsRight<
        // 字符串化后有没有带负号，带负号和never比对就不一样
        string.Stringify<N> extends `${'-'}${infer Rest}` ? Rest : never,
        never
    >
type IsLessZero<N extends NumberLike> =
IsZero<N> extends true
  ? false
  : common.Not<IsOverZero<N>>

type res = IsOverZero<1>
type res1 = IsLessZero<0>
*/
/*
// R的长度小于Length, 就通过递归元组增加长度
type GetTupleHelper<
    Length extends number = 0, Type = unknown, R extends Type[] = [],
> = R['length'] extends Length ? R : GetTupleHelper<Length, Type, [...R, Type]>

type GetTuple<Length extends number = 0, Type = unknown> = GetTupleHelper<Length, Type>

type res = GetTuple<10, string>
*/
/*

// 获取两个元组合并的长度
type IntAddSingleHelper<N1 extends number, N2 extends number> = [
  ...array.GetTuple<N1>,
  ...array.GetTuple<N2>,
]['length']
// 正整数和0的加法， T1、T2最大999, 再大会计算错误
type IntAddSingle<N1 extends number, N2 extends number> =
    IntAddSingleHelper<N1, N1> extends number
      ? IntAddSingleHelper<N1, N2>
      : number
type res = IntAddSingle<1, 3>
type res1 = IntAddSingleHelper<999, 999>
type res2 = array.GetTuple<1>
*/

type CompareHelper<
  N1 extends number, N2 extends number, T1 extends unknown[] = array.GetTuple<N1>, T2 extends unknown[] = array.GetTuple<N2>,
>
  = common.IsNotEqual<N1, N2> extends true
    ? common.Or<common.IsZero<T1['length']>, common.IsZero<T2['length']>> extends true
      ? common.IsZero<T1['length']> extends true
        ? false
        : true
      : CompareHelper<array.Pop<T1>['length'], array.Pop<T2>['length']>
    : false

type Compare<N1 extends number, N2 extends number> = CompareHelper<N1, N2>
const a: Compare<3, 2> = true
