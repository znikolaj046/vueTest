<script setup lang="ts">
import { store } from '@/entities/store'

const stages = store.getStages()
const projects = store.getProjects()

function updateCards() {
  if (store.cardState.title == '') {
    alert('Не заполнен заголовок')
    return false
  }

  if (store.cardState.score == 0) {
    alert('Не заполнены баллы проекта')
    return false
  }

  store.updateData()
  emit('closeModal')
}
</script>
<template>
  <header>
    <section>
      <div class="middle">
        <div class="v380">
          <h1>Добавление карточки</h1>
          <div class="form_data">
            <h2>Основные данные</h2>
            <div class="subheader">Чтобы добавить карточку, нужно заполнить данные</div>
            <label>Заголовок *:</label>
            <input v-model="store.cardState.title" class="w100" placeholder="Введите заголовок" />

            <div v-if="store.cardState.id == 0">
              <label>Стадия:</label>
              <select class="w100" v-model="store.cardState.stageCode">
                <option>-</option>
                <option :value="stage.code" :key="stage.code" v-for="stage in stages">
                  {{ stage.name }}
                </option>
              </select>
            </div>

            <label>Проект:</label>
            <select class="w100" v-model="store.cardState.project">
              <option>-</option>
              <option :value="project.code" :key="project.code" v-for="project in projects">
                {{ project.name }}
              </option>
            </select>

            <label>Баллы *:</label>
            <input v-model="store.cardState.score" placeholder="Баллы" />
            <div class="btn-div">
              <a href="javascript:;;" class="btn" @click="updateCards">
                <span>Добавить</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </header>
</template>
