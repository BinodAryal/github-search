import { Component, OnInit } from '@angular/core';
import { DataShareService } from 'src/app/services/data-share.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-repo-details',
  templateUrl: './repo-details.component.html',
  styleUrls: ['./repo-details.component.css']
})
export class RepoDetailsComponent implements OnInit {

  repoDetails$:Observable<any>;
  router: any;

  constructor(
    private dataService:DataShareService
  ) { }

  ngOnInit(): void {
    this.repoDetails$ = this.dataService.repoItemDetail;
  }

  onBack(): void {
    this.router.navigate(['/repos']);
  }

}
