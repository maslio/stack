<script setup lang="ts">
import TasksRun from './SystemTasksRun.vue'
import _tasks from '~~/tasks.json'

const tasks = import.meta.dev
  ? _tasks
  : _tasks.filter(t => !t.name.startsWith('dev:'))

const groups = Object.groupBy(tasks, ({ name }) => name.split(':')[0] || '')
const run = openRef()
</script>

<template>
  <List
    v-for="(items, key) in groups"
    v-slot="{ item: task }"
    :key
    :items
    item-key="name"
  >
    <Item :open="{ ref: run, props: { task: task.name }, label: task.name }">
      <section>
        <div font-mono>
          {{ task.name }}
        </div>
        <div text-faint>
          {{ task.description }}
        </div>
      </section>
    </Item>
  </List>
  <Open ref="run" v-slot="{ props }">
    <TasksRun :task="props.task" />
  </Open>
</template>
