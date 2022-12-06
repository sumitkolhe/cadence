import { SearchService } from 'services/search.service'
import { ModulesService } from 'services/modules.service'
import type { PiniaPluginContext } from 'pinia'

// add query and mutation service in pinia stores as plugins
function HttpServicePlugin({ store }: PiniaPluginContext) {
  store.$http = {
    search: markRaw(new SearchService()),
    modules: markRaw(new ModulesService()),
  }
}

export default defineNuxtPlugin(({ $pinia }) => {
  $pinia.use(HttpServicePlugin)
})
