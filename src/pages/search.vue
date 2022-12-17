<script lang="ts" setup>
import { useSearchStore } from 'store/search.store'
import { storeToRefs } from 'pinia'
import type { AllSearchResponse } from '~~/src/interfaces/search.interface'

const router = useRouter()
const { searchAll } = useSearchStore()
const { searchResults } = storeToRefs(useSearchStore())

const search = ref('')
const expand = ref(false)
const target = ref(null)
const query = refDebounced(search, 500)

onClickOutside(target, () => (expand.value = false))

watch(query, () => (query.value === '' ? null : searchAll(query.value)))

const routeTopQueryResult = (item: AllSearchResponse['topQuery']) => {
  const result = item.results[0]

  if (result.type === 'song') router.push(`/song/${result.id}`)
  else if (result.type === 'album') router.push(`/album/${result.id}`)
  else if (result.type === 'artist') router.push(`/artist/${result.id}`)
}
</script>

<template>
  <section>
    <div class="dark:border-gray-700 border-2 rounded-full -mt-3 lg:hidden">
      <label for="search-field" class="sr-only">Search everything</label>
      <div
        class="relative w-full text-gray-300 focus-within:text-gray-600 dark:focus-within:text-gray-300"
      >
        <div class="pointer-events-none absolute inset-y-0 left-4 flex items-center">
          <Icon name="ph:magnifying-glass-duotone" />
        </div>
        <input
          id="search-field"
          v-model="search"
          name="search-field"
          class="h-full w-full rounded-full border-transparent dark:bg-gray-800 py-3 pl-16 pr-3 text-base dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 focus:border-transparent focus:placeholder-gray-400"
          placeholder="Search"
          type="search"
          @click="expand = true"
        />
      </div>
    </div>

    <div v-if="searchResults.topQuery" class="grid gridrow-4 gap-6 w-full mt-6">
      <div v-if="searchResults.topQuery.results.length > 0">
        <p class="font-medium my-2 text-gray-600 dark:text-gray-200">Top Results</p>
        <div class="flex flex-row space-x-4 overflow-x-scroll no-scrollbar">
          <img
            v-for="(item, index) in searchResults?.topQuery?.results"
            :key="index"
            :src="item.image[2].link"
            class="h-32 rounded-md w-32"
            @click="routeTopQueryResult(item as unknown as AllSearchResponse['topQuery'])"
          />
        </div>
      </div>

      <div v-if="searchResults.songs.results.length > 0">
        <p class="font-medium my-2 text-gray-600 dark:text-gray-200">Songs</p>
        <div class="flex flex-row space-x-4 overflow-x-scroll no-scrollbar">
          <img
            v-for="(item, index) in searchResults?.songs?.results"
            :key="index"
            :src="item.image[2].link"
            class="h-32 rounded-md w-32"
            @click="$router.push(`/song/${item.id}`)"
          />
        </div>
      </div>

      <div v-if="searchResults.albums.results.length > 0">
        <p class="font-medium my-2 text-gray-600 dark:text-gray-200">Albums</p>
        <div class="flex flex-row space-x-4 overflow-x-scroll no-scrollbar">
          <img
            v-for="(item, index) in searchResults?.albums?.results"
            :key="index"
            :src="item.image[2].link"
            class="h-32 rounded-md w-32"
            @click="$router.push(`/album/${item.id}`)"
          />
        </div>
      </div>

      <div v-if="searchResults.artists.results.length > 0">
        <p class="font-medium my-2 text-gray-600 dark:text-gray-200">Artists</p>
        <div class="flex flex-row space-x-4 overflow-x-scroll no-scrollbar">
          <img
            v-for="(item, index) in searchResults?.artists?.results"
            :key="index"
            :src="item.image[2].link"
            class="h-32 rounded-md w-32"
          />
        </div>
      </div>
    </div>
  </section>
</template>
