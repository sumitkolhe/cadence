import { defineStore } from 'pinia'
import { FetchError } from 'ohmyfetch'
import { logger } from 'utils/logger'

export const usePlayerStore = defineStore('player', {
  state: () => ({
    currentPlaying: {},
  }),
  actions: {
    async setCurrentSong(song) {
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
