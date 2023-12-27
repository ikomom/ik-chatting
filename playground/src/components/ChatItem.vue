<script setup lang="ts">
withDefaults(
  defineProps<{
    avatar?: string
    title?: string
    description?: string
    reverse?: boolean
  }>(),
  {
    reverse: false,
  },
)
</script>

<template>
  <div
    flex="~ gap-3"
    px-2 py-1
    :class="[reverse ? 'flex-row-reverse text-right' : undefined]"
  >
    <n-avatar v-if="avatar" size="large" flex-shrink-0 :src="avatar" />
    <div class="flex-1" truncate>
      <div v-if="title" truncate>
        {{ title }}
      </div>
      <div v-if="description" truncate op50>
        {{ description }}
      </div>
      <slot v-else name="description" />
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
