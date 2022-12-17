<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { SongQuality, usePlayerStore } from 'store/player.store'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'

// store
const { setCurrentQuality } = usePlayerStore()
const { currentPlaying, currentQuality, isMobilePlayerOpen } = storeToRefs(usePlayerStore())

// refs
const player = ref<HTMLAudioElement>()
const playing = ref(false)
const progress = ref('0')

// computed
const audioSource = computed(
  () =>
    currentPlaying.value?.downloadUrl?.find((link) => link.quality === currentQuality.value)
      ?.link || ''
)

// watchers
watch(audioSource, (newSource, oldSource) => {
  nextTick(() => {
    if (newSource !== oldSource) {
      playing.value = true
      player.value?.play()
      player.value?.addEventListener('timeupdate', () => {
        progress.value = player.value?.currentTime.toFixed() || '0'
      })
    }
  })
})

watch(playing, (isPlaying) => {
  nextTick(() => {
    if (isPlaying) player.value?.play()
    else player.value?.pause()

    player.value?.addEventListener('timeupdate', () => {
      progress.value = player.value?.currentTime.toFixed() || '0'
    })
  })
})

// methods
const seek = (event: Event) => {
  if (player.value) {
    if (!playing.value) playing.value = true
    player.value.currentTime = Number((event.target as HTMLInputElement).value) || 0
  }
}

const setQuality = (quality: string) => {
  setCurrentQuality(quality)
}

const secondsToMinutes = (time: number) => {
  // const h = Math.floor(time / 3600)
  //   .toString()
  //   .padStart(2, '0')
  const m = Math.floor((time % 3600) / 60)
    .toString()
    .padStart(2, '0')
  const s = Math.floor(time % 60)
    .toString()
    .padStart(2, '0')

  return `${m}:${s}`
}
</script>

<template>
  <section>
    <!-- player page  -->
    <transition-root as="template" :show="isMobilePlayerOpen">
      <Dialog as="div" class="relative z-[999999999]">
        <transition-child
          as="template"
          enter="transform transition ease-in-out duration-300"
          enter-from="translate-y-full "
          enter-to="translate-y-0"
          leave="transform transition ease-in-out duration-300"
          leave-from="translate-y-0"
          leave-to="translate-y-full"
        >
          <dialog-panel
            :style="{ backgroundImage: `url(${currentPlaying?.image[2].link})` }"
            class="fixed flex flex-col overflow-y-auto max-h-screen bg-cover bg-center h-full h-full w-screen inset-0 bg-gray-500"
          >
            <dialog-title class="flex px-4 py-4 justify-between text-gray-50">
              <Icon name="ph:x" size="20" @click="isMobilePlayerOpen = false" />
              <p>Now Playing</p>
              <Icon name="ph:dots-three-outline-vertical-fill" size="20" />
            </dialog-title>

            <div
              class="flex filter-none flex-col text-gray-200 items-center p-6 space-y-6 absolute w-full bottom-0 bg-gray-900 bg-opacity-25 border-t border-gray-500 backdrop-blur-md"
            >
              <div class="w-full flex">
                <div class="w-full">
                  <p class="font-medium text-xl text-left">
                    {{ currentPlaying?.name }}
                  </p>
                  <p class="text-sm text-left opacity-50">
                    {{ currentPlaying?.primaryArtists }}
                  </p>
                </div>

                <div class="w-full flex items-center justify-end">
                  <Menu as="div" class="relative inline-block">
                    <MenuButton @click.stop>
                      <Icon name="carbon:hd-filled" size="28" class="dark:text-gray-100" />
                    </MenuButton>

                    <transition
                      enter-active-class="transition duration-100 ease-out"
                      enter-from-class="transform scale-95 opacity-0"
                      enter-to-class="transform scale-100 opacity-100"
                      leave-active-class="transition duration-75 ease-in"
                      leave-from-class="transform scale-100 opacity-100"
                      leave-to-class="transform scale-95 opacity-0"
                    >
                      <MenuItems
                        class="absolute -top-[280px] backdrop-blur-md right-2 w-44 origin-top-right rounded-md bg-gray-900 bg-opacity-25 dark:text-gray-200 shadow-lg"
                      >
                        <div>
                          <p class="border-b dark:border-gray-500 p-3 font-medium">Quality</p>
                          <div class="py-2">
                            <MenuItem v-for="(q, index) in SongQuality" :key="index">
                              <button
                                :class="[
                                  currentQuality === q ? 'bg-gray-200 dark:bg-gray-800' : '',
                                ]"
                                class="block py-2.5 hover:bg-gray-200 dark:hover:bg-gray-600 tracking-wide text-sm w-full text-left px-4"
                                @click="setQuality(q)"
                              >
                                {{ q }}
                              </button>
                            </MenuItem>
                          </div>
                        </div>
                      </MenuItems>
                    </transition>
                  </Menu>
                </div>
              </div>

              <div class="flex w-full flex-col">
                <input
                  class="w-full h-1 rounded-md appearance-none"
                  type="range"
                  :value="progress"
                  min="0"
                  :max="player?.duration"
                  step=".1"
                  @input="seek"
                />
                <div class="flex justify-between text-sm py-1 text-gray-300">
                  <p>{{ secondsToMinutes(player?.currentTime || 0) }}</p>
                  <p>{{ secondsToMinutes(player?.duration || 0) }}</p>
                </div>
              </div>

              <div class="flex space-x-4 items-center justify-center w-full text-gray-50 pb-3">
                <button class="hover:text-gray-500">
                  <Icon name="ic:round-skip-previous" size="44" />
                </button>

                <button
                  v-if="!playing"
                  class="bg-gray-50 text-gray-900 rounded-full p-3"
                  @click.stop="playing = !playing"
                >
                  <Icon name="ph:play-fill" size="36" />
                </button>
                <button
                  v-else
                  class="bg-gray-50 text-gray-900 rounded-full p-3"
                  @click.stop="playing = !playing"
                >
                  <Icon name="ph:pause-fill" size="36" />
                </button>
                <button class="hover:text-gray-500 dark:hover:text-gray-300">
                  <Icon name="ic:round-skip-next" size="44" />
                </button>
              </div>
            </div>
          </dialog-panel>
        </transition-child>
      </Dialog>
    </transition-root>
    <ClientOnly>
      <!-- player bar  -->
      <nav
        v-if="currentPlaying && currentPlaying.id"
        class="w-full px-2 fixed md:px-0 bottom-20 md:bottom-0 z-[99999999]"
      >
        <div
          class="px-4 md:px-6 rounded-xl md:rounded-[0px] backdrop-blur-md w-full h-20 bg-opacity-10 flex flex-row items-center justify-between bg-gray-400 dark:bg-gray-400 dark:bg-opacity-20 w-full"
          @click="isMobilePlayerOpen = true"
        >
          <input
            class="top-0 w-full h-2 hidden md:absolute appearance-none"
            type="range"
            :value="progress"
            min="0"
            :max="player?.duration"
            step=".1"
            @input.stop="seek"
          />

          <div class="flex space-x-4 w-full justify-start">
            <img
              :src="currentPlaying.image[0].link"
              class="rounded-md dark:border-gray-700 border h-12"
            />
            <div class="flex flex-col">
              <p
                class="text-gray-900 dark:text-gray-200 font-medium text-base truncate w-[10ch] md:w-[30ch]"
              >
                {{ currentPlaying.name }}
              </p>
              <p
                class="text-gray-600 dark:text-gray-400 text-sm font-light truncate w-[10ch] md:w-[30ch]"
              >
                {{ currentPlaying.primaryArtists }}
              </p>
            </div>
          </div>

          <div
            class="flex space-x-4 items-center w-full justify-end md:justify-center text-gray-700 dark:text-gray-50"
          >
            <button class="hover:text-gray-500 dark:hover:text-gray-300 hidden md:block">
              <Icon name="ic:round-skip-previous" size="44" />
            </button>

            <button
              v-if="!playing"
              class="bg-gray-700 dark:bg-gray-700 text-gray-50 rounded-full p-3"
              @click.stop="playing = !playing"
            >
              <Icon name="ph:play-fill" size="24" />
            </button>
            <button
              v-else
              class="bg-gray-700 dark:bg-gray-700 text-gray-50 rounded-full p-3"
              @click.stop="playing = !playing"
            >
              <Icon name="ph:pause-fill" size="24" />
            </button>
            <button class="hover:text-gray-500 dark:hover:text-gray-300 hidden md:block">
              <Icon name="ic:round-skip-next" size="44" />
            </button>
          </div>

          <div class="w-full hidden items-center justify-end md:flex">
            <Menu as="div" class="relative inline-block">
              <MenuButton @click.stop>
                <Icon name="ph:dots-three-vertical-bold" size="28" class="dark:text-gray-100" />
              </MenuButton>

              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <MenuItems
                  class="absolute -top-[280px] right-2 w-44 origin-top-right rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200 shadow-lg"
                >
                  <div>
                    <p class="border-b dark:border-gray-500 p-3 font-medium">Quality</p>
                    <div class="py-2">
                      <MenuItem v-for="(q, index) in SongQuality" :key="index">
                        <button
                          :class="[currentQuality === q ? 'bg-gray-200 dark:bg-gray-800' : '']"
                          class="block py-2.5 hover:bg-gray-200 dark:hover:bg-gray-600 tracking-wide text-sm w-full text-left px-4"
                          @click="setQuality(q)"
                        >
                          {{ q }}
                        </button>
                      </MenuItem>
                    </div>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </div>
          <audio v-if="audioSource" :key="audioSource" ref="player" class="hidden">
            <source :src="audioSource" />
          </audio>
        </div>
      </nav>
    </ClientOnly>
  </section>
</template>

<style scoped>
input[type='range'] {
  margin: auto;
  -webkit-appearance: none;
  overflow: hidden;
  cursor: pointer;
  outline: none;
  border-radius: 0; /* iOS */
  background: transparent;
}

input[type='range']:focus {
  outline: none;
}

::-webkit-slider-runnable-track {
  background: #fff;
}

/*
 * 1. Set to 0 width and remove border for a slider without a thumb
 */
::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 0; /* 1 */
  height: 40px;
  background: #fff;
  box-shadow: -100vw 0 0 100vw tomato;
  border: none; /* 2px solid #999; */
}

::-moz-range-track {
  height: 40px;
  background: #ddd;
}

::-moz-range-thumb {
  background: #fff;
  height: 40px;
  width: 0; /* 20px; */
  border: none; /* 3px solid #999; */
  border-radius: 0 !important;
  box-shadow: -100vw 0 0 100vw tomato;
  box-sizing: border-box;
}

::-ms-fill-lower {
  background: tomato;
}

::-ms-thumb {
  background: #fff;
  border: 2px solid #999;
  height: 40px;
  width: 20px;
  box-sizing: border-box;
}

::-ms-ticks-after {
  display: none;
}

::-ms-ticks-before {
  display: none;
}

::-ms-track {
  background: #ddd;
  color: transparent;
  height: 40px;
  border: none;
}

::-ms-tooltip {
  display: none;
}
</style>
