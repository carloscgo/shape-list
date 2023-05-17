// domain/models/Shape.ts

export type IdShape = string | number

export type Shape = {
  id: IdShape
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
