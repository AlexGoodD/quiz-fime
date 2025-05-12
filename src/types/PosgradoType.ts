interface PostgradoInterface {
  id?: string
  type: 'Maestria' | 'Doctorado' | 'Especialidad'
  name: string
  areaPoints?: {
    [areaName: string]: number
  }
}

export type PostgradoType = PostgradoInterface
