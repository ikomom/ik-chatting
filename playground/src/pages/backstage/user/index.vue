<script setup lang="tsx">
import type { DataTableColumns } from 'naive-ui'
import { deleteUser, getAllUser } from '@/apis'

const { execute, state, isLoading } = useAsyncState(getAllUser, [])

const columns: DataTableColumns = [
  { title: 'id', key: 'id' },
  { title: 'username', key: 'username' },
  { title: 'status', key: 'status' },
  { title: 'avatar', key: 'avatar' },
  { title: 'tag', key: 'tag' },
  { title: 'createTime', key: 'createTime' },
  {
    title: 'Actions',
    key: 'action',
    render(row) {
      return (
          <n-button
              type="error"
              on-click={() => {
                const bool = confirm('delete')
                if (bool) {
                  deleteUser(row.id as string).then((res) => {
                    execute()
                  })
                }
              }}
          >
            Delete
          </n-button>
      )
    },
  },
]
</script>

<template>
  <div flex="~ col">
    <div mb-8>
      User
    </div>
    <n-data-table flex-1 :loading="isLoading" :data="state" :columns="columns" />
  </div>
</template>

<style scoped lang="scss">

</style>
