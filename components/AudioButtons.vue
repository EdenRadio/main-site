<template>
  <div>
    <div class="flex my-auto lg:hidden">
      <!-- ANCHOR Playlist Button -->
      <a :href="station.playlist_pls_url">
        <button
          class="btn btn-ghost font-light px-0 mr-3 text-white normal-case flex-col hover:bg-transparent lg:hidden"
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

      <!-- ANCHOR History button -->
      <!-- The button to open modal -->
      <label
        for="my-modal-6"
        class="btn btn-ghost font-light normal-case flex-col px-0 hover:bg-transparent text-right"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6"
        >
          <path
            d="M5.625 3.75a2.625 2.625 0 100 5.25h12.75a2.625 2.625 0 000-5.25H5.625zM3.75 11.25a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75zM3 15.75a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75zM3.75 18.75a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75z"
          />
        </svg>
        History
      </label>

      <!-- Put this part before </body> tag -->
      <input type="checkbox" id="my-modal-6" class="modal-toggle" />
      <div class="modal modal-bottom sm:modal-middle backdrop-blur-sm">
        <div class="modal-box glass">
          <h3 class="font-bold text-lg">Song History</h3>
          <History :song_history="song_history" />
          <div class="modal-action">
            <label for="my-modal-6" class="btn btn-ghost mx-auto mt-0"
              >close</label
            >
          </div>
        </div>
      </div>

      <!--  -->
    </div>
    <div class="flex grow">
      <!-- ANCHOR Audio -->
      <audio id="stream">
        <source :src="station.listen_url" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <!-- ANCHOR Play button -->
      <div
        class="grow my-auto lg:flex lg:flex-row lg:space-x-5 lg:mb-5 lg:justify-end lg:mr-5"
      >
        <!-- ANCHOR History button -->
        <!-- The button to open modal -->
        <label
          for="my-modal-7"
          class="btn btn-ghost font-light normal-case flex-col px-0 hover:bg-transparent text-right hidden lg:flex"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              d="M5.625 3.75a2.625 2.625 0 100 5.25h12.75a2.625 2.625 0 000-5.25H5.625zM3.75 11.25a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75zM3 15.75a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75zM3.75 18.75a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75z"
            />
          </svg>
          History
        </label>

        <transition name="fade" mode="out-in">
          <button
            v-if="playing === false"
            @click="playAudio"
            class="btn btn-ghost hover:bg-transparent px-0"
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
          <button
            v-else
            class="text-secondary btn btn-ghost hover:bg-transparent px-0"
            @click="playAudio"
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
                d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </transition>

        <div class="hidden lg:flex">
          <transition name="fade" mode="out-in">
            <button
              v-if="muted === false"
              @click="muteAudio"
              class="btn btn-ghost hover:bg-transparent px-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.0"
                stroke="currentColor"
                class="w-10 h-10"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                />
              </svg>
            </button>

            <button
              v-else
              @click="muteAudio"
              class="text-secondary btn btn-ghost hover:bg-transparent px-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.0"
                stroke="currentColor"
                class="w-10 h-10"
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
      </div>

      <!-- Put this part before </body> tag -->
      <input type="checkbox" id="my-modal-7" class="modal-toggle" />
      <div class="modal modal-bottom sm:modal-middle backdrop-blur-sm lg:m-0">
        <div class="modal-box glass">
          <h3 class="font-bold text-lg">Song History</h3>
          <History :song_history="song_history" />
          <div class="modal-action">
            <label for="my-modal-7" class="btn btn-ghost mx-auto mt-0"
              >close</label
            >
          </div>
        </div>
      </div>

      <!--  -->
      <!-- ANCHOR Volume slider -->
      <div class="">
        <input
          id="stream-vol"
          type="range"
          min="0"
          max="100"
          value="40"
          class="range range-info range-xs hidden lg:flex my-4 w-full"
          @click="setVolume"
        />
      </div>
    </div>
    <div class="flex w-1/4 lg:hidden">
      <!-- ANCHOR Mute button -->
      <span class="ml-auto my-auto lg:hidden">
        <transition name="fade" mode="out-in">
          <button
            v-if="muted === false"
            @click="muteAudio"
            class="btn btn-ghost hover:bg-transparent px-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.0"
              stroke="currentColor"
              class="w-10 h-10"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
              />
            </svg>
          </button>

          <button
            v-else
            @click="muteAudio"
            class="text-secondary btn btn-ghost hover:bg-transparent px-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.0"
              stroke="currentColor"
              class="w-10 h-10"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
              />
            </svg>
          </button> </transition
      ></span>
    </div>
  </div>
</template>
<script setup>
const props = defineProps(["station", "song_history"]);

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
</script>
<style lang=""></style>
