<script lang="ts" setup>
import { useSearchStore } from 'store/search.store'
import ThemeSwitch from 'components/molecules/theme-switch.vue'

const { searchSongs } = useSearchStore()

const search = ref('')
const query = refDebounced(search, 500)

watch(query, () => (query.value === '' ? null : searchSongs(query.value)))
</script>

<template>
  <header
    class="w-full relative fixed items-center justify-evenly flex-row dark:bg-gray-900 bg-gray-100 flex py-6 px-4"
  >
    <div class="flex w-[50%] dark:border-gray-700 border-[2px] rounded-full">
      <label for="search-field" class="sr-only">Search everything</label>
      <div class="relative w-full text-gray-300 focus-within:text-gray-600">
        <div class="pointer-events-none absolute inset-y-0 left-4 flex items-center">
          <Icon name="ph:magnifying-glass-duotone" class="focus:text-red-500" />
        </div>
        <input
          id="search-field"
          v-model="search"
          name="search-field"
          class="h-full w-full rounded-full border-transparent dark:bg-gray-800 py-2 pl-16 pr-3 text-base dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400"
          placeholder="Search"
          type="search"
        />
      </div>
    </div>

    <div class="right-0"><theme-switch /></div>
  </header>
</template>
