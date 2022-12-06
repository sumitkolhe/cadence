<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useModulesStore } from 'store/modules.store'

const { fetchModules } = useModulesStore()
const { modules } = storeToRefs(useModulesStore())

onMounted(() => fetchModules())
</script>

<template>
  <section class="text-gray-900">
    <p class="text-lg font-medium uppercase tracking-wider">Trending</p>

    <div class="flex overflow-x-scroll py-6 no-scrollbar">
      <div v-if="modules?.albums" class="flex flex-nowrap mr-28">
        <div v-for="(i, idx) in modules.albums" :key="idx" class="inline-block px-3">
          <div
            class="h-44 w-44 overflow-hidden rounded-lg bg-white hover:gray-500 duration-300 ease-in-out"
          >
            <img :src="i.image[2].link" class="rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
