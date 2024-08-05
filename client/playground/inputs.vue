<script setup lang="ts">
interface User {
  id: number
  name: string
  username: string
  email: string
  address: {
    streen: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}
const users = await $fetch<User[]>('https://jsonplaceholder.typicode.com/users')
const modelSingle = ref<User['id']>()
const modelMulti = ref<User['id'][]>([])
const search = ref('')

const items = computed(() => {
  const text = search.value.toLocaleLowerCase()
  return users.filter(user => user.name.toLocaleLowerCase().includes(text))
})
</script>

<template>
  <!-- <List v-model:search="search" :items>
    <template #item="{ item }">
      <Option
        v-model="modelSingle"
        :value="item.id"
        :label="item.name"
        :caption="item.email"
      />
    </template>
  </List> -->
  <Card>
    <InputDate />
    <InputDateRange />
  </Card>
  <Card>
    <InputString label="String" />
    <InputText label="Text" />
    <InputNumber label="Number" :decimal="2" />
  </Card>
  <Card>
    <Select
      v-model="modelSingle"
      v-model:search="search"
      target="self"
      label="User"
      :options="items"
      option-value="id"
      option-label="name"
    />
    <Select
      v-model="modelMulti"
      v-model:search="search"
      label="Users"
      multiple
      :options="items"
      option-value="id"
      option-label="name"
    />
  </Card>
</template>
