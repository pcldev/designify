import type { SessionStorage } from '@shopify/shopify-app-session-storage'
import mongoose from './connect-db.server'
import ShopifySession from '~/models/ShopifySession.server'
import { Session } from '@shopify/shopify-api'

export class MongooseSessionStorage implements SessionStorage {
  public readonly ready: Promise<void>

  constructor() {
    this.ready = this.init()
  }

  public async storeSession(session: Session): Promise<boolean> {
    await this.ready

    await ShopifySession.findOneAndReplace({ id: session.id }, session.toObject(), { upsert: true })

    return true
  }

  public async loadSession(id: string): Promise<Session | undefined> {
    await this.ready

    const result = await ShopifySession.findOne({ id })

    return result ? new Session(result.toObject()) : undefined
  }

  public async deleteSession(id: string): Promise<boolean> {
    await this.ready

    await ShopifySession.deleteOne({ id })

    return true
  }

  public async deleteSessions(ids: string[]): Promise<boolean> {
    await this.ready

    await ShopifySession.deleteMany({ id: { $in: ids } })

    return true
  }

  public async findSessionsByShop(shop: string): Promise<Session[]> {
    await this.ready

    const rawResults = await ShopifySession.find({ shop })

    if (!rawResults || rawResults?.length === 0) {
      return []
    }

    return rawResults.map((rawResult: any) => new Session(rawResult.toObject()))
  }

  public async disconnect(): Promise<void> {
    // Do not close the connection because it is sharing with other db activities.
  }

  private async init(): Promise<void> {
    return new Promise(resolve => {
      ;(function checkIfConnectionReady() {
        if (mongoose.connection.readyState === 1) {
          resolve()
        } else {
          setTimeout(checkIfConnectionReady, 10)
        }
      })()
    })
  }
}
