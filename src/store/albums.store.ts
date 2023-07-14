import { defineStore } from 'pinia'
import { FetchError } from 'ofetch'
import { logger } from 'utils/logger'
import type { AlbumResponse } from 'interfaces/album.interface'

export const useAlbumsStore = defineStore('albums-store', {
  state: () => ({
    albumDetails: {} as AlbumResponse,
  }),
  actions: {
    async fetchAlbumDetailsById(id: string) {
      try {
        const response = await this.$http.albums.detailsById(id)
        this.albumDetails = response?.data
      } catch (error) {
        if (error instanceof FetchError) {
          logger.error(error.message)
        }
      }
    },
  },
})
