// src/infrastructure/repositories/shapeRepository.ts

import { IdShape, Shape } from '../../domain/models/Shape'
import { ShapeRepository } from '../../domain/repositories/ShapeRepository'
import { Http } from '../../domain/repositories/Http'

const PATH = '/shapes'

export const shapeRepository = (client: Http): ShapeRepository => ({
  getShapes: async (shapes: Shape[]) => client.get<Shape[]>(PATH),

  getShapeById: async (id: IdShape) => client.get<Shape>(`${PATH}/${id}`),

  addShape: async (shape: Omit<Shape, 'id'>) => client.post<Shape>(PATH, shape),

  editShape: async (id: IdShape, shape: Omit<Shape, 'id'>) =>
    client.put<Shape>(`${PATH}/${id}`, shape),

  deleteShape: async (id: IdShape) => {
    client.delete<Promise<void>>(`${PATH}/${id}`)
  },
})
