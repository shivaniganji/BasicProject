import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { UserService } from './user.service';
import { FormGroup } from '@angular/forms';


interface Student{
  id:number;
  name:string;
  email:string;
  gender:string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showAdd!:boolean;
  showUpdate!: boolean;
  userForm!: FormGroup;
  title = 'Assessment';
  students: any= [];
  items=[];
  url=`assets/data.json`;
  constructor(private httpClient: HttpClient, private userService: UserService){

  }
  // clickAddUser(){
  //   this.userForm.reset();
  //   this.showAdd=true;
  //   this.showUpdate=false;
  //  }

}




