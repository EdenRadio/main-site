<template lang="">
  <div>
    <transition name="fade" mode="out-in" appear>
      <nuxt-img
        class="w-80 lg:h-96 lg:w-96 m-auto rounded"
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
