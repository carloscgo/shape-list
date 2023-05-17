// infrastructure/ui/utils/DBConfig.ts

import { Store } from './constants'

export const DBConfig = {
  name: 'ShapeDB',
  version: 1,
  objectStoresMeta: [
    {
      store: Store,
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'email', keypath: 'email', options: { unique: false } },
      ],
    },
  ],
}
