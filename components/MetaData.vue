<template>
  <div class="flex flex-row">
    <div class="hidden lg:flex mt-auto">
      <a :href="station.playlist_pls_url" class="">
        <button
          role="button"
          aria-label="Download playlist file"
          class="btn btn-ghost font-light px-0 mr-3 text-white normal-case flex-col hover:bg-transparent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.0"
            stroke="currentColor"
            class="w-6 h-6 mx-auto"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
          Playlist
        </button>
      </a>
    </div>
    <div class="mx-auto lg:mx-2 lg:mt-auto">
      <p class="mt-5 mb-2 font-bold">
        {{ now_playing.song.artist }}
      </p>
      <p>{{ now_playing.song.title }}</p>
    </div>
  </div>
</template>
<script setup>
const props = defineProps(["now_playing", "station", "song_history"]);
</script>
