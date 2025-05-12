import { collection, addDoc, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { db } from '@/firebase'
import { AreaType } from '@/types/AreasType'

const areasCollection = collection(db, 'areas')

export async function fetchAreas(): Promise<AreaType[]> {
  const q = query(areasCollection, orderBy('createdAt'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    ...(doc.data() as Omit<AreaType, 'id'>),
    id: doc.id,
  }))
}

export async function createArea(name: string): Promise<void> {
  await addDoc(areasCollection, {
    name,
    createdAt: serverTimestamp(),
  })
}
