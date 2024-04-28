<script setup>
import { defineEmits } from 'vue'
import { store } from '@/entities/store'

const props = defineProps([
  'cardId',
  'cardTitle',
  'cardScore',
  'cardProject',
  'cardProjectCode',
  'stageCode',
  'stageName',
  'project',
  'stageId',
  'stageIndex'
])

const emit = defineEmits(['closeModal', 'editCard', 'deleteCard'])

function editCard(store) {
  store.cardState.id = props.cardId
  store.cardState.title = props.cardTitle
  store.cardState.stageName = props.cardScore
  store.cardState.project = props.project
  store.cardState.projectName = props.cardProject
  store.cardState.stageCode = props.stageCode
  store.cardState.stageName = props.stageName
  store.cardState.score = props.cardScore
  store.cardState.stageIndex = props.stageIndex
  emit('editCard')
}

function deleteCard() {
  if (confirm('Вы уверены?')) emit('deleteCard')
}
</script>

<template>
  <div class="obj_head">
    <div class="obj_sub_head">
      <div class="card_name">
        <div>{{ props.cardTitle }}</div>
        <div>
          <a @click="editCard(store)" href="javascript:;;"><img src="/images/edit.svg" /></a>
        </div>
        <div>
          <a @click="deleteCard" href="javascript:;;"><img src="/images/basket.svg" /></a>
        </div>
      </div>
      <div>
        <a class="handle" href="javascript:;;"><img src="/images/drag.svg" /></a>
      </div>
      <div class="ball">
        Балл: <span>{{ props.cardScore }}</span>
      </div>
    </div>
  </div>
  <div class="obj_foot">
    <span class="proekt"> {{ props.cardProject }} </span>
  </div>
</template>
