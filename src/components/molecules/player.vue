<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { usePlayerStore } from 'store/player.store'

const { currentPlaying } = storeToRefs(usePlayerStore())

const src = ref('')

watch(currentPlaying, (old) => {
  const l = old.downloadUrl?.filter((i) => i.quality === '320kbps')
  src.value = l[0].link
})
</script>

<template>
  <nav
    class="h-fit fixed z-50 text-white bottom-0 border-gray-200 bg-white dark:bg-gray-800 rounded-t-xl w-full"
  >
    <audio v-if="src" :key="src" controls class="w-full">
      <source :src="src" />
    </audio>

    <!-- <audio v-if="src" ref="audio" :key="src" />
    <button class="bg-black" @click="playing = !playing">Play / Pause</button> -->
  </nav>
</template>
