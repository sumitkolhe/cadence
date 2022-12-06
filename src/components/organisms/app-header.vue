<script lang="ts" setup>
import { useSearchStore } from 'store/search.store'

const { searchSongs } = useSearchStore()
</script>

<template>
  <header class="w-full fixed z-10 dark:bg-gray-900 bg-gray-100 flex py-6 px-4 border-b">
    <form class="flex dark:border-gray-700 border-[2px] rounded-full w-fit" action="#" method="GET">
      <label for="search-field" class="sr-only">Search all files</label>
      <div class="relative w-full text-gray-300 focus-within:text-gray-600">
        <div class="pointer-events-none absolute inset-y-0 left-4 flex items-center">
          <Icon name="ph:magnifying-glass-duotone" class="focus:text-red-500" />
        </div>
        <input
          id="search-field"
          name="search-field"
          class="h-full w-full rounded-full border-transparent dark:bg-gray-800 py-2 pl-16 pr-3 text-base dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400"
          placeholder="Search"
          type="search"
          @input="searchSongs($event.target.value)"
        />
      </div>
    </form>

    <!-- <div class="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
      
          <Menu as="div" class="relative flex-shrink-0">
            <div>
              <MenuButton
                class="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                  alt=""
                />
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                  <a
                    :href="item.href"
                    :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                    >{{ item.name }}</a
                  >
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>

          <button
            type="button"
            class="flex bg-indigo-600 p-1 rounded-full items-center justify-center text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
          
            <span class="sr-only">Add file</span>
          </button>
        </div> -->
  </header>
</template>
