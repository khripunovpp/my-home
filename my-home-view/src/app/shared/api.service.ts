import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import env from '../../env';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor() {
  }

  private readonly _httpClient = inject(HttpClient);
  private apiUrl = `http://${env.api_ip}:${env.api_port}/api`;


  getApiUrl(): string {
    return this.apiUrl;
  }

  get(endpoint: string) {
    return this._httpClient.get(`${this.apiUrl}/${endpoint}`);
  }

  post(endpoint: string, data: any) {
    return this._httpClient.post(`${this.apiUrl}/${endpoint}`, data);
  }

  put(endpoint: string, data: any) {
    return this._httpClient.put(`${this.apiUrl}/${endpoint}`, data);
  }

  delete(endpoint: string, id?: number) {
    return this._httpClient.delete(`${this.apiUrl}/${endpoint}${id ? `/${id}` : ''}`);
  }

}
