<script setup>
import { defineEmits } from 'vue'
import { store } from '@/entities/store'

const emit = defineEmits(['closeModal', 'editCard'])
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

function closeModal() {
  emit('closeModal')
  //showModal.value = false
}
</script>
<template>
  <div class="modal">
    <div class="modal-content">
      <button @click="closeModal" class="close">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.1364 2.80488C18.3968 2.54453 18.3968 2.12242 18.1364 1.86207C17.8761 1.60172 17.4539 1.60172 17.1936 1.86207L10.0001 9.05561L2.80654 1.86207C2.54619 1.60172 2.12408 1.60172 1.86373 1.86207C1.60338 2.12242 1.60338 2.54453 1.86373 2.80488L9.05726 9.99842L1.8625 17.1932C1.60215 17.4535 1.60215 17.8756 1.8625 18.136C2.12285 18.3963 2.54496 18.3963 2.80531 18.136L10.0001 10.9412L17.1948 18.136C17.4552 18.3963 17.8773 18.3963 18.1376 18.136C18.398 17.8756 18.398 17.4535 18.1376 17.1932L10.9429 9.99842L18.1364 2.80488Z"
            fill="#7D8CA1"
          />
        </svg>
      </button>
      <h2 v-if="store.cardState.id == 0">Добавление</h2>
      <h2 v-else>Изменение</h2>
      <div class="subheader">{{ store.cardState.stageName }}</div>
      <label>Заголовок *:</label>
      <input v-model="store.cardState.title" class="w100" placeholder="Введите заголовок" />
      <input v-model="store.cardState.stageCode" type="hidden" />

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
          <span v-if="store.cardState.id == 0">Добавить</span>
          <span v-else>Изменить</span>
        </a>
      </div>
    </div>
  </div>
</template>
