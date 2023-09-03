<script setup lang="ts">
import { backStageRoute } from '@/router/routes'
</script>

<template>
  <div>
    start
    <n-card v-for="(route, i) in backStageRoute" :key="i" :title="route.name">
      <router-link v-for="(item, idx) in route.children" :key="idx" class="color-blue" :to="{ name: item.name }">
        {{ item.name }}
      </router-link>
    </n-card>
    <!--    <n-card title="backstage" /> -->
  </div>
</template>

<style scoped lang="scss">

</style>
