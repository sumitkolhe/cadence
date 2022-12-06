import type { SongResponse } from './song.interface'
import type { DownloadLink } from './image.interface'
import type { AlbumResponse } from './album.interface'

export interface ModulesResponse {
  albums: AlbumResponse[]
  charts: {
    id: string
    title: string
    subtitle: string
    type: string
    image: DownloadLink
    url: string
    firstname: string
    explicitContent: string
    language: string
  }[]
  trending: {
    songs: Omit<
      SongResponse,
      'primaryArtistsId' | 'featuredArtistsId' | 'hasLyrics' | 'copyright' | 'downloadUrl'
    >[]
    albums: Omit<AlbumResponse, 'songs' | 'primaryArtistsId'>[]
  }
  playlists: {
    id: string
    title: string
    subtitle: string
    type: string
    image: DownloadLink
    url: string
    songCount: string
    firstname: string
    followerCount: string
    lastUpdated: string
    userId: string
    explicitContent: string
  }[]
  // radio: {}
  // discover: {}
  // shows: {}
}
