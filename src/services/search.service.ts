import { ApiService } from 'services/api.service'
import type { CustomResponse } from 'interfaces/response.interface'
import type { AllSearchResponse } from 'interfaces/search.interface'
import type { SongSearchResponse } from 'interfaces/song.interface'

export class SearchService extends ApiService {
  private base: string

  constructor() {
    super()
    this.base = '/search'
  }

  public async all(query: string) {
    return this.http<CustomResponse<AllSearchResponse>>(`${this.base}/all`, {
      params: { query },
    })
  }

  public async songs(query: string) {
    return this.http<CustomResponse<SongSearchResponse>>(`${this.base}/songs`, {
      params: { query },
    })
  }
}
