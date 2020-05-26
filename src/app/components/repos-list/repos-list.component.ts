import { Component, OnInit } from '@angular/core';
import { RepoService } from 'src/app/services/repo.service';
import { FormControl } from '@angular/forms';
import { Observable, EMPTY } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, switchMap, catchError, tap} from 'rxjs/operators';
import { DataShareService } from 'src/app/services/data-share.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-repos-list',
  templateUrl: './repos-list.component.html',
  styleUrls: ['./repos-list.component.css']
})
export class ReposListComponent  {

  repoitems: any[];
  searchTerm = new FormControl();

  showErrorMessage:boolean = false;
  searching:boolean = false;

  currentSearchedTerm:string;
  pageCount:number= 1;

  searchTerm$: Observable<any> = this.searchTerm.valueChanges.pipe(
    tap(() => {
      //handling side effect
      this.searching = true;
     this.showErrorMessage = false;
    }),
    //for waiting completion of word
    debounceTime(1000),
    //search input change
    distinctUntilChanged(),
    //to cancel the previous typed value and get the latest typed item
    switchMap((termValue) => {
      this.currentSearchedTerm = termValue;
      return this.repoService.searchRepoDetails(termValue, this.pageCount).pipe(
        tap((res)=> {
          //console.log('api reposnse', res);
          this.searching = false;
          this.showErrorMessage = false;
        }),
        catchError((err) => {
          console.log("error occurred during search ", err);
          this.showErrorMessage = true;
          this.searching = false;
          return [];
        })
      )
    })
  )

  constructor(
    private router:Router,
    private repoService: RepoService,
    private dataShareService:DataShareService
    ) {
  }
  prevItems(){
    if (this.pageCount>1){
    this.pageCount = this.pageCount - 1;

    this.searchTerm$ = this.repoService.searchRepoDetails(this.currentSearchedTerm, this.pageCount).pipe(
      tap((res)=> {
        //handling side effect
        //console.log('API response', res);
        this.searching = false;
        this.showErrorMessage = false;
      }),
      catchError((err) => {
        //handlingerror during search
        console.log("error occurred during search ", err);
        this.showErrorMessage = true;
        this.searching = false;
        return [];
      })
    )
    }
    else{
      console.log('No data');
    }
  }

  nextItems() {
    this.pageCount = this.pageCount + 1;

    this.searchTerm$ = this.repoService.searchRepoDetails(this.currentSearchedTerm, this.pageCount).pipe(
      tap((res)=> {
        //console.log('API response', res);
        this.searching = false;
        this.showErrorMessage = false;
      }),
      catchError((err) => {
        console.log("error occurred during search ", err);
        this.showErrorMessage = true;
        this.searching = false;
        return [];
      })
    )
  }

  // findRepo () {
  //   this.searchTerm$

  //   )
  //   .subscribe(repo => {
  //     console.log("repo items ---->>", repo);
  //     this.repoitems = repo["items"];
  //     console.log(this.repoitems);
  //   })
  // }

  openItemDetails(item) {
    this.dataShareService.updateRepoItemDetail(item);
    this.router.navigateByUrl("/repo-details");
  }

}
