<script setup lang="ts" generic="T extends unknown">
import BScroll from '@better-scroll/core'

const props = defineProps<{ data: T[] }>()
const emit = defineEmits<{ (e: 'loading', page: number): void }>()

const [isPullUpLoad, setIsPullUpload] = useToggle(false)
const [isPullingDown, setIsPullingDown] = useToggle(false)
const [beforePullDown, setBeforePullDown] = useToggle(true)
const scrollWrapperRef = ref()

const TIME_BOUNCE = 300
const TIME_STOP = 200

let bs!: BScroll
async function handlePullingUp() {
  console.log('handlePullingUp', isPullUpLoad.value)
  setIsPullUpload(true)
  await sleep(2000)
  bs.finishPullUp()
  bs.refresh()
  setIsPullUpload(false)
}

async function handlePullingDown() {
  console.log('handlePullingDown')
  setBeforePullDown(false)
  setIsPullingDown(true)
  await sleep(2000)
  setIsPullingDown(false)
  await finishPullDown()
}

async function finishPullDown() {
  await sleep(TIME_STOP)
  bs.finishPullDown()
  setTimeout(() => {
    console.log('finishPull refresh')
    setBeforePullDown(true)
    bs.refresh()
  }, TIME_BOUNCE)
}

onMounted(() => {
  bs = new BScroll(scrollWrapperRef.value, {
    probeType: 3,
    mouseWheel: {
      speed: 20,
      invert: false,
      easeTime: 100,
    },
    bounceTime: 10,
    pullUpLoad: {
      threshold: 0,
    },
    pullDownRefresh: {
      threshold: 0,
      stop: 0,
    },
  })
  bs.on('scrollStart', () => {
    console.log('scrollStart-')
  })
  bs.on('scroll', ({ y }: { y: number }) => {
    console.log('scrolling-', y)
  })
  bs.on('scrollEnd', (pos: any) => {
    console.log('scrollEnd', pos)
  })
  bs.on('pullingUp', handlePullingUp)
  bs.on('pullingDown', handlePullingDown)
})
</script>

<template>
  <div ref="scrollWrapperRef" class="scroll-wrapper">
    <div class="scroll-content">
      <div class="pulldown-tips">
        <div v-show="beforePullDown">
          <span>Pull Down and refresh</span>
        </div>
        <div v-show="!beforePullDown">
          <div v-show="isPullingDown">
            <span>Loading...</span>
          </div>
          <div v-show="!isPullingDown">
            <span>Refresh success</span>
          </div>
        </div>
      </div>
      <slot
        v-for="(item, index) in data"
        :item="item"
        :index="index"
        class="scroll-item"
        name="item"
      />
      <div class="pullup-tips">
        <div v-if="!isPullUpLoad" class="before-trigger">
          <span class="pullup-txt">load more</span>
        </div>
        <div v-else class="after-trigger">
          <span class="pullup-txt">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.scroll-wrapper {
  height: 400px;
  position: relative;
  overflow: hidden;

  .scroll-content {

  }

  .pullup-tips, .pulldown-tips {
    padding: 10px;
    text-align: center;
    color: rgba(255, 255, 255, 0.58);
  }
}
</style>
