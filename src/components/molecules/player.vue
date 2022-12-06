<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { usePlayerStore } from 'store/player.store'

const { currentPlaying } = storeToRefs(usePlayerStore())

const audioSource = computed(
  () => currentPlaying.value?.downloadUrl?.find((link) => link.quality === '320kbps')?.link || ''
)
</script>

<template>
  <nav
    v-if="currentPlaying.id"
    class="fixed flex items-center justify-between border-t dark:border-gray-700 space-x-6 px-8 py-4 z-50 text-white bottom-0 bg-gray-50 dark:bg-gray-800 rounded-t-xl w-full"
  >
    <div class="flex space-x-4">
      <img :src="currentPlaying.image[0].link" class="rounded-md dark:border-gray-700 border" />
      <div class="flex flex-col">
        <p class="text-gray-900 dark:text-gray-200 font-medium text-base">
          {{ currentPlaying.name }}
        </p>
        <p class="text-gray-600 dark:text-gray-400 text-sm font-light">
          {{ currentPlaying.primaryArtists }}
        </p>
      </div>
    </div>
    <div class="w-fit">
      <audio v-if="audioSource" :key="audioSource" controls autoplay class="w-full">
        <source :src="audioSource" />
      </audio>
    </div>
  </nav>
</template>
