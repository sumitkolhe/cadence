<script setup lang="ts">
import Swipe from 'components/molecules/swipe.vue'
const { isDarkTheme } = useTheme()
const selectedTab = ref(0)
const options = [
  { id: 1, title: 'Home', path: '/', icon: 'material-symbols:home-rounded' },
  { id: 2, title: 'Search', path: '/search', icon: 'ph:magnifying-glass-duotone' },
  { id: 3, title: 'Trending', path: '/trending', icon: 'ph:fire-duotone' },
  { id: 4, title: 'Charts', path: '/charts', icon: 'ph:chart-bar-duotone' },
]
</script>

<template>
  <section class="fixed lg:hidden bottom-0 h-16 w-full">
    <swipe v-model="selectedTab" :options="options">
      {{ isDarkTheme }}
      <template #icon="{ props }">
        <Icon :name="props.icon!" size="24" class="" />
      </template>
    </swipe>
  </section>
</template>
