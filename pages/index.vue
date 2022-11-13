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
          <div class="hidden lg:flex lg:flex-row">
            <div class="flex w-1/2">
              <p class="invisible lg:flex lg:text-left lg:mb-10">Socials</p>
            </div>
            <div class="flex space-x-5 w-1/2 justify-end">
              <button
                type="button"
                class="btn bg-white rounded-full cursor-not-allowed"
                disabled
              >
                <svg
                  class="w-6 h-6 text-blue-600 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  />
                </svg>
              </button>

              <button
                class="btn bg-white rounded-full cursor-not-allowed"
                disabled
              >
                <svg
                  class="w-6 h-6 text-blue-300 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                  />
                </svg>
              </button>

              <span> </span>
            </div>
          </div>

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
