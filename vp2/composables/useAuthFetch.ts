import { defu } from 'defu'
import type { FetchOptions } from 'ohmyfetch'


let refreshTokenPromise: Promise<void> | null = null

export async function useAuthFetch<T>(url: string, options: FetchOptions<T> = {}): Promise<T> {
  const config = useRuntimeConfig()
  let accessToken = window.sessionStorage.getItem(config.public.sessionStorageKey) || ""
  const refreshToken = window.sessionStorage.getItem(config.public.sessionStorageKeyRefresh) || ""

  const defaults: FetchOptions<T> = {
    key: url,
    server: false,
    retry: 1,
    retryStatusCodes: [401],

    onRequest({ options }) {
      options.headers = accessToken ? { Authorization: 'Bearer ' + accessToken }
     : {}
    },

    async onResponseError({ response }) {
      if (response.status === 401) {
        if (!refreshTokenPromise) {          
          refreshTokenPromise = $fetch(config.public.authSite + '/api/authorization/ExchangeRefresh', {
            method: 'POST',
            body: '"' + refreshToken + '"'
          }).then((data: any) => {
            window.sessionStorage.setItem(config.public.sessionStorageKey, data);
            accessToken = data
            options.headers = accessToken ? { Authorization: 'Bearer ' + accessToken } : {}
            refreshTokenPromise = null
          }).catch(() => {
            refreshTokenPromise = null
          })
        }

        await refreshTokenPromise

      }
    }  
  }  
  
  // for nice deep defaults, please use unjs/defu
  const params = defu(options, defaults)

  return $fetch<T>(url, params)
}
