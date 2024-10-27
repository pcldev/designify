import type { FileRecord, IDB_Database, JSONRecord } from '~/types/index-db'

export function openIDBDatabase(dbName: string, storeName: string): Promise<IDB_Database> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1)

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result
      db.createObjectStore(storeName, { keyPath: 'id' })
    }

    request.onsuccess = (event: Event) => {
      resolve((event.target as IDBOpenDBRequest).result)
    }

    request.onerror = (event: Event) => {
      reject((event.target as IDBOpenDBRequest).error)
    }
  })
}

export async function storeFileToIDB(db: IDB_Database, storeName: string, file: File, id: string): Promise<void> {
  const reader = new FileReader()

  return new Promise((resolve, reject) => {
    reader.onload = async (event: ProgressEvent<FileReader>) => {
      const transaction = db.transaction([storeName], 'readwrite')
      const objectStore = transaction.objectStore(storeName)
      const arrayBuffer = event.target?.result as ArrayBuffer

      const request = objectStore.add({ id, name: id, data: arrayBuffer })

      request.onsuccess = () => resolve()
      request.onerror = error => reject(error)
    }

    reader.onerror = error => reject(error)
    reader.readAsArrayBuffer(file)
  })
}

export async function storeJSONFileToIDB(db: IDB_Database, storeName: string, jsonObject: object, id: string) {
  const jsonString = JSON.stringify(jsonObject)

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readwrite')
    const objectStore = transaction.objectStore(storeName)
    const request = objectStore.add({ id, data: jsonString })

    request.onsuccess = () => resolve(id)
    request.onerror = error => reject(error)
  })
}

export async function getFileFromIDB(db: IDB_Database, storeName: string, fileId: string): Promise<FileRecord | null> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName])
    const objectStore = transaction.objectStore(storeName)
    const request = objectStore.get(fileId)

    request.onsuccess = (event: Event) => resolve((event.target as IDBRequest).result)
    request.onerror = error => reject(error)
  })
}

export async function getJSONFromIDB(db: IDB_Database, storeName: string, id: string): Promise<object | null> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName])
    const objectStore = transaction.objectStore(storeName)
    const request = objectStore.get(id)

    request.onsuccess = (event: Event) => {
      const record = (event.target as IDBRequest).result as JSONRecord
      if (record) {
        const jsonObject = JSON.parse(record.data)
        resolve(jsonObject)
      } else {
        resolve(null)
      }
    }

    request.onerror = error => reject(error)
  })
}

export async function deleteFileFromIDB(db: IDB_Database, storeName: string, fileId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readwrite')
    const objectStore = transaction.objectStore(storeName)
    const request = objectStore.delete(fileId)

    request.onsuccess = () => resolve()
    request.onerror = error => reject(error)
  })
}
