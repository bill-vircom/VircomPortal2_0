<script lang="ts" setup>
import AlertsTable from '@/components/AlertsTable.vue';
const { t } = useI18n({ useScope: "global" })

const listItems = ref([
  { value: 2, icon: "ri-prohibited-fill" },
  { value: 4, icon: "ri-shield-fill" },
  { value: 5, icon: "ri-mail-fill" },
  { value: 0, icon: "ri-group-fill" },
  { value: 0, icon: "ri-money-dollar-circle-fill" },
])
</script>

<template>
  <div class="mb-6">
    <VCardTitle>{{ t("alerts_categories") }}</VCardTitle>
    <VRow>
      <VCol v-for="item in listItems">
        <VCard>
          <VCardText class="text-h1 font-weight-medium">{{  item.value }}</VCardText>
          <VCardItem>
            <VIcon :icon="item.icon" size="x-large" />
          </VCardItem>
        </VCard>
      </VCol>
    </VRow>
  </div>
  <div>
    <AlertsTable />
  </div>
</template>
