<script lang="ts" setup>
import { useCustomerStore } from '@/store/customerStore';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const search = ref("");
const customerStore = useCustomerStore();
const { t, locale } = useI18n({ useScope: 'global' });

const currentPage = ref(1);
const itemsPerPage = ref(10);


const headers = computed(() => [
  { title: t('alertTableTilte_title'), key: 'title' },
  { title: t('alertTableTitle_customer'), key: 'customer' },
  { title: t('alertTableTitle_parent'), key: 'parent' },
  { title: t("alertTableTitle_severity"), key: 'severity' },
  { title: t("alertTableTitle_timestamp"), key: 'timestamp' },
  { title: t("alertTableTitle_status"), key: 'status' },
  { title: "", key: 'actions' },
]);

const fetchAlerts = () => {
  customerStore.fetchAlerts({ pPageNumber: currentPage.value, pPageSize: itemsPerPage.value });
};

onBeforeMount(() => {
  fetchAlerts()
})

const { alertsState } = storeToRefs(customerStore)

const alerts = ref([] as Alert[])
const loading = ref(false)

watch(alertsState, (value) => {
  if (value.alerts)
    alerts.value = value.alerts
  
  loading.value = value.loading
}, { deep: true })

const totalItems = computed(() => alertsState.value.alerts.length || 0);
</script>

<template>
  <VCard elevation="0">
    <VCardTitle>
      {{ t("alertPage_mailFlowAlert") }}
    </VCardTitle>

    <VCardText>
      {{ t("alertPage_description") }}
    </VCardText>

    <VCardText>
      <VRow justify="space-between">
        <VCol cols="8" md="4">
          <VTextField
            v-model="search"
            :label="t('search')"
            :placeholder="t('placeholder_search')"
            append-inner-icon="ri-search-line"
            single-line
            hide-details
            dense
            outlined
          />
        </VCol>
        <VCol cols="4" md="2" class="d-flex justify-end align-center">
          <IconBtn size="small"><VIcon icon="ri-filter-2-line" /></IconBtn>
          <IconBtn size="small"><VIcon icon="ri-printer-line" /></IconBtn>
          <IconBtn size="small"><VIcon icon="ri-download-2-line" /></IconBtn>
        </VCol>
      </VRow>
    </VCardText>

    <VCardText>
      <VDataTableServer
        :items-length="totalItems"
        :items="alerts"
        :headers="headers"
        :items-per-page="itemsPerPage"
        :loading="loading"
        :search="search"
        @update:page="currentPage = $event; fetchAlerts()"
        @update:items-per-page="itemsPerPage = $event; fetchAlerts()"
      >
        <template #item.title="{ item }">
          {{ item.alertTitle }}
        </template>

        <template #item.customer="{ item }">
          <VChip v-if="item.userThatGeneratedAlert" class="font-weight-medium" size="small">{{ item.userThatGeneratedAlert }}</VChip>
        </template>

        <template #item.parent="{ item }">
          <VChip class="font-weight-medium" size="small">{{ item.source }}</VChip>
        </template>

        <template #item.severity="{ item }">
          <VChip class="font-weight-medium" size="small">{{ item.severity }}</VChip>
        </template>

        <template #item.timestamp="{ item }">
          <VChip class="font-weight-medium" size="small">
            {{ Intl.DateTimeFormat(locale, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
              }).format(new Date(item.timeGenerated)) }}
          </VChip>
        </template>

        <template #item.status="{ item }">
          <VChip
            class="font-weight-medium"
            size="small"
          >
            {{ item.reported }}
          </VChip>
        </template>

        <template #item.actions="{ item }">
          <div class="d-flex gap-1">
            <IconBtn size="small"><VIcon icon="ri-more-line" /></IconBtn>
          </div>
        </template>
      </VDataTableServer>
    </VCardText>
  </VCard>
</template>
