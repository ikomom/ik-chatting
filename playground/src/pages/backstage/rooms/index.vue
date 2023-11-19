<script setup lang="tsx">
import type { DataTableColumns } from 'naive-ui'
import dayjs from 'dayjs'
import { deleteRoom, getAllRooms } from '@/apis/modules/room'

const { execute, state, isLoading } = useAsyncState(getAllRooms, [])

const columns: DataTableColumns = [
  { title: 'id', key: 'id', width: 200, ellipsis: true },
  { title: 'roomName', key: 'roomName' },
  { title: 'description', key: 'description' },
  {
    title: 'avatar',
    key: 'avatar',
    ellipsis: true,
    render({ avatar }) {
      return avatar ? <n-avatar src={avatar} size="large"/> : null
    },
  },
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
                 deleteRoom(row.id as string).then(() => {
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
      Rooms
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
