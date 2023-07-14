import { defineStore } from 'pinia'
import { FetchError } from 'ofetch'
import { logger } from 'utils/logger'
import type { AllSearchResponse } from 'interfaces/search.interface'
import type { SongSearchResponse } from 'interfaces/song.interface'

interface State {
  searchResults: AllSearchResponse
  searchedSongs: SongSearchResponse
}

export const useSearchStore = defineStore('search-store', {
  state: (): State => ({
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
