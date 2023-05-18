// domain/models/Shape.ts

import { Some } from '../../application'

export type IdShape = string | number

export type TypeShape = 'Square' | 'Circle' | 'Triangle'

export type Shape = {
  id: IdShape
  shape: {
    name: string
    type: TypeShape
    [key: string]: Some
  }
  [key: string]: Some
}
