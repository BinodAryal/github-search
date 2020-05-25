import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  private _repoItemDetail = new BehaviorSubject<any>(null);

  repoItemDetail = this._repoItemDetail.asObservable();

  updateRepoItemDetail(item) {
    this._repoItemDetail.next(item)
  }

  constructor() { }
}
