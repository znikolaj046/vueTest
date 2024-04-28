export const projects = [
  {
    id: 1,
    code: 'project-1',
    name: 'Проект 1',
    sort: 10
  },
  {
    id: 2,
    code: 'project-2',
    name: 'Проект 2',
    sort: 20
  },
  {
    id: 3,
    code: 'project-3',
    name: 'Проект 3',
    sort: 30
  },
  {
    id: 4,
    code: 'project-4',
    name: 'Проект 4',
    sort: 40
  }
] as const

export type Project = (typeof projects)[number]
