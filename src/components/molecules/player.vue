<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { usePlayerStore } from 'store/player.store'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

// constant
const SongQuality = {
  extreme: '320kbps',
  best: '160kbps',
  good: '96kbps',
  fair: '48kbps',
  low: '12kbps',
}

// store
const { currentPlaying } = storeToRefs(usePlayerStore())

// refs
const player = ref<HTMLAudioElement>()
const playing = ref(false)
const progress = ref('0')
const quality = ref<string>(SongQuality.extreme)

// computed
const audioSource = computed(
  () =>
    currentPlaying.value?.downloadUrl?.find((link) => link.quality === quality.value)?.link || ''
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
</script>

<template>
  <nav
    v-if="currentPlaying && currentPlaying.id"
    class="fixed backdrop-blur-md h-20 bg-opacity-5 grid grid-cols-2 md:grid-cols-3 items-center justify-between border-t dark:border-gray-700 px-4 md:px-6 py-4 z-50 bottom-16 lg:bottom-0 bg-gray-50 dark:bg-gray-600 dark:bg-opacity-25 w-full"
  >
    <input
      class="absolute top-0 w-full h-1 appearance-none"
      type="range"
      :value="progress"
      min="0"
      :max="player?.duration"
      step=".1"
      @input="seek"
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
      class="flex space-x-2 md:space-x-4 items-center justify-end md:justify-center w-full text-gray-700 dark:text-gray-50"
    >
      <button class="hover:text-gray-500 dark:hover:text-gray-300">
        <Icon name="ic:round-skip-previous" size="44" />
      </button>
      <button
        v-if="!playing"
        class="bg-gray-700 dark:bg-gray-700 text-gray-50 rounded-full p-3"
        @click="playing = !playing"
      >
        <Icon name="ph:play-fill" size="24" />
      </button>
      <button
        v-else
        class="bg-gray-700 dark:bg-gray-700 text-gray-50 rounded-full p-3"
        @click="playing = !playing"
      >
        <Icon name="ph:pause-fill" size="24" />
      </button>
      <button class="hover:text-gray-500 dark:hover:text-gray-300">
        <Icon name="ic:round-skip-next" size="44" />
      </button>
    </div>

    <div class="w-full justify-end hidden items-center md:flex">
      <Menu as="div" class="relative inline-block">
        <MenuButton>
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
                    class="block py-2.5 hover:bg-gray-200 dark:hover:bg-gray-600 tracking-wide text-sm w-full text-left px-4"
                    @click="quality = q"
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
  </nav>
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
