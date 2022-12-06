<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useSearchStore } from 'store/search.store'
import { usePlayerStore } from 'store/player.store'

const { searchedSongs } = storeToRefs(useSearchStore())

const { setCurrentSong } = usePlayerStore()
</script>

<template>
  <div class="p-32 px-6 overflow-hidden bg-white dark:bg-black">
    <div v-for="(song, index) in searchedSongs" :key="index" @click="setCurrentSong(song)">
      <img :src="song.image[2].link" />
    </div>
  </div>
</template>
