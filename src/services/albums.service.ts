import { ApiService } from 'services/api.service'
import type { CustomResponse } from 'interfaces/response.interface'
import type { AlbumResponse } from 'interfaces/album.interface'

export class AlbumsService extends ApiService {
  private base: string

  constructor() {
    super()
    this.base = '/albums'
  }

  public async detailsById(id: string) {
    return this.http<CustomResponse<AlbumResponse>>(`${this.base}`, {
      params: { id },
    })
  }
}
