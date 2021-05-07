import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http" ;

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostCreateComponent } from './Posts/post-create/post-create.component';
import { HeaderComponent } from './header/header.component';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { PostListComponent } from './Posts/post-list/post-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { MatSelectModule } from '@angular/material/select';
import { AuthInterceptor } from './auth/auth-interceptor';
import { MatExpansionModule } from '@angular/material/expansion';
import { ErrorInterceptor } from './error.intercepter'
import { MatDialogModule}  from '@angular/material/dialog';
import { ErrorComponent } from './error/error.component';
import {MatMenuModule} from '@angular/material/menu';
import { ProductCreateComponent } from './Product/product-create/product-create.component';
import { ProductListComponent } from './Product/product-list/product-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PostDeleteComponent } from './Posts/post-delete/post-delete.component';
import { MatTableModule } from '@angular/material/table';
import { ManageAccountComponent } from './auth/manage-account/manage-account.component';




@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ErrorComponent,
    ProductCreateComponent,
    ProductListComponent,
    PostDeleteComponent,
    ManageAccountComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    HttpClientModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatSelectModule,
    MatExpansionModule,
    MatDialogModule,
    MatMenuModule,
    MatTabsModule,
    FlexLayoutModule,
    MatTableModule,

  ],
  providers: [{provide : HTTP_INTERCEPTORS, useClass : AuthInterceptor, multi: true},
    {provide : HTTP_INTERCEPTORS, useClass : ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent],
  entryComponents:[ErrorComponent]
})
export class AppModule { }
