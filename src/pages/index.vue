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
    <div v-if="modules?.trending?.albums" class="grid grid-cols-6 gap-6 my-4">
      <div
        v-for="(i, idx) in modules.trending.albums"
        :key="idx"
        class="rounded-2xl border relative"
      >
        <img :src="i.image[2].link" class="rounded-2xl" />

        <p
          class="bottom-0 h-12 rounded-b-2xl px-3 bg-opacity-75 absolute bg-gray-900 text-gray-50 flex items-center w-full"
        >
          {{ i.name }}
        </p>
      </div>
    </div>
  </section>
</template>
