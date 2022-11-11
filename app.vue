<template>
  <div class="hero min-h-screen">
    <div class="hero-overlay bg-opacity-0">
      <div class="flex flex-row">
        <h1
          class="hidden md:flex lg:flex my-16 mx-5 text-3xl font-bold text-white text-left"
        >
          {{ info.station.name }}
        </h1>
        <img src="/Eden-logo.png" alt="" class="ml-10 h-10 my-14" />
      </div>
    </div>
    <div class="hero-content text-center text-white">
      <div class="max-w-ls flex flex-col md:flex-row lg:flex-row">
        <transition name="fade" mode="out-in" appear>
          <img
            class="w-80 my-auto rounded mt-28"
            :src="info.now_playing.song.art"
            :alt="info.now_playing.song.artist + ' album art'"
            srcset=""
          />
        </transition>
        <p class="mt-5 mb-2 font-bold">
          {{ info.now_playing.song.artist }}
        </p>
        <p>{{ info.now_playing.song.title }}</p>

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
        <div class="space-x-20 mb-5">
          <!-- ANCHOR Playlist Button -->
          <a :href="info.station.playlist_pls_url">
            <button class="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.0"
                stroke="currentColor"
                class="w-10 h-10 mx-auto"
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
          <!-- ANCHOR Audio -->
          <audio id="stream">
            <source :src="info.station.listen_url" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>

          <!-- ANCHOR Play button -->
          <transition name="fade" mode="out-in">
            <button
              v-if="playing === false"
              @click="playAudio"
              class="ease duration-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.0"
                stroke="currentColor"
                class="w-16 h-16"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                />
              </svg>
            </button>

            <!-- ANCHOR Pause button -->
            <button v-else class="text-secondary" @click="playAudio">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.0"
                stroke="currentColor"
                class="w-16 h-16"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </transition>

          <!-- ANCHOR Mute button -->
          <transition name="fade" mode="out-in">
            <button v-if="muted === false" @click="muteAudio">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.0"
                stroke="currentColor"
                class="w-14 h-14"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
                />
              </svg>
            </button>

            <button v-else @click="muteAudio" class="text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.0"
                stroke="currentColor"
                class="w-14 h-14"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
                />
              </svg>
            </button>
          </transition>
        </div>
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
</template>
<script setup>
const { data: info, refresh } = await useFetch(
  "https://edenofthewest.com/api/nowplaying/1",
  {
    pick: ["station", "now_playing", "song_history"],
  }
);

let np = info.value.now_playing;
let st = info.value.station;

// console.log(np);
// SECTION Audio
//ANCHOR Play or pause the audio
let playing = ref(false);

const playAudio = () => {
  let x = document.getElementById("stream");

  switch (playing.value) {
    case false:
      x.play();
      playing.value = true;
      break;

    case true:
      x.pause();
      playing.value = false;
      break;
  }
};

// ANCHOR Mute and unmute audio
let muted = ref(false);
const muteAudio = () => {
  let x = document.getElementById("stream");

  switch (muted.value) {
    case false:
      x.muted = true;
      muted.value = true;
      break;

    case true:
      x.muted = false;
      muted.value = false;
      break;
  }
};

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
.hero {
  background-image: url(day-sky.jpg);
  background-size: auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
