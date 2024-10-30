<script lang="ts" setup>
import { useAuthStore } from '@/store/authStore';
import { useI18n } from 'vue-i18n';
const { getAuthUser } = useAuthStore()
const {t} = useI18n({ useScope: "global" })

const profileData = computed(() => {
  const auth = {
    username: getAuthUser.displayname,
    email: getAuthUser.user,
    // status: "active",
    role: getAuthUser.adminType,
    // contact: "(829) 537-0057",
    // language: "English",
    // country: "Canada"
  }
  return auth
})
 
const items = ["10 Users", "Up to 10GB storage", "Basic Support"]

console.log(getAuthUser)
 
</script>
 
<template>
  <VRow>
    <VCol cols="12" sm="5" lg="4">
      <VCard elevation="0">
        <VCardItem class="d-flex justify-center">
          <VAvatar
            color="primary"
            rounded
            size="120"
          >
            <img
              v-if="true"
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="Avatar"
            >
            <span v-if="false" class="white--text text-h5 text-white">BS</span>
          </VAvatar>
        </VCardItem>
        <VCardText class="d-flex justify-center text-h5 font-weight-bold pb-0">
          {{ profileData.username }}
        </VCardText>
        <VCardItem class="d-flex justify-center text-h5 font-weight-bold">
          <VChip color="primary">{{ profileData.role }}</VChip>
        </VCardItem>
        <VCardText class="d-flex font-weight-medium">
          Details
        </VCardText>
        <VDivider class="ml-3 mr-3" />
        <VCardText>
          <v-list-item class="pl-0 pr-0" v-for="key of Object.keys(profileData)">
            <v-list-item-content class="d-flex">
              <span class="pl-0 pr-0 font-weight-medium text-h6">{{t(`userProfile_${key}`)}}:</span>
              <span class="pl-0 pr-0 ml-2">{{profileData[key]}}</span>
            </v-list-item-content>
          </v-list-item>
        </VCardText>
        <VCardItem>
          <div class="w-100 d-flex flex-column ga-2">
            <VBtn  color="primary">
              {{ $t("button_edit") }}
            </VBtn>
            <VBtn  color="secondary" variant="outlined">
              {{ $t("button_suspend") }}
            </VBtn>
          </div>
        </VCardItem>
      </VCard>
      <VCard class="mt-5 elevation-0 border border-primary border-md">
        <VCardItem>
          <div class="d-flex justify-space-between align-start">
            <VChip color="primary">{{ $t("standard") }}</VChip>
            <div>
              <sub class="inline-block text-primary">
                $
              </sub>
              <span class="inline-block text-primary text-h1">
                {{ 99 }}
              </span>
              <span>
                {{ $t("month") }}
              </span>
            </div>
          </div>
        </VCardItem>
        <VCardText class="pb-0">
          <VList :items="items" class="pl-0"/>
        </VCardText>
        <VCardItem>
          <div class="w-100 d-flex justify-space-between mb-1">
            <span class="inline-block text-h5">{{ $t("days") }}</span>
            <span class="inline-block">{{ $t("26 of 30 Days") }}</span>
          </div>
          <VProgressLinear :model-value="(26/30)*100" />
          <div class="mt-2">
            <span class="inline-block">4 {{ $t("days_remaining") }}</span>
          </div>
        </VCardItem>
 
        <VCardItem class="pt-0">
          <VBtn block>
            {{ $t("button_upgrade_plan") }}
          </VBtn>
        </VCardItem>
      </VCard>
    </VCol>
    <VCol cols="12" sm="7" lg="8">
      <VCard elevation="0">
        <VTabs show-arrows>
            <VTab
                v-for="i in 10"
                :key="i"
                :value="i"
            >
                Item {{ i }}
            </VTab>
        </VTabs>
      </VCard>
    </VCol>
  </VRow>
</template>