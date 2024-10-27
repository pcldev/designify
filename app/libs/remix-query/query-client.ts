interface QueryCache {
  [key: string]: any
}

type QueryKey = string

export class RemixQueryClient {
  private queryCacheData: QueryCache

  constructor() {
    this.queryCacheData = {}
  }

  getQueryData(queryKey: QueryKey) {
    return this.queryCacheData[queryKey]
  }

  setQueryData(queryKey: QueryKey, newData: any) {
    this.queryCacheData[queryKey] = newData
  }

  removeQueries(queryKey: QueryKey): void {
    delete this.queryCacheData[queryKey]
  }
}
