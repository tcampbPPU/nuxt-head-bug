<script setup lang="ts">
// Nuxt UI injects its color variables via useHead (<style id="nuxt-ui-colors">).
const withNavigateTo = () => navigateTo('/api/slow', { external: true })
const withLocationHref = () => { location.href = '/api/slow' }
</script>

<template>
  <UContainer class="py-10 space-y-6">
    <h1 class="text-2xl font-bold">
      Nuxt UI colors
    </h1>
    <p class="text-muted">
      The buttons use <code>--ui-primary</code> from <code>&lt;style id="nuxt-ui-colors"&gt;</code>.
      After clicking the first button they turn colorless/outlined for ~3s while the redirect is pending.
    </p>

    <UCard>
      <div class="flex flex-col gap-3">
        <UButton block @click="withNavigateTo" class="cursor-pointer">
          navigateTo('/api/slow', { external: true }) — bug
        </UButton>
        <UButton block color="neutral" @click="withLocationHref" class="cursor-pointer">
          location.href = '/api/slow' — control
        </UButton>
      </div>
    </UCard>

    <ULink to="/">
      ← Plain useHead repro
    </ULink>
  </UContainer>
</template>
