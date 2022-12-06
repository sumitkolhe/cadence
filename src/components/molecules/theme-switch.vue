<script setup lang="ts">
const { isDarkTheme, changeTheme } = useTheme()
</script>

<template>
  <button id="icon-prefix" label="theme" name="icon-prefix" @click="changeTheme">
    <Icon
      v-if="!isDarkTheme"
      name="line-md:sun-rising-loop"
      size="32"
      class="text-gray-900 dark:text-gray-500"
    />
    <Icon v-else name="line-md:moon" size="32" class="text-gray-900 dark:text-gray-600" />
  </button>
</template>
