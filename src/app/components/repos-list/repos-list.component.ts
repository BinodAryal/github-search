import { Component, OnInit } from '@angular/core';
import { RepoService } from 'src/app/services/repo.service';

@Component({
  selector: 'app-repos-list',
  templateUrl: './repos-list.component.html',
  styleUrls: ['./repos-list.component.css']
})
export class ReposListComponent implements OnInit {

  repoitems: any[];
  repoName:string= "";

  constructor(private profileService: RepoService) {

  }

  findRepo () {
    this.profileService.UpdateRepo(this.repoName);
    this.profileService.searchrepos().subscribe(repo => {
      // console.log(repo["items"]);
      this.repoitems = repo["items"];
      console.log(this.repoitems);
    })
  }

  ngOnInit() {
    this.findRepo()
  }

}
