<script lang="ts" setup>
import { useSearchStore } from 'store/search.store'
import ThemeSwitch from 'components/molecules/theme-switch.vue'
import Logo from 'components/atoms/logo.vue'
import { storeToRefs } from 'pinia'

const { searchAll } = useSearchStore()
const { searchResults } = storeToRefs(useSearchStore())

const search = ref('')
const expand = ref(false)
const target = ref(null)
const query = refDebounced(search, 500)

onClickOutside(target, () => (expand.value = false))

watch(query, () => (query.value === '' ? null : searchAll(query.value)))
</script>

<template>
  <header
    class="bg-gray-100 dark:bg-gray-900 h-16 md:h-24 px-6 md:px-8 fixed z-30 w-full flex items-center justify-between space-x-10"
  >
    <nuxt-link to="/">
      <Logo />
    </nuxt-link>
    <div
      ref="target"
      class="hidden relative w-[50%] lg:block ml-16 dark:border-gray-700 border-[2px] rounded-full"
    >
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
          class="h-full w-full rounded-full border-transparent dark:bg-gray-800 py-2 pl-16 pr-3 text-base dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 focus:border-transparent focus:placeholder-gray-400"
          placeholder="Search"
          type="search"
          @click="expand = true"
        />
      </div>

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-300 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-1 opacity-0"
      >
        <div
          v-show="expand"
          class="absolute dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 bg-gray-100 border w-full flex flex-row rounded-xl top-14 shadow-2xl p-6 transition"
        >
          <div v-if="!searchResults.topQuery" class="w-full">Search for anything...</div>
          <div v-else class="grid grid-cols-4 gap-4 w-full">
            <div class="flex flex-col space-y-2">
              <p>Top Results</p>
              <img
                v-for="(item, index) in searchResults?.topQuery?.results"
                :key="index"
                :src="item.image[0].link"
                class="h-12 rounded-md w-12"
              />
            </div>

            <div class="flex flex-col space-y-2">
              <p>Songs</p>
              <nuxt-link
                v-for="(item, index) in searchResults?.songs?.results"
                :key="index"
                :to="`/song/${item.id}`"
              >
                <img :src="item.image[0].link" class="h-12 rounded-md w-12" />
              </nuxt-link>
            </div>

            <div class="flex flex-col space-y-2">
              <p>Albums</p>
              <nuxt-link
                v-for="(item, index) in searchResults?.albums?.results"
                :key="index"
                :to="`/album/${item.id}`"
              >
                <img :src="item.image[0].link" class="h-12 rounded-md w-12" />
              </nuxt-link>
            </div>

            <div class="flex flex-col space-y-2">
              <p>Artists</p>
              <img
                v-for="(item, index) in searchResults?.artists?.results"
                :key="index"
                :src="item.image[0].link"
                class="h-12 rounded-md w-12"
              />
            </div>
          </div>
        </div>
      </transition>
    </div>
    <theme-switch />
  </header>
</template>
