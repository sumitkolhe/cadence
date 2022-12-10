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
    <div
      v-if="albumDetails.id"
      class="flex w-full justify-center items-start flex-col md:flex-row md:space-x-8 md:px-24 pb-20 md:pb-0"
    >
      <div class="w-full md:w-1/3 items-start justify-center flex flex-col">
        <img
          class="rounded-xl h-44 w-44 md:h-64 md:w-64"
          :src="albumDetails.image[2].link"
          alt=""
        />
        <p class="text-center text-lg py-4">
          {{ albumDetails.name }}
          by
          {{ albumDetails.primaryArtists }}
        </p>
      </div>

      <div class="flex flex-col items-start space-y-2 w-full md:w-2/3">
        <div
          v-for="(song, index) in albumDetails.songs"
          :key="index"
          class="flex justify-between items-center w-full py-2"
        >
          <p>{{ index + 1 }}</p>

          <p>{{ song.name }}</p>
          <p>{{ song.primaryArtists }}</p>
          <button
            class="bg-red-500 rounded-full text-gray-50 items-center flex justify-center h-10 w-10"
            @click="setCurrentSong(song)"
          >
            <Icon name="ph:play-fill" size="20" />
          </button>
        </div>
      </div>
    </div>
    <div v-else>loading...</div>
  </section>
</template>
