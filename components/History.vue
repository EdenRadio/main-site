<template>
  <div>
    <ul
      class="max-w-md divide-y divide-gray-200 dark:divide-gray-700"
      v-for="(item, index) in song_history"
      :key="index"
    >
      <li class="pb-3 sm:pb-4">
        <div class="flex items-center space-x-4">
          <div class="flex-shrink-0">
            <img
              class="w-8 h-8 rounded"
              :src="item.song.art"
              alt="Neil image"
            />
          </div>
          <div class="flex-1 min-w-0">
            <p
              class="text-sm font-medium text-gray-900 truncate dark:text-white"
            >
              {{ item.song.artist }}
            </p>
            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
              {{ item.song.title }}
            </p>
          </div>
          <div
            class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
          >
            time since played
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup>
const props = defineProps(["song_history"]);
</script>
<style lang=""></style>
