
declare module Utils {
  type StringUppercaseSnakeCase<T extends string, ACC extends string = ''> = T extends `${infer F}${infer REST}`
    ? Uppercase<F> extends F
      ? StringUppercaseSnakeCase<REST, ACC extends '' ? F : Lowercase<ACC> extends ACC ? `${ACC}${F}` : `${ACC}_${F}`>
      : StringUppercaseSnakeCase<REST, `${ACC}${Uppercase<F>}`>
    : ACC

  type ConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any ? P : never;

}


declare module API {
  export interface Offset {
    page: number
    pageSize: number
  }

  export interface List<T> extends Offset {
    total: number,
    list: T[]
  }
}
