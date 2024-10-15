import { defineStore } from 'pinia';
import { useRoute, useRouter } from '#app';

const authUrls = {
  notAllowed: '/Account/Login?error=NotAllowed',
  connectionError: '/Account/Login?error=ConnectionError',
  token: '/api/Authorization/Token',
  login: '/Login/JWT'
};

interface AuthState {
  auth: {
    customer?: string; 
    adminType?: string;
    impersonate?: any;
    user?: string; 
  };
  loading: boolean;
  error?: string;
  isAuthenticated: boolean;
}

interface LoginResponse {
  AdminType?: string;
  LastAlertChecked?: string;
  LastSeenNewsId?: string;
  MSALClientId?: string;
  MSALO365ClientId?: string;
  O365Token?: string;
  ProblemEndpoints?: string;
  Username?: string;
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
        const token = code ?  await this.fetchToken(code, runtimeConfig.public.authSite) : storedToken ;
        if (!token) throw new Error("Token retrieval failed");

        const result = await this.loginUser(token, runtimeConfig.public.apiSite);

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

      const result = await response.text();

      if (result) {
        window.sessionStorage.setItem(runtimeConfig.public.sessionStorageKey, result);
        return result;
      }
      return undefined;
    },
    async loginUser(token: string, apiSite: string) {
      const response = await fetch(`${apiSite}${authUrls.login}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });

      if (!response.ok) throw new Error("Login failed");

      const result = await response.json();

      return result;
    },
    processLoginResponse(data: LoginResponse) {
      const router = useRouter()
      this.auth.adminType = data.AdminType;
      this.auth.user = data.Username;

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
        // navigateTo(authSite.concat(authUrls.notAllowed), { external: true });
      } else {
        // navigateTo(authSite.concat(authUrls.connectionError), { external: true });
      }
    }
  },
  getters: {
    getAuthUser: (state) => state.auth,
    getUserName: (state) => state.auth.user,
    getAuthLoading: (state) => state.loading
  }
});
