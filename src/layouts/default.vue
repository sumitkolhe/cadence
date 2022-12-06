<script lang="ts" setup>
import AppHeader from 'components/organisms/app-header.vue'
import AppSidebar from 'components/organisms/app-sidebar.vue'
import Player from 'components/molecules/player.vue'
</script>

<template>
  <main class="no-select flex flex-row">
    <NuxtLoadingIndicator color="#f55" :height="3" />
    <app-sidebar />
    <div class="w-full h-full ml-24">
      <app-header />

      <div class="mt-24 py-6 px-4">
        <slot />
      </div>

      <!-- <app-footer /> -->
    </div>
    <player />
  </main>
</template>

<style>
* {
  font-family: 'Inter', sans-serif !important;
}

.no-select {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.no-select:focus {
  outline: none !important;
}

body {
  @apply bg-gray-100 dark:bg-gray-800;
}

/* Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
