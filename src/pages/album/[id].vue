<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { usePlayerStore } from 'store/player.store'
import { useAlbumsStore } from 'store/albums.store'

const { fetchAlbumDetailsById } = useAlbumsStore()
const { setCurrentSong } = usePlayerStore()
const { albumDetails } = storeToRefs(useAlbumsStore())

const {
  params: { id },
} = useRoute()

onMounted(() => fetchAlbumDetailsById(id as string))
</script>

<template>
  <section class="">
    <div v-if="albumDetails.id" class="flex flex-col items-center md:flex-row md:space-x-6">
      <img class="rounded-xl h-44 w-44 md:h-64 md:w-64" :src="albumDetails.image[2].link" alt="" />
      <div class="flex flex-col items-center text-center space-y-2">
        <p class="text-center text-lg py-4">
          {{ albumDetails.name }}
          by
          {{ albumDetails.primaryArtists }}
        </p>

        <div v-for="(song, index) in albumDetails.songs" :key="index">
          {{ song.name }}
          <button
            class="bg-red-500 rounded-full text-gray-50 w-fit py-2 px-6"
            @click="setCurrentSong(song)"
          >
            Play
          </button>
        </div>
      </div>
    </div>
    <div v-else>loading...</div>
  </section>
</template>
