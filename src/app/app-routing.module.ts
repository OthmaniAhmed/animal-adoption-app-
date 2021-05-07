import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardAdmin } from './auth/adminAuth.guard';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { ManageAccountComponent } from './auth/manage-account/manage-account.component';
import { SignupComponent } from './auth/signup/signup.component';

import { HomeComponent } from './home/home.component';
import { PostCreateComponent } from './Posts/post-create/post-create.component';
import { PostDeleteComponent } from './Posts/post-delete/post-delete.component';
import { PostListComponent } from './Posts/post-list/post-list.component';
import { ProductCreateComponent } from './Product/product-create/product-create.component';
import { ProductListComponent } from './Product/product-list/product-list.component';

const routes: Routes = [
{path: '',component: HomeComponent},
{path: 'pets',component: PostListComponent},
{path: 'create',component: PostCreateComponent, canActivate: [AuthGuard]},
{path: 'edit/:postId',component: PostCreateComponent, canActivate: [AuthGuard]},
{path: 'login',component: LoginComponent},
{path: 'signup',component: SignupComponent},
{path: 'pet_supplies', component: ProductListComponent},
{path: 'create_prod', component: ProductCreateComponent, canActivate: [AuthGuardAdmin]},
{path: 'delete_post', component: PostDeleteComponent, canActivate: [AuthGuardAdmin]},
{path: 'manage_account', component: ManageAccountComponent, canActivate: [AuthGuard]  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard,AuthGuardAdmin]
})
export class AppRoutingModule { }
