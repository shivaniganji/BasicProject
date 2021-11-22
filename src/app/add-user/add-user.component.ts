import { Component, OnInit, Pipe } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
//import { UserService } from '../user.service';
import { UserModel } from './user.model';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {

  users: string[];
  userForm: FormGroup;
  listData: any;
  submitted = false;
  userModelObj: UserModel = new UserModel();
  userData !: any;
  showAdd: boolean = true;
  showUpdate!: boolean;


  constructor(private fb: FormBuilder, private api: ApiService, private route: ActivatedRoute) {
    this.listData = [];
    this.users = [];
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{6,}$/)]],
      dob: ['', Validators.required],
      gender: ['', Validators.required]
    })
  }

  get f() { return this.userForm.controls; }

  public resetUser(): void {
    this.submitted = false;
    this.userForm.reset();
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.route.paramMap.subscribe(params => {
      const itemId = params.get('id');
      if (itemId) {
        this.getAUser(itemId);
      }
    })
  }
  // clickAddUser(){
  //  this.userForm.reset();
  //  this.showAdd=true;
  //  this.showUpdate=false;
  // }

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
      .subscribe(res => {
        this.userData = res;
      })

  }

  updateUserDetails() {
    this.userModelObj.firstName = this.userForm.value.firstName;
    this.userModelObj.lastName = this.userForm.value.lastName;
    this.userModelObj.userName = this.userForm.value.userName;
    this.userModelObj.password = this.userForm.value.password;
    this.userModelObj.dob = this.userForm.value.dob;
    this.userModelObj.gender = this.userForm.value.gender;
    this.api.updateUser(this.userModelObj, this.userModelObj.id)
      .subscribe(res => {
        alert("Updated Successfully");
        this.userForm.reset();
        this.getAllUsers();
      })
    this.showUpdate = false;
    this.showAdd = true;
  }

  getAUser(id: any) {
    this.api.getAUser(id).subscribe(
      (item: any) => this.editUser(item),
      (err: any) => console.log(err)
    );

  }


  editUser(item: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.userModelObj.id = item.id;
    this.userForm.patchValue(
      {
        firstName: item.firstName,
        lastName: item.lastName,
        userName: item.userName,
        password: item.password,
        dob: item.dob,
        gender: item.gender
      }
    )
  }

}
