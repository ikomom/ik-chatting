<script setup lang="ts" generic="T extends unknown">
import { throttle } from 'lodash-es'

const props = withDefaults(
  defineProps<{
    api: (args: API.Offset) => Promise<any>
    pageSize?: number
  }>(),
  {
    pageSize: 20,
  },
)

const data = ref<any>([])
const total = ref(0)
const { pageCount, currentPage, currentPageSize, prev, next } = useOffsetPagination({
  total,
  page: 1,
  pageSize: props.pageSize,
})

// const [isPullingUp, setIsPullingUp] = useToggle(false)
// const [isInit, setIsInit] = useToggle(true)
const [isNoData, setIsNoData] = useToggle(false)
const [isLoading, setIsLoading] = useToggle(false)

const wrapper = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)

const onScroll = throttle((e: { target: HTMLElement }) => {
  if (!isNoData.value && e.target.scrollTop < 40) {
    next()
    getData()
  }
}, 300)

function scrollToBottom() {
  if (content.value && wrapper.value)
    wrapper.value.scrollTop = content.value.scrollHeight
}

function resetPage() {
  setIsNoData(false)
  data.value = []
  total.value = 0
  currentPage.value = 1
  currentPageSize.value = props.pageSize
}

function getData() {
  if (isNoData.value || isLoading.value)
    return
  setIsLoading(true)
  const args = {
    page: unref(currentPage),
    pageSize: unref(currentPageSize),
  }
  return props
    .api(args)
    .then((res) => {
      if (res) {
        total.value = res.total || 0
        data.value.unshift(...(res.list || []))
        if (data.value.length >= total.value || args.pageSize >= total.value)
          setIsNoData(true)
      }
    })
    .finally(() => {
      setIsLoading(false)
    })
}

defineExpose({
  async refresh() {
    console.log('refresh')
    resetPage()
    await getData()
    scrollToBottom()
  },
})
</script>

<template>
  <div class="visual-scroll-container">
    <slot name="header" />
    <div
      ref="wrapper"
      class="visual-scroll-wrapper"
      @scroll="onScroll"
    >
      <div ref="content" class="visual-scroll-content">
        <div v-if="isNoData" text-center op75>
          {{ data.length ? '我是有底线的' : '空空如也' }} ~
        </div>
        <div v-else-if="isLoading" text-center>
          <n-spin :size="14" stroke="#fff" />
        </div>
        <slot
          v-for="(item, index) in data"
          :item="item"
          :index="index"
          class="scroll-item"
          name="item"
        />
      </div>
    </div>
    <slot name="footer" />
  </div>
</template>

<style scoped lang="scss">
.visual-scroll-container {
  //flex: 1;
  display: flex;
  flex-direction: column;

  .visual-scroll-wrapper {
    height: 330px;
    //background: red;
    overflow: auto;

    .visual-scroll-content {
    }
  }
}
</style>
