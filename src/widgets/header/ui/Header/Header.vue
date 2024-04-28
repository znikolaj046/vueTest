<script setup>
import { projects } from '@/entities/projects/index'
import { ref } from 'vue'
import { Cardlist } from '@/widgets/cardslist'
import { store } from '@/entities/store'

const filter = ref('')
function onChange(event) {
  filter.value = event.target.value
}

function saveData() {
  console.log(store.outCards)
  store.saveData()
}
</script>

<template>
  <main>
    <section>
      <header>
        <div><h1>Карточки</h1></div>
        <div class="right_head">
          <div>Проект:</div>
          <div>
            <select @change="onChange($event)">
              <option>-</option>
              <option :value="project.code" :key="project.code" v-for="project in projects">
                {{ project.name }}
              </option>
            </select>
          </div>
          <div><a href="/register" class="btn">Добавить карточку</a></div>
          <div><button @click="saveData" class="btn">Сохранить изменения</button></div>
        </div>
      </header>
      <Cardlist v-model="filter"></Cardlist>
    </section>
  </main>
</template>
