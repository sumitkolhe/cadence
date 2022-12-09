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
    <div v-if="songDetails.id" class="flex flex-col items-center md:flex-row md:space-x-6">
      <img class="rounded-xl h-44 w-44 md:h-64 md:w-64" :src="songDetails.image[2].link" alt="" />
      <div class="flex flex-col items-center text-center space-y-2">
        <p class="text-center text-lg py-4">
          {{ songDetails.name }}
          by
          {{ songDetails.primaryArtists }}
        </p>

        <p>{{ songDetails.duration }}</p>
        <p>{{ songDetails.playCount }}</p>
        <p>{{ songDetails.copyright }}</p>
        <button
          class="bg-red-500 rounded-full text-gray-50 w-fit py-2 px-6"
          @click="setCurrentSong(songDetails)"
        >
          Play
        </button>
      </div>
    </div>
    <div v-else>loading...</div>
  </section>
</template>
