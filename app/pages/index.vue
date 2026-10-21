<script setup lang="ts">
// /api/slow waits 3s before redirecting
const withNavigateTo = () => navigateTo('/api/slow', { external: true })
const withLocationHref = () => { location.href = '/api/slow' }
</script>

<template>
  <main style="padding: 2rem; font-family: sans-serif">
    <h1>Plain useHead()</h1>
    <p>
      <code>app/plugins/head-style.ts</code> adds a <code>&lt;style id="test-style"&gt;</code> with useHead.
      The box below should stay tomato-colored until the browser leaves the page.
    </p>

    <div class="head-style-box" style="padding: 2rem; margin: 1rem 0; border: 1px solid">
      Styled by #test-style
    </div>

    <button @click="withNavigateTo" class="cursor-pointer">
      CLICK to navigateTo('/api/slow', { external: true }) — bug: box loses its color for 3s
    </button>
    <br><br>
    <button @click="withLocationHref" class="cursor-pointer">
      CLICK to set location.href = '/api/slow' — control: box keeps its color
    </button>

    <p><NuxtLink to="/ui">Nuxt UI repro →</NuxtLink></p>
  </main>
</template>
