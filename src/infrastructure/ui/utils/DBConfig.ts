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
        { name: 'type', keypath: 'type', options: { unique: false } },
        { name: 'icon', keypath: 'icon', options: { unique: false } },
      ],
    },
  ],
}
