export interface BaseQuestion {
  id?: string
  position: number
  type: 'multipleChoice' | 'slider' | 'trueFalse'
  question: string
}

export interface SliderQuestion extends BaseQuestion {
  type: 'slider'
  min: number
  max: number
  sliderLogics: {
    type: 'range'
    area: string
    minPoints: number
    maxPoints: number
  }[]
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multipleChoice'
  options: string[]
  values: {
    [option: string]: {
      [area: string]: number
    }
  }
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'trueFalse'
  values: {
    Verdadero: {
      [area: string]: number
    }
    Falso: {
      [area: string]: number
    }
  }
}

export type Question = SliderQuestion | MultipleChoiceQuestion | TrueFalseQuestion
