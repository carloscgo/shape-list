import { DragEvent } from 'react'
import { Some } from '../../../application'
import { IdShape, TypeShape } from '../../../domain/models/Shape'

export type ItemT = {
  index: number
}

export type moveShapeT = (dragIndex: number, hoverIndex: number) => void

export type PropsShape = {
  shape: IShape
  index: number
  moveShape: moveShapeT
  getIsMoved: (isDragging: boolean) => void
  onDrag: (shape: IShape) => void
}

export type PropsShapeList = {
  shapes: IShape[]
  moveShape: moveShapeT
  onDelete: (e: Some) => void
}

export type PropsDeleteDrop = {
  show: boolean
  onDelete: () => void
}

export type DragDropT = DragEvent<HTMLDivElement>

export interface IShape {
  id: IdShape
  type: TypeShape
  icon: Some
}
