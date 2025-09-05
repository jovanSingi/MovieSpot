import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormsModule } from "@angular/forms";


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  public username: string = '';
  public password: string = '';

  constructor (private router: Router) {
    if (UserService.getActiveUser()) {
      this.router.navigate(['/profile'])
    }
  }
  
  public doLogin() {
    if(UserService.login(this.username, this.password)) {
      this.router.navigate(['/profile'])
      return;
    } else {
      alert("Login pogresan!: " + this.username + this.password)
    }
  }

  
}
