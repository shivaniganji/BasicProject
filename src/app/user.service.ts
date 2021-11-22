import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private msgSource=new BehaviorSubject<object>([]);
  currentData=this.msgSource.asObservable();

  constructor(private httpClient:HttpClient) { }


//httpClient json data
getData(){

  return this.httpClient.get("/assets/students.json");
}

//
changeData(listData : []){
  this.msgSource.next(listData)
}

}
