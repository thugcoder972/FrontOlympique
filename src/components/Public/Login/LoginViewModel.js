// src/components/Public/Login/viewmodels/LoginViewModel.js

import { makeAutoObservable,runInAction } from "mobx";
import { loginApi } from '../Login/loginApi';
import { LoginUser } from '../../../models/LoginUserModel';

class LoginViewModel {
    username = '';
    password = '';
    errorMessage = '';
    authContext;
    
    constructor(authContext) {
      makeAutoObservable(this);
      this.authContext = authContext;
    }
  
    handleChange = (field, value) => {
      this[field] = value;
    };
  
    handleLogin = async (e) => {
      e.preventDefault();
      this.errorMessage = '';
  
      try {
        const user = new LoginUser(this.username, this.password);
        runInAction(() => {
             loginApi(user, this.authContext);
          });
   
      } catch (error) {
        this.errorMessage = 'Login failed: ' + error.message;
      }
    };
  }
  
  export default LoginViewModel;