import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

import { HomeComponent } from './home/home.component';
import { PostCreateComponent } from './Posts/post-create/post-create.component';
import { PostListComponent } from './Posts/post-list/post-list.component';

const routes: Routes = [
{path: '',component: HomeComponent},
{path: 'pets',component: PostListComponent},
{path: 'create',component: PostCreateComponent, canActivate: [AuthGuard]},
{path: 'edit/:postId',component: PostCreateComponent, canActivate: [AuthGuard]},
{path: 'login',component: LoginComponent},
{path: 'signup',component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
