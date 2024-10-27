import { createContext } from 'react'
import { RemixQueryClient } from './query-client'

export const RemixQueryClientProvider = createContext({ remixQueryClient: new RemixQueryClient() })
