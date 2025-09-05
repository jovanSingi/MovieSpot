import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {

  public username: string = '';
  public password: string = '';
  public email: string = '';
  public number: string = '';
  public name: string = '';
  public lastName: string = '';


  constructor (private router: Router) { 

   }

  public doSignup() {
    if(UserService.createUser(this.name, this.lastName, 
      this.number, this.email, this.username, this.password)) {
      alert("Uspesno ste se registrovali!")
      this.router.navigate(['/login'])
      return;
    } else {
      alert("Doslo je do greske prilikom registracije!")
    }
  }
}
