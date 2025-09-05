import { Component, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',  // tvoj HTML
  styleUrls: ['./app.css'],
  imports: [RouterLink, RouterOutlet, FormsModule]
})
export class App  {

  constructor(private router: Router){
    
  }

  public service = UserService;

  public doLogout() {
    localStorage.removeItem('active');
    this.router.navigate(['/login']);
  }
}
