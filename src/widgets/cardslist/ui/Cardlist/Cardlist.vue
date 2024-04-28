<script setup>
import { Cardobject } from '@/widgets/cardobject'
import { Modal } from '@/widgets/modal'
import { ref, watchEffect } from 'vue'
import draggable from 'vuedraggable'

import { store } from '@/entities/store'

const props = defineProps(['modelValue'])
const stagesIn = store.getStages()

let filter = ref(0)
let cardsIn = ref(0)
let showModal = ref(false)

watchEffect(() => {
  if (props.modelValue !== undefined && props.modelValue.length > 0) {
    filter.value = props.modelValue

    //cardsIn = ref(store.gatherCards(filter.value))
  } else {
    cardsIn = ref(store.outCards)
    //cardsIn = ref(store.gatherCards(''))
  }
})

function openModal(stageIndex) {
  store.cardState.id = 0
  store.cardState.title = ''
  store.cardState.stageName = ''
  store.cardState.projectCode = ''
  store.cardState.projectName = ''
  store.cardState.stageCode = ''
  store.cardState.stageName = ''
  store.cardState.score = 0
  store.cardState.stageIndex = stageIndex
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

function SortCards(cardsIn, index, direction) {
  store.sortCards(cardsIn[index], direction)
  store.outCards = cardsIn
}

function editCard() {
  showModal.value = true
}
</script>
<template>
  <div class="cards">
    <div class="card" :key="stage.id" v-for="(stage, index) in stagesIn">
      <div class="station_header">
        <div>{{ stage.name }}</div>
        <div>
          <a href="javascript:;;" v-on:click="SortCards(cardsIn, index, 1)"
            ><img src="/images/adown.svg" /></a
          ><a href="javascript:;;" v-on:click="SortCards(cardsIn, index, -1)"
            ><img src="/images/aup.svg"
          /></a>
        </div>
      </div>
      <draggable
        class="list-group"
        handle=".handle"
        :itemKey="stage.code"
        group="people"
        v-model="cardsIn[index]"
      >
        <template #item="{ element: card }">
          <div class="card_object list-group-item" :key="card.code">
            <Cardobject
              @editCard="editCard"
              :cardId="card.id"
              :stageIndex="index"
              :cardScore="card.score"
              :stageCode="stage.id"
              :stageName="stage.name"
              :cardTitle="card.title"
              :project="card.project"
              :cardProject="card.projectName"
              :stageId="stage.id"
            ></Cardobject>
          </div>
        </template>
      </draggable>
      <div class="card_footer">
        <a href="javascript:;;" @click="openModal(index)">Добавить</a>
      </div>
    </div>
  </div>
  <Modal v-if="showModal" @closeModal="closeModal" @editCard="editCard" />
  <div class="overlay" @click="closeModal" v-if="showModal"></div>
</template>
