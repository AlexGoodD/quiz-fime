export interface Answer {
  question: string
  answer: string | number | null
}

export interface UserAnswer {
  id: string
  userId: string
  timestamp: any
  answers: {
    question: string
    answer: string | number
  }[]
  posgrado?: string
}

export type AnswerType = Answer | UserAnswer
