import { db } from '@/firebase'
import { collection, addDoc, updateDoc, getDocs, doc } from 'firebase/firestore'
import { PostgradoType } from '@/types/PosgradoType'

const posgradosCollection = collection(db, 'posgrados')

export async function fetchPostgrados(): Promise<PostgradoType[]> {
  const snapshot = await getDocs(posgradosCollection)
  return snapshot.docs.map((doc) => ({
    ...(doc.data() as Omit<PostgradoType, 'id'>),
    id: doc.id,
  }))
}

export async function savePostgrado(postgrado: PostgradoType): Promise<void> {
  const { id, ...data } = postgrado
  if (id) {
    const ref = doc(db, 'postgrados', id)
    await updateDoc(ref, data)
  } else {
    await addDoc(posgradosCollection, data)
  }
}
