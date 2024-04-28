export const stages = [
  {
    id: 1,
    sort: 10,
    name: 'Стадия 1',
    code: 'stage-1',
    cards: []
  },
  {
    id: 2,
    sort: 20,
    name: 'Стадия 2',
    code: 'stage-2',
    cards: []
  },
  {
    id: 3,
    sort: 30,
    name: 'Стадия 3',
    code: 'stage-3',
    cards: []
  },
  {
    id: 4,
    sort: 40,
    name: 'Стадия 4',
    code: 'stage-4',
    cards: []
  }
] as const

export type Stage = (typeof stages)[number]
