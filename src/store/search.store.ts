import { defineStore } from 'pinia'
import { FetchError } from 'ohmyfetch'
import { logger } from 'utils/logger'
import type { AllSearchResponse } from 'interfaces/search.interface'
import type { SongSearchResponse } from 'interfaces/song.interface'

export const useSearchStore = defineStore('search-store', {
  state: () => ({
    searchResults: {} as AllSearchResponse,
    searchedSongs: {} as SongSearchResponse,
  }),
  actions: {
    async searchAll(query: string) {
      try {
        const response = await this.$http.search.all(query)
        this.searchResults = response.data!
      } catch (error) {
        if (error instanceof FetchError) {
          logger.error(error.message)
        }
      }
    },

    async searchSongs(query: string) {
      try {
        const response = await this.$http.search.songs(query)
        this.searchedSongs = response.data!
      } catch (error) {
        if (error instanceof FetchError) {
          logger.error(error.message)
        }
      }
    },
  },
})
