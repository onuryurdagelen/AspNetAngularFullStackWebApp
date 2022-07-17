import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginBody } from '../models/loginBody';
import { SingleResponseModel } from '../models/singleResponseModel';
import {TokenResponseModel} from "../models/tokeResponseModel"
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = "https://localhost:44335/api/Auth/";
  constructor(private httpClient:HttpClient) {

   }
   login(loginModel:LoginBody):Observable<SingleResponseModel<TokenResponseModel>>{
      return this.httpClient.post<SingleResponseModel<TokenResponseModel>>(this.apiUrl+"login",loginModel);
   }
   isAuthenticated():boolean{
    if (localStorage.getItem("token")) {
      return true;
    }
    else{
      return false;
    }
  }
}
