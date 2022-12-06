<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useSongsStore } from 'store/songs.store'
import { usePlayerStore } from 'store/player.store'

const { fetchSongDetailsById } = useSongsStore()
const { setCurrentSong } = usePlayerStore()
const { songDetails } = storeToRefs(useSongsStore())

const {
  params: { id },
} = useRoute()

onMounted(() => fetchSongDetailsById(id as string))
</script>

<template>
  <section class="">
    <div v-if="songDetails.id">
      <img class="rounded-xl" :src="songDetails.image[2].link" alt="" />
      <button @click="setCurrentSong(songDetails)">Play</button>
    </div>
    <div v-else>Song Not Found :(</div>
  </section>
</template>
