import type { DownloadLink } from './image.interface'

export interface AllSearchResponse {
  albums: SearchResponse<SearchAlbumResponse[]>
  songs: SearchResponse<SearchSongResponse[]>
  artists: SearchResponse<SearchArtistResponse[]>
  playlists: SearchResponse<SearchPlaylistResponse[]>
  topQuery: SearchResponse<SearchTopQueryResponse[]>
}

interface SearchResponse<T> {
  results: T
  position: number
}

interface SearchAlbumResponse {
  id: string
  title: string
  image: DownloadLink
  artist: string
  url: string
  type: string
  description: string
  position: number
  year: string
  language: string
  songIds: string
}

interface SearchSongResponse {
  id: string
  title: string
  image: DownloadLink
  album: string
  url: string
  type: string
  description: string
  position: number
  primaryArtists: string
  singers: string
  language: string
}

interface SearchArtistResponse {
  id: string
  title: string
  image: DownloadLink
  url: string
  type: string
  description: string
  position: number
}

interface SearchPlaylistResponse {
  id: string
  title: string
  image: DownloadLink
  url: string
  language: string
  type: string
  description: string
  position: number
}

interface SearchTopQueryResponse {
  id: string
  title: string
  image: DownloadLink
  album: string
  url: string
  type: string
  description: string
  position: number
  primaryArtists: string
  singers: string
  language: string
}
