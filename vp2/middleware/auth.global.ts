export default defineNuxtRouteMiddleware(() => {
  if (process.client) {
    const runtimeConfig = useRuntimeConfig();
    const jwt = sessionStorage.getItem(runtimeConfig.public.sessionStorageKey)
  
    if(!jwt) {
      return navigateTo(runtimeConfig.public.authSite, { external: true });
    }
  }
})
