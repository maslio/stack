<script setup lang="ts">

</script>

<template>
  <Card>
    <InputDate />
    <InputDateRange />
  </Card>
  <Card>
    <InputString label="String" />
    <InputText label="Text" />
    <InputNumber label="Sum" :decimal="2" />
  </Card>
</template>
