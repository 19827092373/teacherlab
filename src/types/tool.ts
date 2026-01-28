export interface Tool {
  id: string
  title: string
  description: string
  link: string
  icon: string
  tags: string[]
  userCount: string
  isNew?: boolean
  isHot?: boolean
  isRecommended?: boolean
  isBeta?: boolean
  gradient: string
  borderColor: string
  hoverShadow: string
  scenario: {
    title: string
    content: string
  }
  features: Feature[]
  steps: Step[]
  variants?: ToolVariant[]
}

export interface ToolVariant {
  id: string
  title: string
  description: string
  link: string
  icon: string
  color: 'green' | 'blue' | 'purple' | 'orange' | 'red' | 'indigo'
}

export interface Feature {

  icon: string
  text: string
}

export interface Step {
  number: number
  content: string
}
