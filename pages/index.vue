<template>
  <div class="w-screen min-h-screen">
    <div class="flex flex-row">
      <h1
        class="hidden md:flex lg:flex my-16 lg:my5 md:mx-auto mx-5 text-4xl font-bold text-white text-left"
      >
        {{ info.station.name }}
      </h1>
      <img
        src="/Eden-logo.png"
        alt="Eden of the west logo"
        class="ml-10 h-10 my-14 md:hidden lg:hidden"
      />
    </div>
    <div class="hero-content text-center text-white mx-auto lg:h-[75vh] grow">
      <div
        class="flex flex-col lg:flex-row-reverse grow h-full justify-around content-center"
      >
        <div class="my-auto w-1/2">
          <!-- ANCHOR Album art -->
          <AlbumArt :now_playing="info.now_playing" />
        </div>

        <div class="my-auto w-1/2">
          <!-- ANCHOR Meta data -->
          <MetaData :now_playing="info.now_playing" />

          <progress
            class="progress progress-info mt-5"
            :value="info.now_playing.elapsed"
            :max="info.now_playing.duration"
          ></progress>
          <div class="flex justify-between">
            <div class="mb-5">
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

          <!-- ANCHOR Volume slider -->
          <div>
            <input
              id="stream-vol"
              type="range"
              min="0"
              max="100"
              value="40"
              class="range range-info range-md hidden lg:flex"
              @click="setVolume"
            />
          </div>
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
  {
    pick: ["station", "now_playing", "song_history"],
  }
);

useHead({
  title: info.value.station.name,
  meta: [{ name: "description", content: info.value.station.description }],
});

const { isMobile } = useDevice();

console.log(isMobile);

let np = info.value.now_playing;
let st = info.value.station;

// SECTION Audio

// ANCHOR convert slider value
let volume = ref(false);

const convertSlider = () => {
  let v = document.getElementById("stream-vol").value;

  return v * 0.01;
};

// ANCHOR adjust volume with converted value
const setVolume = () => {
  let x = document.getElementById("stream");

  x.volume = convertSlider();
};
// !SECTION

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
