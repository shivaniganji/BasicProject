import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { HomeComponent } from './home/home.component';
import { ListUserComponent } from './list-user/list-user.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path: 'add-user', component:AddUserComponent},
  {path: 'edit/:id', component:AddUserComponent},
  {
    path:'list-user',component:ListUserComponent
  },
  {
    path: "",
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
