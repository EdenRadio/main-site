<template>
  <div class="w-screen min-h-screen space-y-even">
    <div class="flex flex-row lg:my-16">
      <h1
        class="hidden md:flex lg:flex lg:my5 md:mx-auto mx-5 text-4xl font-bold text-white text-left"
      >
        {{ info.station.name }}
      </h1>
      <img
        src="/Eden-logo.png"
        alt="Eden of the west logo"
        class="ml-10 h-10 my-14 md:hidden lg:hidden"
      />
    </div>
    <div
      class="hero-content mt-10 text-center text-white lg:mx-auto lg:h-[75vh] grow"
    >
      <div
        class="flex flex-col lg:flex-row-reverse grow h-full justify-around content-center"
      >
        <div class="lg:my-auto lg:w-1/2">
          <!-- ANCHOR Album art -->
          <AlbumArt :now_playing="info.now_playing" />
        </div>

        <div class="lg:my-auto lg:w-1/2">
          <h2 class="hidden lg:flex font-bold text-left text-3xl mb-10">
            {{ info.now_playing.song.album }}
          </h2>

          <p class="hidden lg:flex lg:text-left lg:mb-10">Socials</p>
          <!-- ANCHOR Meta data -->
          <MetaData
            :now_playing="info.now_playing"
            :station="info.station"
            :song_history="info.song_history"
            class="lg:mb-20"
          />

          <progress
            class="progress progress-info mt-5"
            :value="info.now_playing.elapsed"
            :max="info.now_playing.duration"
          ></progress>
          <div class="flex justify-between mb-5">
            <div class="">
              {{
                new Date(info.now_playing.elapsed * 1000)
                  .toISOString()
                  .substring(14, 19)
              }}
            </div>
            <div>
              {{
                new Date(info.now_playing.duration * 1000)
                  .toISOString()
                  .substring(14, 19)
              }}
            </div>
          </div>

          <!-- SECTION Audio buttons -->
          <AudioButtons
            :station="info.station"
            :song_history="info.song_history"
            class="flex flex-row mb-5"
          />

          <!-- !SECTION -->
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "default",
});

const { data: info, refresh } = await useFetch(
  "https://edenofthewest.com/api/nowplaying/1",
  { pick: ["station", "now_playing", "song_history"] }
);

useHead({
  title: info.value.station.name,
  meta: [{ name: "description", content: info.value.station.description }],
});

let np = info.value.now_playing;
let st = info.value.station;

//ANCHOR Increment time
const increment = () => {
  np.elapsed++;
  if (np.elapsed >= np.duration) {
    refresh();
  }
};

let interval = setInterval(increment, 1000);
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
