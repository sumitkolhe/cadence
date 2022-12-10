import { defineStore } from 'pinia'
import { logger } from 'utils/logger'
import type { SongResponse } from 'interfaces/song.interface'

export const SongQuality = {
  extreme: '320kbps',
  best: '160kbps',
  good: '96kbps',
  fair: '48kbps',
  low: '12kbps',
}

export const usePlayerStore = defineStore('player-store', {
  state: () => ({
    currentPlaying: {} as SongResponse | null,
    currentQuality: SongQuality.extreme,
  }),

  actions: {
    async setCurrentSong(song: SongResponse) {
      try {
        this.currentPlaying = null
        this.currentPlaying = song
      } catch (error) {
        if (error instanceof Error) {
          logger.error(error.message)
        }
      }
    },

    async setCurrentQuality(quality: string) {
      try {
        this.currentQuality = quality
      } catch (error) {
        if (error instanceof Error) {
          logger.error(error.message)
        }
      }
    },
  },

  persist: true,
})
