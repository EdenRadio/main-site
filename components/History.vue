<template>
  <div>
    <ul
      class="max-w-md divide-y divide-gray-200 dark:divide-gray-700"
      v-for="(item, index) in song_history"
      :key="index"
    >
      <li class="mb-3">
        <div class="flex items-center space-x-4">
          <div class="flex-shrink-0">
            <img
              class="w-8 h-8 rounded"
              :src="item.song.art"
              :alt="item.song.artist + ' album art'"
            />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold">
              {{ item.song.artist }}
            </p>
            <p class="text-sm text-white truncate">
              {{ item.song.title }}
            </p>
          </div>
          <div
            class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
          >
            {{ DateTime.fromSeconds(item.played_at).toRelative() }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { DateTime } from "luxon";
const props = defineProps(["song_history"]);
</script>
