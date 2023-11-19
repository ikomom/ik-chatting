<script setup lang="ts">
import { ALL_ROUTES } from '@/router/routes'
</script>

<template>
  <div class="p4">
    <n-card v-for="(route, i) in ALL_ROUTES" :key="i" :title="route.name" class="mb-4 shadow-md">
      <router-link class="color-blue" :to="route.path">
        {{ route.name }}
      </router-link>
      <div v-if="route.children?.length" class="bg-yellow p-3">
        <p>Children</p>
        <router-link v-for="(item, idx) in route.children" :key="idx" class="color-blue" :to="{ name: item.name }">
          {{ item.name }} <br>
        </router-link>
      </div>
    </n-card>
    <!--    <n-card title="backstage" /> -->
  </div>
</template>

<style scoped lang="scss">

</style>
