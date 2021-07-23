import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GrupozapService {

  URL = 'http://grupozap-code-challenge.s3-website-us-east-1.amazonaws.com/sources/source-1.json';

  constructor(
    private http: HttpClient
  ) { }

  immobileList() {
    return this.http.get(this.URL);
  }

}
