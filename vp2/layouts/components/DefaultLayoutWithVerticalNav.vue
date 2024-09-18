<script lang="ts" setup>
import { useConfigStore } from '@core/stores/config'
import { themeConfig } from '@themeConfig'
import oldNavItems from '@/navigation/horizontal'

// Components
import Footer from '@/layouts/components/Footer.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'
import NavBarI18n from '@core/components/I18n.vue'

// @layouts plugin
import { VerticalNavLayout } from '@layouts'
import { useContentStore } from '@/store/contentStore'

const configStore = useConfigStore()
const { navItems } = useContentStore()


navItems.forEach((item) => {
  if (item.title == "index") item.title = "Home"
  if (item.title == "second_page") item.title = "Second page"
})

// ℹ️ Provide animation name for vertical nav collapse icon.
const verticalNavHeaderActionAnimationName = ref<null | 'rotate-back-180' | 'rotate-180'>(null)

// const selectedItem = ref('')
const items = ['Programming', 'Design', 'Vue', 'Vuetify']

watch([
  () => configStore.isVerticalNavCollapsed,
  () => configStore.isAppRTL,
], val => {
  if (configStore.isAppRTL)
    verticalNavHeaderActionAnimationName.value = val[0] ? 'rotate-back-180' : 'rotate-180'
  else
    verticalNavHeaderActionAnimationName.value = val[0] ? 'rotate-180' : 'rotate-back-180'
}, { immediate: true })
</script>

<template>
  <VerticalNavLayout :nav-items="navItems">
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <IconBtn
          id="vertical-nav-toggle-btn"
          class="ms-n2 d-lg-none"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon icon="ri-menu-line" />
        </IconBtn>

        <div class="d-none d-sm-flex w-50 ">
          <VBtn color="primary" class="mr-8">
            {{ $t("button_all_customers") }}
          </VBtn>

          <VAutocomplete
            prepend-inner-icon="ri-search-line"
            :items="items"
            :placeholder="$t('placeholder_search')"
            density="compact"
            clearable
            class="mr-2"
          />

          <VBtn
            icon="ri-user-add-line"
            color="secondary"
            rounded="sm"
          />
        </div>

        <VSpacer />

        <div class="d-flex gap-2">
            <NavBarI18n
            v-if="themeConfig.app.i18n.enable && themeConfig.app.i18n.langConfig?.length"
            :languages="themeConfig.app.i18n.langConfig"
          />
          <UserProfile />
        </div>
      </div>
    </template>

    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>

    <!-- 👉 Customizer -->
    <AppSwitcher />
  </VerticalNavLayout>
</template>

<style lang="scss">
@keyframes rotate-180 {
  from { transform: rotate(0deg); }
  to { transform: rotate(180deg); }
}

@keyframes rotate-back-180 {
  from { transform: rotate(180deg); }
  to { transform: rotate(0deg); }
}

.layout-vertical-nav {
  .nav-header {
    .header-action {
      animation-duration: 0.35s;
      animation-fill-mode: forwards;
      animation-name: v-bind(verticalNavHeaderActionAnimationName);
      transform: rotate(0deg);
    }
  }
}
</style>
