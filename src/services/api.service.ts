import { $fetch } from 'ofetch'
import type { $Fetch } from 'ofetch'

export class ApiService {
  private baseUrl = 'https://api.saavn.me/'
  protected http: $Fetch

  constructor() {
    this.http = $fetch.create({
      baseURL: this.baseUrl,
    })
  }
}
