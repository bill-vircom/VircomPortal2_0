import { defineStore } from 'pinia'

interface customerState {
  proofPointCustomer: {
    customers: ProofpointCustomer[],
    loading: boolean,
    selectedCustomer?: string
  }
  customersList: {
    customers: Customer[],
    loading: boolean
  }
  alertsState: {
    alerts: Alert[]
    loading: boolean;
  }
}

const endPoints = {
    customerSelector: "/Customer/CustomerSelector",
    customer: "/Customer",
    alerts: "/Alerts"
};

export const useCustomerStore = defineStore('configs', {
  state: (): customerState => ({
    proofPointCustomer: {
      customers: [],
      loading: false
    },
    customersList: {
      customers: [],
      loading: false
    },
    alertsState: {
      loading: false,
      alerts: []
    }
  }),
  actions: {
    async fetchCustomer () {
        try {
          this.customersList.loading = true
          const runtimeConfig = useRuntimeConfig();
          const response = await useApi<Customer[]>(runtimeConfig.public.vp2Backend.concat(endPoints.customer))

          if (response.data.value) {
              this.customersList.customers = response.data.value
          }
          this.customersList.loading = false
        } catch {
          this.customersList.loading = false
        }
    },
    async fetchProofpointCustomers () {
      try {
        this.proofPointCustomer.loading = true
        const runtimeConfig = useRuntimeConfig();
        const token = window.sessionStorage.getItem(runtimeConfig.public.sessionStorageKey)
        const result = await $fetch<ProofpointCustomer[]>(runtimeConfig.public.vp2Backend.concat(endPoints.customerSelector), {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (result) {
            this.proofPointCustomer.customers = result
        }
      } catch(error) {
        console.log(error)
      } finally {
        this.proofPointCustomer.loading = false
      }
    },
    selectProofPointCustomer (value: string) {
      this.proofPointCustomer.selectedCustomer = value;
    },
    async fetchAlerts (paginate : { pPageNumber: number | undefined, pPageSize: number | undefined }) {
      try {
        this.alertsState.loading = true
        const runtimeConfig = useRuntimeConfig();
        const token = window.sessionStorage.getItem(runtimeConfig.public.sessionStorageKey)

        const url = new URL(runtimeConfig.public.vp2Backend.concat(endPoints.alerts))

        Object.keys(paginate).forEach((key) => {
          const typedKey = key as keyof typeof paginate
          if(typedKey && paginate[typedKey]) {
            url.searchParams.append(key, `${paginate[typedKey]}`)
          }
        })

        const result = await  $fetch<Alert[]>(runtimeConfig.public.vp2Backend.concat(endPoints.alerts), {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (result) {
            this.alertsState.alerts = result
        }
      } catch (error) {
        console.error(error)
      } finally {
        this.alertsState.loading = false
      }
    }
  },
  getters: {
    getSelectedCustomer: (state) => {
      const customers = state.proofPointCustomer.customers
      const loading = state.proofPointCustomer.loading
      return { customers, loading }
    },
    getAllAlertsTableData: (state) => {
      const alerts = state.alertsState.alerts.map(alert => {
        return {
          title: alert.alertTitle,
          customer: alert.userThatGeneratedAlert,
          parent: alert.source,
          severity: alert.severity,
          timestamp: alert.timeGenerated,
          status: 1,
          action: ""
        }
      })
      const loading = state.alertsState.loading
      return { alerts, loading }
    }
  },
})