import { ApiService } from 'services/api.service'
import type { CustomResponse } from 'interfaces/response.interface'
import type { SongResponse } from 'interfaces/song.interface'

export class SongsService extends ApiService {
  private base: string

  constructor() {
    super()
    this.base = '/songs'
  }

  public async detailsById(id: string) {
    return this.http<CustomResponse<SongResponse[]>>(`${this.base}`, {
      params: { id },
    })
  }
}
