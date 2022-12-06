import { defineStore } from 'pinia'
import { FetchError } from 'ohmyfetch'
import { logger } from 'utils/logger'

export const useSearchStore = defineStore('links', {
  state: () => ({
    searchedSongs: [],
  }),
  actions: {
    async searchSongs(query: string) {
      try {
        console.log(query)
        const response = await this.$http.search.songs(query)

        this.searchedSongs = response.data.results
      } catch (error) {
        if (error instanceof FetchError) {
          logger.error(error.message)
        }
      }
    },
  },
  getters: {},
})
