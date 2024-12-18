import { defineStore } from 'pinia'

interface customerState {
  proofPointCustomer: {
    customers: ProofpointCustomer[],
    loading: boolean,
    flatenCustomerList: CustomerSelectorAsset[]
    selectedCustomer?: string
  }
  customersList: {
    customers: Customer[],
    loading: boolean
  }
  alertsState: {
    alerts: Alert[]
    loading: boolean;
    count: number;
  }
}

const endPoints = {
    customerSelector: "/Customer/CustomerSelector",
    customer: "/Customer",
    alerts: "/Alerts",
    alertsCount: "/Alerts/Count"
};

export const useCustomerStore = defineStore('configs', {
  state: (): customerState => ({
    proofPointCustomer: {
      customers: [],
      loading: false,
      flatenCustomerList: []
    },
    customersList: {
      customers: [],
      loading: false
    },
    alertsState: {
      loading: false,
      alerts: [],
      count: 0
    }
  }),
  actions: {
    async fetchCustomer () {
        try {
          this.customersList.loading = true
          const runtimeConfig = useRuntimeConfig();
          const response = await useAuthFetch<Customer[]>(runtimeConfig.public.vp2Backend.concat(endPoints.customer))
          console.log(response)

          if (response) {
              this.customersList.customers = response
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
        const result = await useAuthFetch<ProofpointCustomer[]>(runtimeConfig.public.vp2Backend.concat(endPoints.customerSelector))

        if (result) {
            this.proofPointCustomer.customers = result
            this.proofPointCustomer.flatenCustomerList = this.flattenCustomerList(result) 
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
    clearSelectedProofPointCustomer() {
      this.proofPointCustomer.selectedCustomer = undefined
    },
    async fetchAlertsCount(uniqueSourceId?: string) {
      try {
        const runtimeConfig = useRuntimeConfig();

        const url = new URL(runtimeConfig.public.vp2Backend.concat(endPoints.alertsCount, uniqueSourceId ? `/${uniqueSourceId}` : ''))

        const result = await useAuthFetch<number>(url.href, {
          method: uniqueSourceId ? "POST" : "GET",
        })

        if (result) {
          this.alertsState.count = result
        }
      } catch (error) {
        console.error(error)
      }      
    },
    async fetchAlerts (paginate : { 
      pPageNumber?: number,
      pPageSize?: number,
      uniqueSourceId?: string
    }) {
      try {
        this.alertsState.loading = true
        const runtimeConfig = useRuntimeConfig();
        const url = new URL(runtimeConfig.public.vp2Backend.concat(endPoints.alerts, paginate.uniqueSourceId ? `/${paginate.uniqueSourceId}` : ''))

        Object.keys(paginate).forEach((key) => {
          const typedKey = key as keyof typeof paginate
          if(typedKey && paginate[typedKey]) {
            url.searchParams.append(key, `${paginate[typedKey]}`)
          }
        })

        const result = await useAuthFetch<Alert[]>(url.href, {
          method: "POST",
          // body: JSON.stringify(data)
        })

        if (result) {
            this.alertsState.alerts = result
        }
      } catch (error) {
        console.error(error)
      } finally {
        this.alertsState.loading = false
      }
    },
    flattenCustomerList(customers: ProofpointCustomer[]): CustomerSelectorAsset[] {
      function flatten(customer: ProofpointCustomer): CustomerSelectorAsset[] {
          const current: CustomerSelectorAsset[] = [{
            parentDomain: customer.parentDomain,
            primaryDomain: customer.primaryDomain,
            customer: customer.customer, 
            value: customer.uniqueSourceId,  
          }];
          const children = customer.children.length > 0
              ? customer.children.flatMap(flatten)
              : [];
  
          return current.concat(children);
      }
      return customers.flatMap(flatten);
  }
  
  },
  getters: {
    getSelectedCustomer: (state) => state.proofPointCustomer.selectedCustomer,
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
    },
    getCustomerSelectorList: (state) => state.proofPointCustomer.flatenCustomerList,
    findCustomer: 
      (state) => 
        (uniqueSourceId: string) => 
          state.proofPointCustomer
            .flatenCustomerList
            .find(customer => customer.value === uniqueSourceId)
  },
})
