import { Component, Input, OnInit, Pipe,PipeTransform } from '@angular/core';
import { UserService } from '../user.service';
import { ApiService } from '../shared/api.service';
import { UserModel } from '../add-user/user.model';
import {FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {Router} from '@angular/router';


@Pipe({
  name: 'customDate'
})
export class CustomDatePipe extends 
             DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value, " d MMMM , y");
  }
}

@Pipe({
  name:"upper",
})
 export class upperPipe implements PipeTransform{
 
  transform( value : string ) : string
  {
      return value.toUpperCase();
  }

}


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})



export class ListUserComponent implements OnInit {
  

  userModelObj: UserModel = new UserModel();
  userData !:any;
  userForm !: FormGroup;
 
  showAdd!:boolean;
  showUpdate!: boolean;

 
  constructor(private userService: UserService,
     private api: ApiService,
     private router:Router) { }

  ngOnInit(): void {
    this.getAllUsers();
  
  }
  postUserDetails() {
    this.userModelObj.firstName = this.userForm.value.firstName;
    this.userModelObj.lastName = this.userForm.value.lastName;
    this.userModelObj.userName = this.userForm.value.userName;
    this.userModelObj.password = this.userForm.value.password;
    this.userModelObj.dob = this.userForm.value.dob;
    this.userModelObj.gender = this.userForm.value.gender;

    this.api.postUser(this.userModelObj)
      .subscribe(res => {
        console.log(res);
        alert("User Added Successfully")
        this.userForm.reset();
        this.getAllUsers();
      },
        err => {
          alert("Something Went Wrong")
        })
  }


  getAllUsers() {
    this.api.getUser()
    .subscribe(res=>{
      this.userData=res;
    })

  }


  deleteUser(item:any){
    this.api.deleteUser(item.id)
    .subscribe(res=>{
      alert("User Deleted");
      this.getAllUsers()
    })
  }
  
  onEdit(itemId:number){
    this.showAdd=false;
    this.showUpdate=true;
   this.router.navigate(['/edit',itemId]);
  }

// onEdit(item:any){
// //this.router.navigate(['/add-user']);
// this.showAdd=false;
//  this.showUpdate=true;
// this.userModelObj.id=item.id;
//   this.userForm.controls['firstName'].setValue(item.firstName)
//   this.userForm.controls['lastName'].setValue(item.lastName)
//   this.userForm.controls['userName'].setValue(item.userName)
//   this.userForm.controls['password'].setValue(item.password)
//   this.userForm.controls['dob'].setValue(item.dob)
//   this.userForm.controls['gender'].setValue(item.gender)

// }

// onEdit(item:any){
//   this.userForm.controls['gender'].setValue(item.firstName);
// }

updateUserDetails(){
  this.userModelObj.firstName = this.userForm.value.firstName;
    this.userModelObj.lastName = this.userForm.value.lastName;
    this.userModelObj.userName = this.userForm.value.userName;
    this.userModelObj.password = this.userForm.value.password;
    this.userModelObj.dob = this.userForm.value.dob;
    this.userModelObj.gender = this.userForm.value.gender;
 this.api.updateUser(this.userModelObj,this.userModelObj.id)
 .subscribe(res=>{
   alert("Updated Successfully")
 this.userForm.reset();
 this.getAllUsers();
},
 err => {
   alert("Something Went Wrong")
 })
}

}
