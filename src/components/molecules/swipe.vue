<script setup lang="ts">
export interface Path {
  name?: string
  path?: string
  params?: {
    [k: string]: string
  }
  query?: {
    [k: string]: string
  }
}

export interface SwipeOption {
  id: number | string
  icon?: string
  title?: string
  selected?: boolean
  path?: Path | string
}

type SwipeProps = {
  modelValue: number | string | null
  options: SwipeOption[]
  swiperColor?: string
  backgroundColor?: string
  iconColor?: string
  replaceRoute?: boolean
}

const props = withDefaults(defineProps<SwipeProps>(), {
  modelValue: null,
  options: () => [],
  backgroundColor: '#FFFFFF',
  iconColor: '#8066C7',
  swiperColor: '#8066C7',
  replaceRoute: false,
})

const emit = defineEmits(['update:modelValue'])

const router = useRouter()
const route = useRoute()

const prevSelected = ref<number>(0)
const currSelected = ref<number>(0)
const localOptions = ref<SwipeOption[]>([])
const enableWatch = ref<boolean>(true)
const btnItemWidth = ref<number>(0)
const borderSwiperRef = ref<HTMLElement>()
const btnContainerRef = ref<HTMLElement>()

watch(
  () => currSelected.value,
  (newVal) => {
    if (borderSwiperRef.value) {
      borderSwiperRef.value.style.transform = `translateX(${btnItemWidth.value * newVal}px)`
    }
  }
)

watch(
  () => props.modelValue,
  (newVal, oldVal) => {
    if (newVal != oldVal && enableWatch.value) {
      const target = localOptions.value.findIndex((option) => option.id == newVal)

      if (target > -1) {
        handleButtonClick(localOptions.value[target], target)
      }
    }
  }
)

watch(
  route,
  (newRoute) => {
    if (newRoute) {
      nextTick(() => {
        const target = localOptions.value.findIndex((option: SwipeOption) => {
          if (typeof option.path === 'string') {
            return option.path === newRoute.path
          } else {
            return (option.path || {}).name === newRoute.name
          }
        })
        if (target > -1) {
          handleButtonClick(localOptions.value[target], target)
        }
      })
    }
  },
  { immediate: true }
)

function cssLoader() {
  if (btnContainerRef.value && Array.isArray(btnContainerRef.value)) {
    btnItemWidth.value = btnContainerRef.value[0].offsetWidth
  }
  if (borderSwiperRef.value) {
    borderSwiperRef.value.style.width = `${btnItemWidth.value}px`
    borderSwiperRef.value.style.transform = `translateX(${
      btnItemWidth.value * currSelected.value
    }px)`
  }
}
function onResize() {
  cssLoader()
}

function handleButtonClick(button: SwipeOption, index: number) {
  if (index === currSelected.value) {
    return
  }

  currSelected.value = index

  if (prevSelected.value !== null) {
    localOptions.value[prevSelected.value].selected = false
  }

  localOptions.value[index].selected = true

  prevSelected.value = currSelected.value
  updateValue(button)
}

function updateValue(button: SwipeOption) {
  emit('update:modelValue', button.id)

  enableWatch.value = false
  setTimeout(() => {
    enableWatch.value = true
  }, 0)

  if (button.path && Object.keys(button.path).length > 0) {
    if (props.replaceRoute) {
      router.replace(button.path).catch(() => {
        //
      })
    } else {
      router.push(button.path)
    }
  }
}

onMounted(() => {
  cssLoader()
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => window.removeEventListener('resize', onResize))

localOptions.value = props.options.slice()
const index = localOptions.value.findIndex((item) => {
  if (item.id == props.modelValue) {
    return true
  }

  if (typeof item.path === 'object') {
    return (item.path || {}).name == (route || {}).name
  }

  return false
})

if (index > -1) {
  currSelected.value = index
  prevSelected.value = index

  localOptions.value[index].selected = true
}
</script>

<template>
  <div
    class="fixed flex items-end bottom-0 border-t border-gray-50 border-opacity-30 left-0 w-full z-[9999999] h-[64px] bg-gray-50 dark:bg-gray-800 backdrop-blur-md bg-opacity-5"
  >
    <div
      v-for="(button, index) in localOptions"
      :key="`simple-btn-${index}`"
      ref="btnContainerRef"
      class="flex items-center justify-center h-full basis-full transition-all duration-300"
      @click="handleButtonClick(button, index)"
    >
      <div class="flex flex-col justify-center items-center text-[#f55]">
        <div
          :class="[
            'text-[18px] transition-all duration 200ms ease-in-out text-gray-400',
            { 'mb-[20px] text-[#f55]': button.selected },
          ]"
        >
          <slot name="icon" :props="button">
            <i :class="`${button.icon}`" />
          </slot>
        </div>

        <div
          :class="[
            'absolute transition-all duration-200 ease-in-out top-[70px] text-[14px]',
            { 'top-[35px]': button.selected },
          ]"
        >
          <slot name="title" :props="button">
            {{ button.title }}
          </slot>
        </div>
      </div>
    </div>
    <div
      ref="borderSwiperRef"
      class="absolute top-0 left-0 h-[2px] transition-all duration-300 bg-[#f55]"
    />
  </div>
</template>
