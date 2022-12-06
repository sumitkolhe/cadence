import { ApiService } from 'services/api.service'
import type { ModulesResponse } from 'interfaces/modules.interface'
import type { CustomResponse } from 'interfaces/response.interface'

export class ModulesService extends ApiService {
  private base: string

  constructor() {
    super()
    this.base = '/modules'
  }

  public async modules() {
    return this.http<CustomResponse<ModulesResponse>>(`${this.base}`)
  }
}
