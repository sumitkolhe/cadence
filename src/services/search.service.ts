import { ApiService } from 'services/api.service'

export class SearchService extends ApiService {
  private base: string

  constructor() {
    super()
    this.base = '/search'
  }

  public async songs(query: string) {
    return this.http(`${this.base}/songs`, {
      params: { query },
    })
  }
}
