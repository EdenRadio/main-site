<template>
  <main
    class="min-h-screen bg-cover bg-top sm:bg-top"
    style="background-image: url('day-sky.jpg'); background-size: auto"
  >
    <div
      class="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48"
    >
      <p class="text-base font-semibold text-black text-opacity-50">404</p>
      <h1 class="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Uh oh! I think you’re lost.
      </h1>
      <p class="mt-2 text-lg font-medium text-black text-opacity-50">
        It looks like the page you’re looking for doesn't exist.
      </p>
      <div class="mt-6">
        <NuxtLink
          to="/"
          class="inline-flex items-center rounded-md border border-transparent bg-white bg-opacity-75 px-4 py-2 text-sm font-medium text-black text-opacity-75 sm:bg-opacity-25 sm:hover:bg-opacity-50"
          >Go back home</NuxtLink
        >
      </div>
    </div>
  </main>
</template>
