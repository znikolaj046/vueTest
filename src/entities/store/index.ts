import { reactive } from 'vue'
import { type Cards } from '@/entities/cards/index'
import { type Project } from '@/entities/projects/index'
import { type Stage } from '@/entities/stages/index'
import { cards } from '@/entities/cards/index'
import { projects } from '@/entities/projects/index'
import { stages } from '@/entities/stages/index'

//перенесем все в класс
export class StoreApi {
  private cards = new Array<Cards>()
  private projects = new Array<Project>()
  private stages = new Array<Stage>()
  private maxId = 0
  private filter = ''

  public outCards = new Array()
  public cardState = reactive({
    id: 0,
    stageIndex: 0,
    title: '',
    stageName: '',
    stageCode: '',
    project: '',
    projectName: '',
    score: 0
  })

  constructor(cards: Array<Cards>, projects: Array<Project>, stages: Array<Stage>) {
    this.cards = cards
    this.projects = projects
    this.stages = stages

    for (let i = 0; i < cards.length; i++) {
      if (cards[i].id > 0) {
        this.maxId = cards[i].id
      }
    }

    const loadedItems = localStorage.getItem('outCards')

    if (loadedItems == null || loadedItems === undefined || loadedItems == 'undefined') {
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].project === false) continue

        const projectName = projects.filter(this.getCardProjectName(cards[i].project))
        if (projectName.length > 0) {
          cards[i].projectName = projectName[0].name
        }
      }

      for (let i = 0; i < stages.length; i++) {
        const stageCards = cards.filter(this.getStageCard(this.stages[i].code))
        this.outCards[i] = stageCards
      }
    } else {
      const loadedCards = JSON.parse(loadedItems)
      this.outCards = loadedCards
    }
  }

  updateData() {
    if (this.cardState.id > 0) {
      for (let i = 0; i < this.outCards[this.cardState.stageIndex].length; i++) {
        if (this.outCards[this.cardState.stageIndex][i].id == this.cardState.id) {
          this.outCards[this.cardState.stageIndex][i].title = this.cardState.title
          this.outCards[this.cardState.stageIndex][i].stage = this.cardState.stageCode
          this.outCards[this.cardState.stageIndex][i].score = this.cardState.score
          this.outCards[this.cardState.stageIndex][i].projectName = this.cardState.projectName
          this.outCards[this.cardState.stageIndex][i].project = this.cardState.project
        }
      }
    } else {
      this.maxId++

      const projectName = projects.filter(this.getCardProjectName(this.cardState.project))

      const newCard: Cards = [
        {
          id: this.maxId,
          title: this.cardState.title,
          stage: this.cardState.stageCode,
          score: this.cardState.score,
          projectName: projectName[0].name,
          project: this.cardState.project
        }
      ]

      /*console.log(newCard)
      newCard.id = this.maxId
      newCard.title = this.cardState.title
      newCard.stageCode = this.cardState.stageCode
      newCard.score = this.cardState.score
      newCard.projectName = this.cardState.projectName
      newCard.project = this.cardState.project*/

      this.outCards[this.cardState.stageIndex] = [
        ...this.outCards[this.cardState.stageIndex],
        ...newCard
      ]
    }
  }

  saveData() {
    const filter = this.filter
    const outCards = this.outCards

    setTimeout(function () {
      localStorage.setItem('filter', filter)
      localStorage.setItem('outCards', JSON.stringify(outCards))
      alert('Данные записаны')
    }, 2000)
  }

  setFilter(filter: string) {
    this.filter = filter
  }

  getProjects() {
    return this.projects
  }

  getStages() {
    return this.stages
  }

  getCardProjectFilter(project: string) {
    return function (element: Cards) {
      if (element.project) {
        return element.project.indexOf(project) != -1
      } else {
        return false
      }
    }
  }

  getCardProjectName(project: string) {
    return function (element: Project) {
      return element.code.indexOf(project) != -1
    }
  }

  getStageCard(stage: string) {
    return function (element: Cards) {
      return element.stage.indexOf(stage) != -1
    }
  }

  compareAsc(a: Cards, b: Cards) {
    if (a.score < b.score) {
      return -1
    }
    if (a.score > b.score) {
      return 1
    }
    return 0
  }

  compareDesc(a: Cards, b: Cards) {
    if (a.score > b.score) {
      return -1
    }
    if (a.score < b.score) {
      return 1
    }
    return 0
  }

  sortCards(cards: Array<Cards>, direction: number) {
    if (direction == 1) {
      cards.sort(this.compareAsc)
    } else {
      cards.sort(this.compareDesc)
    }
    return cards
  }

  setProjectFilter(project: string) {
    //for (let i = 0; i < stages.length; i++) {
    const cardsFiltered = this.cards.filter(this.getCardProjectFilter(project))
    //}
    return cardsFiltered
  }

  gatherCards(filter: string) {
    const cards = this.cards

    /*if (filter.length > 0) {
      cards = this.setProjectFilter(filter)
      console.log(this.cards)
    }*/

    for (let i = 0; i < cards.length; i++) {
      if (cards[i].project === false) continue

      const projectName = projects.filter(this.getCardProjectName(cards[i].project))
      if (projectName.length > 0) {
        cards[i].projectName = projectName[0].name
      }
    }

    const outCards = []

    for (let i = 0; i < stages.length; i++) {
      const stageCards = cards.filter(this.getStageCard(this.stages[i].code))
      outCards[i] = stageCards
    }

    return outCards
  }
}

export const store = new StoreApi(cards, projects, stages)

//тут определяем массив для работы с объектом
