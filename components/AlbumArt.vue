<template lang="">
  <div>
    <transition name="fade" mode="out-in" appear>
      <img
        class="m-auto rounded w-auto h-80"
        :src="now_playing.song.art"
        :alt="now_playing.song.album + ' album art'"
        srcset=""
      />
    </transition>
  </div>
</template>
<script setup>
const props = defineProps(["now_playing"]);
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
