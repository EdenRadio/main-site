<template>
  <div class="hero min-h-screen">
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="hero-content text-center text-white text-neutral-content">
      <div class="max-w-md">
        <h1 class="mb-5 text-5xl font-bold">{{ info.station.name }}</h1>
        <img
          class="min-w-full mb-5"
          :src="info.now_playing.song.art"
          alt=""
          srcset=""
        />
        <p class="mb-2 font-bold">
          {{ info.now_playing.song.artist }}
        </p>
        <p>{{ info.now_playing.song.title }}</p>
        <progress
          class="progress progress-info"
          :value="info.now_playing.elapsed"
          :max="info.now_playing.duration"
        ></progress>
        <div class="flex justify-between">
          {{ info.now_playing.elapsed }} {{ info.now_playing.duration }}
        </div>
        <div class="space-x-5">
          <button class="btn btn-circle btn-outline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <audio id="stream">
            <source :src="info.station.listen_url" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <button
            v-if="playing === false"
            class="btn btn-circle btn-outline btn-warning"
            @click="playAudio()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <button
            v-else
            class="btn btn-circle btn-outline btn-secondary"
            @click="pauseAudio()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <button class="btn btn-circle btn-outline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const { data: info, refresh } = await useFetch(
  "https://edenofthewest.com/api/nowplaying/1",
  {
    pick: ["station", "now_playing"],
  }
);

let np = info.value.now_playing;
let st = info.value.station;

// console.log(np);

//ANCHOR Playing the audio
let playing = ref(false);

const playAudio = () => {
  let x = document.getElementById("stream");
  x.play();
  playing.value = true;
};
const pauseAudio = () => {
  let x = document.getElementById("stream");
  x.pause();
  playing.value = false;
};

//ANCHOR Increment time

// get duration
const increment = () => {
  np.elapsed++;
  if (np.elapsed >= np.duration) {
    refresh();
  }
  // add +1 to elasped

  // when elasped >= duration

  //refresh
};

let interval = setInterval(increment, 1000);
</script>

<style>
.hero {
  background-image: url(day-sky.jpg);
  background-size: auto;
}
</style>
