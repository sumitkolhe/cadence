import { $fetch } from 'ohmyfetch'
import type { $Fetch } from 'ohmyfetch'

export class ApiService {
  private baseUrl = 'https://api.saavn.me/'
  protected http: $Fetch

  constructor() {
    this.http = $fetch.create({
      baseURL: this.baseUrl,
    })
  }
}
