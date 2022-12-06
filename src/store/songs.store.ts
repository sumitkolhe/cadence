import { defineStore } from 'pinia'
import { FetchError } from 'ohmyfetch'
import { logger } from 'utils/logger'
import type { SongResponse } from 'interfaces/song.interface'

export const useSongsStore = defineStore('songs-store', {
  state: () => ({
    songDetails: {} as SongResponse,
  }),
  actions: {
    async fetchSongDetailsById(id: string) {
      try {
        const response = await this.$http.songs.detailsById(id)
        this.songDetails = response?.data[0] || []
      } catch (error) {
        if (error instanceof FetchError) {
          logger.error(error.message)
        }
      }
    },
  },
})
