import { useAuthStore } from "@/store/authStore"

export default defineNuxtPlugin(async (nuxtApp) => {
    if (process.client) {
        const authStore = useAuthStore();

        if(!authStore.isAuthenticated) {
            await authStore.authenticateUser();
        }
    }
})