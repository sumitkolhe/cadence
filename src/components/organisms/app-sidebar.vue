<script lang="ts" setup>
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from '@headlessui/vue'
import Logo from 'components/atoms/logo.vue'

const sidebarNavigation = [
  { name: 'Home', href: '/', icon: 'material-symbols:home-rounded', current: false },
  { name: 'Trending', href: '/trending', icon: 'ph:fire-duotone', current: false },
  { name: 'Charts', href: '/charts', icon: 'ph:chart-bar-duotone', current: true },
  { name: 'New', href: '/new', icon: 'ph:crown-duotone', current: false },
]
const mobileMenuOpen = ref(false)
</script>

<template>
  <div>
    <div
      class="hidden fixed left-0 w-24 bg-gray-100 dark:bg-gray-900 overflow-y-auto md:block h-screen"
    >
      <div class="w-full py-7 flex flex-col items-center">
        <div class="flex-shrink-0 flex items-center">
          <Logo />
        </div>
        <div class="flex-1 mt-10 w-full px-2 space-y-6">
          <nuxt-link
            v-for="item in sidebarNavigation"
            :key="item.name"
            :to="item.href"
            active-class="dark:text-gray-50 text-gray-900"
            class="group w-full text-gray-400 dark:text-gray-500 p-3 rounded-md flex flex-col items-center text-xs font-medium"
            :aria-current="item.current ? 'page' : undefined"
          >
            <Icon :name="item.icon" />
            <!-- <span class="mt-2">{{ item.name }}</span> -->
          </nuxt-link>
        </div>
      </div>
    </div>
    <!-- Mobile menu -->
    <TransitionRoot as="template" :show="mobileMenuOpen">
      <Dialog as="div" class="md:hidden" @close="mobileMenuOpen = false">
        <div class="fixed inset-0 z-40 flex">
          <TransitionChild
            as="template"
            enter="transition-opacity ease-linear duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </TransitionChild>
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <div class="relative max-w-xs w-full bg-indigo-700 pt-5 pb-4 flex-1 flex flex-col">
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div class="absolute top-1 right-0 -mr-14 p-1">
                  <button
                    type="button"
                    class="h-12 w-12 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
                    @click="mobileMenuOpen = false"
                  >
                    <!-- <XIcon class="h-6 w-6 text-white" aria-hidden="true" /> -->
                    <span class="sr-only">Close sidebar</span>
                  </button>
                </div>
              </TransitionChild>
              <div class="flex-shrink-0 px-4 flex items-center">
                <img
                  class="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                  alt="Workflow"
                />
              </div>
              <div class="mt-5 flex-1 h-0 px-2 overflow-y-auto">
                <nav class="h-full flex flex-col">
                  <div class="space-y-1">
                    <a
                      v-for="item in sidebarNavigation"
                      :key="item.name"
                      :href="item.href"
                      :class="[
                        item.current
                          ? 'bg-indigo-800 text-white'
                          : 'text-indigo-100 hover:bg-indigo-800 hover:text-white',
                        'group py-2 px-3 rounded-md flex items-center text-sm font-medium',
                      ]"
                      :aria-current="item.current ? 'page' : undefined"
                    >
                      <component
                        :is="item.icon"
                        :class="[
                          item.current ? 'text-white' : 'text-indigo-300 group-hover:text-white',
                          'mr-3 h-6 w-6',
                        ]"
                        aria-hidden="true"
                      />
                      <span>{{ item.name }}</span>
                    </a>
                  </div>
                </nav>
              </div>
            </div>
          </TransitionChild>
          <div class="flex-shrink-0 w-14" aria-hidden="true">
            <!-- Dummy element to force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s;
}
.slide-fade-leave-active {
  transition: all 0.3s;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
