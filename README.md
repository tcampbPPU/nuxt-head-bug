# navigateTo external removes useHead tags before the page unloads

Minimal reproduction: on the client, `navigateTo(url, { external: true })` calls `nuxtApp._scope.stop()` before setting `location.href`.
That disposes every `useHead` entry created in the app scope, so Unhead removes those tags from the DOM immediately.
The current page stays visible until the target responds, so it renders without those styles in the meantime.

Versions: nuxt 4.6.2, @nuxt/ui 4.12.0, @unhead/vue 3.4.3, vue 3.5.44.

## Run

```bash
pnpm install
pnpm dev
```

`server/api/slow.get.ts` waits 3s before redirecting to https://nuxt.com, simulating an OAuth/SSO provider.

- **`/`** - plain `useHead` style from `app/plugins/head-style.ts` (no Nuxt UI). Click the `navigateTo` button: the tomato box loses its color for ~3s. The `location.href` button keeps it.
- **`/ui`** - Nuxt UI. Its `<style id="nuxt-ui-colors">` (also added via `useHead`) is removed, so `--ui-primary` is unset and the primary button loses its color for ~3s.

## Observed (Chrome, state logged by the page itself during the pending redirect)

| Trigger | `#nuxt-ui-colors` | `#test-style` | `--ui-primary` |
| --- | --- | --- | --- |
| before click | present | present | `oklch(60.6% 0.25 292.717)` |
| `navigateTo('/api/slow', { external: true })`, +0.5s | **removed** | **removed** | **unset** |
| `location.href = '/api/slow'`, +0.5s | present | present | `oklch(60.6% 0.25 292.717)` |
