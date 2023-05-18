import { DragEvent, ReactNode } from 'react'
import { Some } from '../../../application'
import { IdShape, Shape, TypeShape } from '../../../domain/models/Shape'

export type PositionsT = 'left' | 'right'

export type PropsShape = {
  shape: Shape
  onAdd: (position: PositionsT, index: IdShape) => void
  onDelete: (index: IdShape) => void
  showButton?: boolean
}

export type PropsShapeList = {
  shapes: Shape[]
  onAdd: (position: PositionsT, type: TypeShape, index: IdShape) => void
  onDelete: (index: IdShape) => void
}

export type PropsAddButton = {
  onAdd: () => void
  [key: string]: Some
}

export type PropsDeleteButton = {
  onDelete: () => void
  [key: string]: Some
}

export type DragDropT = DragEvent<HTMLDivElement>

export type PropsModal = {
  color: 'red' | 'indigo'
  title: string
  message?: string
  children?: ReactNode
  labelButton: string
  show: boolean
  onConfirm: () => void
  onClose: (show: boolean) => void
}
