import { useRoute, useRouter } from '#app';
import { defineStore } from 'pinia';

const authUrls = {
  notAllowed: '/Account/Login?error=NotAllowed',
  connectionError: '/Account/Login?error=ConnectionError',
  token: '/api/Authorization/TokenWithRefresh',
  login: '/Login'
};

interface AuthState {
  auth: {
    customer?: string; 
    adminType?: string;
    impersonate?: any;
    user?: string; 
    displayname?: string;
  };
  loading: boolean;
  error?: string;
  isAuthenticated: boolean;
}

interface LoginResponse {
  adminType?: string;
  username?: string;
  displayname?: string;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    loading: false,
    auth: {},
    isAuthenticated: false
  }),
  actions: {
    async authenticateUser() {
      const route = useRoute();
      const runtimeConfig = useRuntimeConfig();
      const storedToken = window.sessionStorage.getItem(runtimeConfig.public.sessionStorageKey);

      const code = route.query.code as string | undefined; 
      
      this.loading = true; 

      try {
        let token = null;

        if (storedToken === null) {
          token = code ?  await this.fetchToken(code, runtimeConfig.public.authSite) : storedToken ;
          if (!token) throw new Error("Token retrieval failed");  
        }
        else {
          token = storedToken
        }

        const result = await this.loginUser(token, runtimeConfig.public.vp2Backend);

        this.isAuthenticated = true;
        this.processLoginResponse(result);
      } catch (error: any) {
        this.handleError(error, runtimeConfig.public.authSite);
      } finally {
        this.loading = false; 
      }
    },
    logUserOut() {
      const runtimeConfig = useRuntimeConfig();
      window.sessionStorage.removeItem(runtimeConfig.public.sessionStorageKey);
      this.isAuthenticated = false;
      navigateTo(runtimeConfig.public.authSite, { external: true });
    },
    async fetchToken(code: string | undefined, authSite: string): Promise<string | undefined> {
      if (!code) return undefined;
      const runtimeConfig = useRuntimeConfig();

      const response = await fetch(`${authSite}${authUrls.token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });

      if (!response.ok) throw new Error("Failed to fetch token");
      const result = await response.json();

      if (result) {
        window.sessionStorage.setItem(runtimeConfig.public.sessionStorageKey, result.item1);
        window.sessionStorage.setItem(runtimeConfig.public.sessionStorageKeyRefresh, result.item2)
        return result.item1;
      }
      return;
    },
    async loginUser(token: string, apiSite: string) {
      return await useAuthFetch(`${apiSite}${authUrls.login}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
        body: JSON.stringify({ token })
      });
    },
    processLoginResponse(data: LoginResponse) {
      const router = useRouter()
      this.auth.adminType = data.adminType;
      this.auth.user = data.username;
      this.auth.displayname = data.displayname;

      const redirect = useRoute().query.redirect as string;
      if (redirect) {
        router.push(redirect);
      } else {
        const url = new URL(window.location.href)
        if (url.searchParams.has("code")) {
          url.searchParams.delete("code")
          window.history.replaceState({}, "", url)
          window.location.replace(url)
        }
      }
    },
    handleError(error: any, authSite: string) {
      console.error(error)
      if (error.message.includes("417")) {
        navigateTo(authSite.concat(authUrls.notAllowed), { external: true });
      } else if (error.status === 403) {
        navigateTo(authSite.concat(authUrls.connectionError), { external: true });
      } else {
        navigateTo(authSite, { external: true });
      }
    }
  },
  getters: {
    getAuthUser: (state) => state.auth,
    getUserName: (state) => state.auth.user,
    getAuthLoading: (state) => state.loading
  }
});
