import { defineStore } from 'pinia'
import { FetchError } from 'ohmyfetch'
import { logger } from 'utils/logger'
import type { ModulesResponse } from 'interfaces/modules.interface'

export const useModulesStore = defineStore('modules-store', {
  state: () => ({
    modules: {} as ModulesResponse,
  }),
  actions: {
    async fetchModules() {
      try {
        const response = await this.$http.modules.modules()

        if (response.status === 'SUCCESS') this.modules = response.data!
      } catch (error) {
        if (error instanceof FetchError) {
          logger.error(error.message)
        }
      }
    },
  },
  getters: {},
})
