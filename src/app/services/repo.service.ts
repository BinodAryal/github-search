import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RepoService {
  // username: string;
  // repoName: string;
  // clientId: string = "c789323b20a2d31dc9fa";
  // clientSecret: string = "83e428e5ed1c99fded8ab02686753f74656f9f6b";
  apikey:string='be05ad82ef1dec303061648a172836e81613bc78';

  constructor(private http: HttpClient) {
  }

  searchRepoDetails(searchTerm='', pageNum) {
    return this.http.get(`https://api.github.com/search/repositories?q=${searchTerm}&page=${pageNum}&per_page=10`, ({
      headers: new HttpHeaders({Authorization: `token ${this.apikey}`})
    }))
  }

}
