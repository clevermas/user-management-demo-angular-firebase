import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  get(endpoint, options?) {
    return this.http.get(environment.api + endpoint, options);
  }

  post(endpoint, body) {
    const url = environment.api + endpoint;
    return this.http.post(url, body);
  }
}
