import { Some } from '../../application'
import { IdShape, Shape } from '../models/Shape'

export interface ShapeRepository {
  getShapes: (shapes: Shape[]) => Promise<Shape[]>
  getShapeById: (id: IdShape) => Promise<Shape>
  addShape: (shape: Omit<Shape, 'id'>) => Promise<Shape>
  editShape: (id: IdShape, shape: Omit<Shape, 'id'>) => Promise<Shape>
  deleteShape: (id: IdShape) => Promise<Some>
}
