import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReposListComponent } from './components/repos-list/repos-list.component';
import { RepoDetailsComponent } from './components/repo-details/repo-details.component';




const routes: Routes = [
  { path: 'repos', component: ReposListComponent},
  {path: 'repo-details', component: RepoDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
