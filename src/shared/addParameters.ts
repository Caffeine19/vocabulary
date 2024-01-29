export type AddParametersBefore<
  TFunction extends (...args: any) => any,
  TParameters extends [...args: any]
> = (...args: [...TParameters, ...Parameters<TFunction>]) => ReturnType<TFunction>

export type AddParametersAfter<
  TFunction extends (...args: any) => any,
  TParameters extends [...args: any]
> = (...args: [...TParameters, ...Parameters<TFunction>]) => ReturnType<TFunction>
