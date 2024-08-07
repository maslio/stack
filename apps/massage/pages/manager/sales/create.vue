<script setup lang="ts">
const props = defineProps<{
  salon: Record<string, any>
}>()

const emit = defineEmits<{
  (event: 'save', sale: Sale): void
}>()

interface Sale {
  service: number | null
  worker: number | null
  price: number | null
  salon: number
}

const { items: services } = await useItems('services')
const { createItem: createSale } = useCollection('sales')

const sale = ref<Sale>({
  service: null,
  worker: null,
  price: null,
  salon: props.salon.id,
})

function onSelectService(id: number) {
  const service = services.value.find(service => service.id === id)
  if (service)
    sale.value.price = Number(service.price)
}

async function submit() {
  await createSale(sale.value)
  emit('save', sale.value)
}
</script>

<template>
  <Card>
    <Select
      v-model="sale.service"
      label="$t:service"
      :options="services"
      option-label="name"
      apply-on-change
      close-on-apply
      @update:model-value="onSelectService($event as number)"
    />
    <SelectItems
      v-model="sale.worker"
      label="$t:worker"
      collection="workers"
      :fields="['id', 'name']"
      :filters="{ salon: props.salon.id }"
      close-on-apply
      apply-on-change
    />
  </Card>
  <Card>
    <InputNumber v-model="sale.price" label="$t:price" />
  </Card>
  <Button
    :disabled="!sale.service || !sale.worker || !sale.price"
    color="primary"
    label="$t:save"
    :click="submit"
  />
</template>
