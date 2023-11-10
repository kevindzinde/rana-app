import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { LoginCredential } from './types';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // To toggle the login boolean to cater for AuthGuards
  isLoggedIn: boolean = true;

  constructor(private _auth:Auth) {

   }
 async login(credentials:LoginCredential):Promise<any>{
    // return await signInWithEmailAndPassword(this._auth,credentials.email,credentials.password);
    try {
      // Attempt to authenticate the user
      await signInWithEmailAndPassword(this._auth, credentials.email, credentials.password);
      // Authentication successful, set isLoggedIn to true
      this.isLoggedIn = true;
    } catch (error) {
      // Authentication failed, set isLoggedIn to false
      this.isLoggedIn = false;
      // Handle or log the error if necessary
      console.error('Authentication failed:', error);
      throw error; // Rethrow the error to be handled by the caller if needed
    }
   }
}
