<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useModulesStore } from 'store/modules.store'

const { fetchModules } = useModulesStore()
const { modules } = storeToRefs(useModulesStore())

onMounted(() => fetchModules())
</script>

<template>
  <section class="text-gray-400">
    <!-- <p class="text-base uppercase tracking-wider px-4">Trending</p> -->

    <div class="flex overflow-x-scroll py-6 no-scrollbar">
      <div v-if="modules?.albums" class="flex flex-nowrap mr-28">
        <div v-for="(i, idx) in modules.trending.albums" :key="idx" class="inline-block px-3">
          <nuxt-link :to="`/album/${i.id}`">
            <div
              class="h-44 w-44 relative group overflow-hidden rounded-xl bg-white duration-300 ease-in-out"
            >
              <img :src="i.image[2].link" class="rounded-xl object-fill" />
              <div
                class="opacity-0 group-hover:opacity-75 duration-300 absolute inset-0 z-10 flex justify-center items-center text-xl bg-gray-900"
              >
                <button
                  class="text-gray-50 rounded-full flex items-center justify-center bg-red-500 opacity-100 h-10 w-10"
                >
                  <Icon name="ph:play-fill" />
                </button>
              </div>
            </div>
          </nuxt-link>
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
