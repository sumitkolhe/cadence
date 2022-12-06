<script lang="ts" setup>
const sidebarNavigation = [
  { name: 'Home', href: '/', icon: 'material-symbols:home-rounded', current: false },
  { name: 'Trending', href: '/trending', icon: 'ph:fire-duotone', current: false },
  { name: 'Charts', href: '/charts', icon: 'ph:chart-bar-duotone', current: true },
  { name: 'New', href: '/new', icon: 'ph:crown-duotone', current: false },
]
</script>

<template>
  <aside
    class="fixed hidden z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-24 transition-width duration-75"
    aria-label="Sidebar"
  >
    <div class="relative flex-1 flex flex-col min-h-0 bg-gray-100 dark:bg-gray-900 pt-0">
      <div class="flex-1 w-full px-2 space-y-6 mt-10">
        <nuxt-link
          v-for="item in sidebarNavigation"
          :key="item.name"
          :to="item.href"
          active-class="text-black dark:text-gray-50"
          class="group w-full text-gray-400 dark:text-gray-500 p-3 rounded-md flex flex-col items-center text-xs font-medium"
          :aria-current="item.current ? 'page' : undefined"
        >
          <Icon :name="item.icon" size="24" />
          <!-- <span class="mt-2">{{ item.name }}</span> -->
        </nuxt-link>
      </div>
    </div>
  </aside>
</template>
