<script setup lang="tsx">
import type { DataTableColumns } from 'naive-ui'
import dayjs from 'dayjs'
import { deleteUser, getAllUser } from '@/apis'

const { execute, state, isLoading } = useAsyncState(getAllUser, [])

const columns: DataTableColumns = [
  { title: 'id', key: 'id', width: 200, ellipsis: true },
  { title: 'username', key: 'username' },
  { title: 'status', key: 'status' },
  { title: 'avatar', key: 'avatar' },
  { title: 'tag', key: 'tag' },
  {
    title: 'createTime',
    key: 'createTime',
    render({ createTime }) {
      return createTime ? dayjs(createTime as number).format('YYYY-MM-DD HH:mm:ss') : ''
    },
  },
  {
    title: 'Actions',
    key: 'action',
    render(row) {
      //  <n-button type="primary">Edit</n-button>
      return (
         <n-space>
           <n-button
             type="error"
             on-click={() => {
               const bool = confirm('delete')
               if (bool) {
                 deleteUser(row.id as string).then(() => {
                   execute()
                 })
               }
             }}
           >
             Delete
           </n-button>
         </n-space>
      )
    },
  },
]
</script>

<template>
  <div flex="~ col">
    <div mb-2>
      User
      <n-space justify="end">
        <n-button type="primary" :loading="isLoading" @click="execute()">
          refresh
        </n-button>
      </n-space>
    </div>
    <n-data-table flex-1 :loading="isLoading" :data="state" :columns="columns" />
  </div>
</template>

<style scoped lang="scss">

</style>
