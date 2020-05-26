import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RepoService {

  constructor(private http: HttpClient) {
  }

  searchRepoDetails(searchTerm='', pageNum) {
    return this.http.get(`https://api.github.com/search/repositories?q=${searchTerm}&page=${pageNum}&per_page=10`)
  }

}
