/* eslint-disable @typescript-eslint/no-unused-vars */
import 'pinia'
import type { AuthService } from 'services/auth.service'
import type { QueryService } from 'services/query.service'
import type { MutationService } from 'services/mutation.service'
import type { SearchService } from 'services/search.service'
import type { ModulesService } from 'services/modules.service'
import type { SongsService } from 'services/songs.service'
import type { AlbumsService } from 'services/albums.service'

declare module 'pinia' {
  export interface PiniaCustomProperties<Id, S, G, A> {
    $http: {
      search: SearchService
      modules: ModulesService
      songs: SongsService
      albums: AlbumsService
    }
  }
}
