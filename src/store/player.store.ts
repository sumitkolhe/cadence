import { defineStore } from 'pinia'
import { FetchError } from 'ohmyfetch'
import { logger } from 'utils/logger'
import type { SongResponse } from 'interfaces/song.interface'

export const usePlayerStore = defineStore('player', {
  state: () => ({
    currentPlaying: {} as SongResponse,
  }),
  actions: {
    async setCurrentSong(song: SongResponse) {
      try {
        this.currentPlaying = song
      } catch (error) {
        if (error instanceof FetchError) {
          logger.error(error.message)
        }
      }
    },
  },
  getters: {},
})
