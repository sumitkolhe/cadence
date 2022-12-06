<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useModulesStore } from 'store/modules.store'

const { fetchModules } = useModulesStore()
const { modules } = storeToRefs(useModulesStore())

onMounted(() => fetchModules())
</script>

<template>
  <section class="text-gray-400">
    <p class="text-lg font-medium uppercase tracking-wider">Trending</p>

    <div class="flex overflow-x-scroll py-6 no-scrollbar">
      <div v-if="modules?.albums" class="flex flex-nowrap mr-28">
        <div v-for="(i, idx) in modules.albums" :key="idx" class="inline-block px-3">
          <div
            class="h-44 w-44 overflow-hidden rounded-2xl bg-white hover:gray-500 duration-300 ease-in-out hover:drop-shadow-lg"
          >
            <img :src="i.image[2].link" class="rounded-2xl object-fill" />
          </div>
        </div>
      </div>
    </div>

    <div class="flex overflow-x-scroll py-6 no-scrollbar">
      <div v-if="modules?.trending?.songs" class="flex flex-nowrap mr-28">
        <div v-for="(i, idx) in modules.trending.songs" :key="idx" class="inline-block px-3">
          <nuxt-link :to="`/song/${i.id}`">
            <div
              class="h-44 w-44 overflow-hidden rounded-2xl bg-white hover:gray-500 duration-300 ease-in-out hover:drop-shadow-lg"
            >
              <img :src="i.image[2].link" class="rounded-2xl object-fill" />
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>
