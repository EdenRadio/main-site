<template>
  <div>
    <p class="mt-5 mb-2 font-bold">
      {{ now_playing.song.artist }}
    </p>
    <p>{{ now_playing.song.title }}</p>
  </div>
</template>
<script setup>
const props = defineProps(["now_playing"]);
</script>
