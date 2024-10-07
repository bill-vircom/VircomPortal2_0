export default defineNuxtRouteMiddleware(() => {

  if (process.client) {
    const runtimeConfig = useRuntimeConfig();
    const apiKey: string = runtimeConfig.public.sessionStorageKey;
    const jwt = sessionStorage.getItem(apiKey)
  
    if(!jwt) {
      // Todo: Redirect to vim when the session storage not found
      // return navigateTo('https://www.google.com', { external: true });
    }
  }
})
