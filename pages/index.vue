<template>
  <div class="w-screen h-full py-auto my-auto space-y-even">
    <div class="flex flex-row lg:my-16">
      <h1
        class="hidden md:flex lg:flex lg:my5 md:mx-auto mx-5 text-4xl font-bold text-white text-left"
      >
        {{ info.station.name }}
      </h1>
      <nuxt-picture
        format="webp"
        src="/Eden-logo.png"
        alt="Eden of the west logo"
        class="ml-10 h-10 mt-5 mb-14 md:hidden lg:hidden"
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
              <a
                class="btn bg-white rounded-full raise-animate hover:bg-white hover:drop-shadow-2xl"
                href="https://discord.gg/nzGx3St"
                target="_blank"
              >
                <svg
                  class="w-6 h-6 text-blue-600 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 127.14 96.36"
                >
                  <path
                    d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"
                  />
                </svg>
              </a>

              <a
                class="btn bg-white rounded-full raise-animate hover:bg-white hover:drop-shadow-2xl"
                href="https://twitter.com/edenofthewest"
                target="_blank"
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
              </a>

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
  "https://radio.edenofthewest.com/api/nowplaying/1",
  { pick: ["station", "now_playing", "song_history"] }
);

useHead({
  title: info.value.station.name,
  meta: [{ name: "description", content: info.value.station.description }],
  htmlAttrs: {
    lang: "en",
  },
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  link: [
    {
      rel: "canonical",
      href: "https://edenofthewest.com",
    },
  ],
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

.raise-animate:hover {
  transform: translateY(-5px);
}
</style>
