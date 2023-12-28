type Scroll = ReturnType<typeof useScroll>

const defaultScroll: Scroll = {
  x: computed(() => 0),
  y: computed(() => 0),
  isScrolling: ref(false),
  arrivedState: {
    left: true,
    right: false,
    top: true,
    bottom: false,
  },
  measure() {
  },
  directions: reactive({
    left: false,
    right: false,
    top: false,
    bottom: false,
  }),
}

export function useSearchScroll(selector: string) {
  const scroll: Scroll = defaultScroll
  tryOnUnmounted(() => {
    const el = document.querySelector(selector) as HTMLDivElement
    const oScroll = useScroll(el)
  })
  return scroll
}
