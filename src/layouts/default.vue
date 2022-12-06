<script lang="ts" setup>
import AppHeader from 'components/organisms/app-header.vue'
import AppSidebar from 'components/organisms/app-sidebar.vue'
import Player from 'components/molecules/player.vue'
</script>

<template>
  <main class="no-select">
    <NuxtLoadingIndicator color="#f55" :height="3" />

    <app-header />
    <div class="flex overflow-hidden bg-gray-100 dark:bg-gray-900 pt-24">
      <app-sidebar />

      <div
        class="h-full w-full dark:bg-gray-900 text-gray-800 dark:text-gray-200 bg-gray-100 relative overflow-y-auto lg:ml-24 p-6"
      >
        <slot />
      </div>
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
  @apply bg-gray-100 dark:bg-gray-900;
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
