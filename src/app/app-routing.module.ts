import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostCreateComponent } from './Posts/post-create/post-create.component';
import { PostListComponent } from './Posts/post-list/post-list.component';

const routes: Routes = [
{path: '',component: HomeComponent},
{path: 'pets',component: PostListComponent},
{path: 'create',component: PostCreateComponent},
{path: 'edit/:postId',component: PostCreateComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
