// A plain useHead() style registered from a plugin (no Nuxt UI involved).
export default defineNuxtPlugin(() => {
  useHead({
    style: [{ id: 'test-style', innerHTML: '.head-style-box { background: tomato; color: white }' }],
  })
})
