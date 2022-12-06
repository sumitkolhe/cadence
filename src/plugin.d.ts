/* eslint-disable @typescript-eslint/no-unused-vars */
import 'pinia'
import type { AuthService } from 'services/auth.service'
import type { QueryService } from 'services/query.service'
import type { MutationService } from 'services/mutation.service'
import type { SearchService } from 'services/search.service'
import type { ModulesService } from 'services/modules.service'

declare module 'pinia' {
  export interface PiniaCustomProperties<Id, S, G, A> {
    $http: { search: SearchService; modules: ModulesService }
  }
}
